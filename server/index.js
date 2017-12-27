const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const acho = require('acho')
const log = acho()

let lobby = { clients: []}
let rooms = {
  room1: { clients: []},
  room2: { clients: []},
  room3: { clients: []},
  room4: { clients: []}
}
let clients = {}

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

function notifyPartnersAt(room) {
  io.to(room).emit('PARTNERS_LIST', clientsAt(room))
}

function notifyPartners(room){
  notifyPartnersAt('lobby')
  notifyPartnersAt(room)
}

server.listen(4343, () => {
  console.log('Listening on port 4343')
})

io.on('connection', socket => {
  const ID = socket.id

  log.info(`New conection. Id:${ID}`)
  const nickname = socket.handshake.query.nickname
  clients[ID] = {}
  clients[ID].room = 'lobby'
  socket.join('lobby')
  lobby.clients.push(ID)
  if(nickname) {
    clients[ID]['nickname'] = nickname
    log.info(`${ID} is now know as ${identityOf(ID)}`)
  }
  socket.emit('MESSAGE', `Welcome to the server ${identityOf(ID)}`)
  io.emit('MESSAGE', `${identityOf(ID)} has connected to the server`)
  notifyPartnersAt('lobby')
  
  socket.on('RETRIEVE_ROOMS', () =>{
    const roomList = Object.keys(rooms)
    socket.emit('ROOM_LIST', roomList)
  })

  socket.on('JOIN_ROOM', room => {
    const msg = `${identityOf(ID)} joins ${room}`
    io.emit('MESSAGE', msg)
    socket.leave('lobby')
    clients[ID].room = room
    socket.join(room)
    lobby.clients = lobby.clients.filter( id => id != ID)
    rooms[room].clients.push(ID)
    notifyPartners(room)
  })
  
  socket.on('LEAVE_ROOM', () => {
    const msg = `${identityOf(ID)} gets back to the lobby`
    io.emit('MESSAGE', msg)
    lobby.clients.push(ID)
    const room = clients[ID].room
    clients[ID].room = 'lobby'
    socket.leave(room)
    socket.join('lobby')
    rooms[room].clients = rooms[room].clients.filter(id => id != ID)
    notifyPartners(room)
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
  })
})