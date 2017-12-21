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
  clients[socket.id] = {}
  clients[socket.id].room = 'general'
  socket.join('general')
  generalChat.clients.push(socket.id)
  if(nickname) clients[socket.id]['nickname'] = nickname
  socket.emit('MESSAGE', `Welcome to the server ${identityOf(socket.id)}`)
  io.emit('MESSAGE', `${identityOf(socket.id)} has connected to the server`)

  socket.on('RETRIEVE_ROOMS', () =>{
    console.log(`${identityOf(socket.id)} retrieves list of rooms`)
    const roomList = Object.keys(rooms)
    socket.emit('ROOM_LIST', roomList)
  })

  socket.on('JOIN_ROOM', room => {
    const msg = `${identityOf(socket.id)} joins ${room}`
    io.emit('MESSAGE', msg)
    socket.leave('general')
    socket.join(room)
    generalChat.clients = generalChat.clients.filter( id => id != socket.id)
    rooms[room].clients.push(socket.id)
  })
  
  socket.on('LEAVE_ROOM', () => {
    const msg = `${identityOf(socket.id)} get back to the lobby`
    io.emit('MESSAGE', msg)
    generalChat.clients.push(socket.id)
    const room = clients[socket.id].room
    socket.leave(room)
    socket.join('general')
    rooms[room].clients = rooms[room].clients.filter(id => id != socket.id)
  })

  socket.on('SET_IDENTITY', name => {
    console.log(shortId(socket.id), 'wants to be know as', name)
    if(!clients[socket.id]){
      clients[socket.id]['nickname'] = name
      socket.emit('ACK_IDENTITY', name)
      io.emit('MESSAGE', `${shortId(socket.id)} is now known as ${name}`)
    }
  })
  
  socket.on('CHAT_MESSAGE', message => {
    const room = clients[socket.id].room
    const msg = {
      authorId: socket.id,
      author: identityOf(socket.id),
      content: message 
    }
    io.to(room).emit('CHAT_MESSAGE', msg) 
  })

  socket.on('UNSET_IDENTITY', () => {
    console.log(socket.id, 'no longer wants to be know as', identityOf(socket.id))
    delete clients[socket.id]
    socket.emit('ACK_FORGOT_IDENTITY')
    io.emit('MESSAGE', `${shortId(socket.id)} is anonimus again`)
  })

  socket.on('disconnect', () => io.to('A game room').emit('notification', `${socket.id} has left this room`))
})