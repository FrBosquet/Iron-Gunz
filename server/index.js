const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

let state = ''
let rooms = {
  room1: {},
  room2: {},
  room3: {},
  room4: {}
}

server.listen(4343, () => {
  console.log('Listening on port 4343')
})

io.on('connection', socket => {
  console.log('Client connected', socket.id)
  socket.emit('MESSAGE', 'Welcome to the server')
  io.emit('MESSAGE', `${socket.id} has connected to the server`)

  socket.on('disconnect', () => io.to('A game room').emit('notification', `${socket.id} has left this room`))
})