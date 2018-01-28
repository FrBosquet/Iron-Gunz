const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const log = require('./lib/log')
const state = require('./lib/state')

function clientsAt(room){
  const clientList = room === 'lobby' ?
    state.getClientsAtLobby() :
    state.getClientsAtRoom(room)
  return clientList.map(state.whoIs.bind(state))
}

function notifyPartnersAt(room) {
  io.to(room).emit('PARTNERS_LIST', clientsAt(room))
}

function notifyPartners(room){
  notifyPartnersAt('lobby')
  if(room != 'lobby') notifyPartnersAt(room)
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

  const msg = log.newConnection(state.whoIs(ID))
  socket.emit('MESSAGE', msg)

  io.emit('MESSAGE', `${state.whoIs(ID)} has connected to the server`)
  socket.join('lobby')
  notifyPartnersAt('lobby')
  
  socket.on('RETRIEVE_ROOMS', () =>{
    log.retrieveRooms(state.whoIs(ID))
    socket.emit('ROOM_LIST', state.getAvailableRooms())
  })

  socket.on('JOIN_ROOM', room => {
    const msg = log.joinRoom(state.whoIs(ID), room)
    state.moveClientToRoom(ID, room)
    io.emit('MESSAGE', msg)
    socket.leave('lobby')
    socket.join(room)
    io.to('lobby').emit('ROOM_LIST', state.getAvailableRooms())      
    notifyPartners(room)
  })
  
  socket.on('LEAVE_ROOM', () => {
    const room = state.whereIs(ID)
    const msg = log.leaveRoom(state.whoIs(ID), room)
    state.moveClientToLobby(ID)    
    io.emit('MESSAGE', msg)
    socket.leave(room)
    socket.join('lobby')
    io.to('lobby').emit('ROOM_LIST', state.getAvailableRooms())
    notifyPartners(room)
  })

  socket.on('SET_IDENTITY', name => {
    state.setIdentity(ID, name)
    const room = state.whereIs(ID)
    notifyPartnersAt(room)
    socket.emit('ACK_IDENTITY', name)
    io.emit('MESSAGE', log.setIdentity(ID, name))
  })
  
  socket.on('UNSET_IDENTITY', () => {
    const room = state.whereIs(ID)
    state.forgetIdentity(ID)
    socket.emit('ACK_FORGOT_IDENTITY')
    notifyPartnersAt(room)
    io.emit('MESSAGE', log.unsetIdentity(ID))
  })

  socket.on('CHAT_MESSAGE', message => {
    const room = clients[ID].room
    const msg = {
      authorId: ID,
      author: state.whoIs(ID),
      content: message 
    }
    io.to(room).emit('CHAT_MESSAGE', msg) 
  })


  socket.on('disconnect', () => {
    const room = state.whereIs(ID)
    notifyPartnersAt(room)
    io.emit('MESSAGE', `${state.whoIs(ID)} has disconnected`)
    log.disconnection(state.whoIs(ID))
    state.removeClient(ID)
  })
})