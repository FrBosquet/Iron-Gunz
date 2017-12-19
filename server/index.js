const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

let state = ''

server.listen(4343, () => {
  console.log('Listening on port 4343')
})

io.on('connection', socket => {
  console.log('Client connected', socket.id)

  socket.join('A game room')
  socket.emit('message', state)
  io.to('A game room').emit('notification', `${socket.id} signed to this room`)
  
  
  socket.on('keyPress', key => {
    
    switch(key){
      case 'Backspace':
        state = state.substr(0, state.length - 1)
        break
      case 'Shift':
      case 'Enter':
      case 'Tab':
      case 'Delete':
        break
      default:
        state = `${state}${key}`
    }
    io.to('A game room').emit('message', state)
  })

  socket.on('disconnect', () => io.to('A game room').emit('notification', `${socket.id} has left this room`))
})