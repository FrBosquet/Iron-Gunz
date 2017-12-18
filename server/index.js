const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

server.listen(4343, () => {
  console.log('Listening on port 4343')
})

io.on('connection', socket => {
  console.log('Client connected')

  socket.on('disconnect', () => console.log('Client disconnected'))

  socket.on('chat message', msg => {
    io.emit('chat message', msg)
  })
})