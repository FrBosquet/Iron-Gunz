const express = require('express')
const app = express()
const server = require('http').Server(app)
const socket = require('socket.io')(server)
const actionsCreator = require('../actions')
const port = 4343

module.exports = function(log, state){
  server.listen(port, () => {
    log.listen(port)
  })

  socket.on('connection', client => {
    const ID = client.id
    const nickname = client.handshake.query.nickname

    state.newClient(ID, nickname)
    state.moveClientToLobby(ID)
    
    const msg = log.newConnection(state.whoIs(ID))
    client.emit('MESSAGE', msg)
    client.join('lobby')
    socket.to('lobby').emit('CHAT_MESSAGE', { content: msg })

    socket.to('lobby').emit('PARTNERS_LIST', state.getClientsAt('lobby'))

    client.on('disconnect', () => {
      const room = state.whereIs(ID)
      socket.to(room).emit('PARTNERS_LIST', state.getClientsAt(room))
      socket.emit('MESSAGE', log.disconnection(state.whoIs(ID)))
      state.removeClient(ID)
    })

    const actions = actionsCreator(log, state, socket, client, ID)
    Object.keys(actions).forEach( key => {
      client.on(key, actions[key])
    })
  })  
}