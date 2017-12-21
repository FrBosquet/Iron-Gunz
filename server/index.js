const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

let rooms = {
  room1: {},
  room2: {},
  room3: {},
  room4: {}
}
let clients = {}

function shortId (id) {
  return `${id.substr(0, 5)}...`
}

function identityOf(id){
  return clients[id] || shortId(id)
}

server.listen(4343, () => {
  console.log('Listening on port 4343')
})

io.on('connection', socket => {
  console.log('Client connected', socket.id)
  const nickname = socket.handshake.query.nickname
  if(nickname){
    console.log(socket.id,'already has a name, and its', nickname)
    clients[socket.id] = nickname
  }

  socket.emit('MESSAGE', 'Welcome to the server')
  io.emit('MESSAGE', `${identityOf(socket.id)} has connected to the server`)

  socket.on('RETRIEVE_ROOMS', () =>{
    console.log(`${identityOf(socket.id)} retrieves list of rooms`)
    const roomList = Object.keys(rooms)
    socket.emit('ROOM_LIST', roomList)
  })

  socket.on('JOIN_ROOM', room => {
    const msg = `${identityOf(socket.id)} joins ${room}`
    console.log(msg)
    io.emit('MESSAGE', msg)
  })

  socket.on('SET_IDENTITY', name => {
    console.log(shortId(socket.id), 'wants to be know as', name)
    if(!clients[socket.id]){
      clients[socket.id] = name
      socket.emit('ACK_IDENTITY', name)
      io.emit('MESSAGE', `${shortId(socket.id)} is now known as ${name}`)
    }
  })
  
  socket.on('UNSET_IDENTITY', () => {
    console.log(socket.id, 'no longer wants to be know as', identityOf(socket.id))
    delete clients[socket.id]
    socket.emit('ACK_FORGOT_IDENTITY')
    io.emit('MESSAGE', `${shortId(socket.id)} is anonimus again`)
  })

  socket.on('disconnect', () => io.to('A game room').emit('notification', `${socket.id} has left this room`))
})