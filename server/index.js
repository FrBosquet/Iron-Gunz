const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const log = require('./lib/log')
const state = require('./lib/state')

//TO DELETE:
let lobby = { clients: []}
let rooms = {
  room1: { clients: [], available: true},
  room2: { clients: [], available: true},
  room3: { clients: [], available: true},
  room4: { clients: [], available: true}
}
let clients = {}
//

function shortId (id) {
  return `${id.substr(0, 5)}...`
}

function identityOf(id){
  return clients[id]['nickname'] || shortId(id)
}

function clientsAt(room){
  const clientList = room === 'lobby' ?
    lobby.clients :
    rooms[room].clients
  return clientList.map(identityOf)
}

function roomList(){
  const list = Object.keys(rooms).filter(room => rooms[room].available)
  return list
}

function notifyPartnersAt(room) {
  io.to(room).emit('PARTNERS_LIST', clientsAt(room))
}

function notifyPartners(room){
  notifyPartnersAt('lobby')
  notifyPartnersAt(room)
}

const port = 4343

server.listen(port, () => {
  log.listen(port)
})

io.on('connection', socket => {
  const ID = socket.id
  const nickname = socket.handshake.query.nickname

  state.newClient(ID, nickname)
  state.moveClientToLobby(ID)

  clients[ID] = {}
  clients[ID].room = 'lobby'
  socket.join('lobby')
  lobby.clients.push(ID)
  if(nickname) {
    clients[ID]['nickname'] = nickname
  }
  log.newConnection(identityOf(ID))
  
  socket.emit('MESSAGE', `Welcome to the server ${identityOf(ID)}`)
  

  io.emit('MESSAGE', `${identityOf(ID)} has connected to the server`)
  notifyPartnersAt('lobby')
  
  socket.on('RETRIEVE_ROOMS', () =>{
    log.retrieveRooms(identityOf(ID))
    socket.emit('ROOM_LIST', roomList())
  })

  socket.on('JOIN_ROOM', room => {
    log.joinRoom(identityOf(ID), room)    
    const msg = `${identityOf(ID)} joins ${room}`
    io.emit('MESSAGE', msg)
    socket.leave('lobby')
    clients[ID].room = room
    socket.join(room)
    lobby.clients = lobby.clients.filter( id => id != ID)
    rooms[room].clients.push(ID)
    if(rooms[room].clients.length === 2){
      rooms[room].available = false
      socket.emit('MESSAGE', `${room} has two players and its now closed`)
    }
    io.to('lobby').emit('ROOM_LIST', roomList())      
    notifyPartners(room)
    console.log(state)
  })
  
  socket.on('LEAVE_ROOM', () => {
    const room = clients[ID].room
    log.leaveRoom(identityOf(ID), room)        
    const msg = `${identityOf(ID)} gets back to the lobby`
    io.emit('MESSAGE', msg)
    lobby.clients.push(ID)
    clients[ID].room = 'lobby'
    socket.leave(room)
    socket.join('lobby')
    rooms[room].available = true
    rooms[room].clients = rooms[room].clients.filter(id => id != ID)
    io.to('lobby').emit('ROOM_LIST', roomList())
    notifyPartners(room)
    console.log(state)    
  })

  socket.on('SET_IDENTITY', name => {
    clients[ID]['nickname'] = name
    const room = clients[ID].room
    notifyPartnersAt(room)
    socket.emit('ACK_IDENTITY', name)
    io.emit('MESSAGE', `${shortId(ID)} is now known as ${name}`)
  })
  
  socket.on('UNSET_IDENTITY', () => {
    delete clients[ID].nickname
    const room = clients[ID].room
    socket.emit('ACK_FORGOT_IDENTITY')
    notifyPartnersAt(room)
    io.emit('MESSAGE', `${shortId(ID)} is anonimus again`)
  })

  socket.on('CHAT_MESSAGE', message => {
    const room = clients[ID].room
    const msg = {
      authorId: ID,
      author: identityOf(ID),
      content: message 
    }
    io.to(room).emit('CHAT_MESSAGE', msg) 
  })


  socket.on('disconnect', () => {
    const room = clients[ID].room
    switch(room){
      case 'lobby':
        lobby.clients = lobby.clients.filter(id => id != ID)
      break
      default:
        rooms[room].clients = rooms[room].clients.filter(id => id != ID)
    }
    notifyPartnersAt(room)
    io.emit('MESSAGE', `${identityOf(ID)} has disconnected`)
    state.removeClient(ID)
  })
})