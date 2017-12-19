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

  socket.on('message', msg => {
    io.emit('message', `response ${msg}`)
    console.log('Recibido', msg)
  })
})