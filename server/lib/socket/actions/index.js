module.exports = (logger, state, socket, client, id) => {
  return {
    RETRIEVE_ROOMS: () => {
      logger.retrieveRooms(state.whoIs(id))
      client.emit('ROOM_LIST', state.getAvailableRooms())
    },
    JOIN_ROOM: room => {
      const msg = logger.joinRoom(state.whoIs(id), room)
      state.moveClientToRoom(id, room)
      client.leave('lobby')
      client.join(room)
      socket.emit('MESSAGE', msg)
      socket.to('lobby').emit('ROOM_LIST', state.getAvailableRooms())
      socket.to(room).emit('PARTNERS_LIST', state.getClientsAt(room))
      socket.to('lobby').emit('PARTNERS_LIST', state.getClientsAt('lobby'))
      const game = state.getGame(room)
      if(game){
        const createGameMsg = logger.createGame(room)
        socket.to(room).emit('MESSAGE', createGameMsg)
        socket.to(room).emit('INIT_GAME', game)
        const timer = setInterval(()=> {
          const newState = game.update(0)
          socket.to(room).emit('UPDATE_GAME', newState)
        }, 100)
        game.setTimer(timer)
      }
    },
    LEAVE_ROOM: () => {
      const room = state.whereIs(id)
      const msg = logger.leaveRoom(state.whoIs(id), room)
      state.moveClientToLobby(id)
      client.leave(room)
      client.join('lobby')
      socket.emit('MESSAGE', msg)
      socket.to('lobby').emit('ROOM_LIST', state.getAvailableRooms())
      socket.to('lobby').emit('PARTNERS_LIST', state.getClientsAt('lobby'))
      socket.to(room).emit('PARTNERS_LIST', state.getClientsAt(room))
      const game = state.getGame(room)
      if (game) {
        game.stopTimer()
        socket.to(room).emit('FINISH_GAME', 'the game has finished')
      }
    },
    SET_IDENTITY: name => {
      const room = state.whereIs(id)
      state.setIdentity(id, name)
      client.emit('ACK_IDENTITY', name)
      socket.to(room).emit('PARTNERS_LIST', state.getClientsAt(room))
      socket.emit('MESSAGE', logger.setIdentity(id, name))
    },
    UNSET_IDENTITY: () => {
      const room = state.whereIs(id)
      state.forgetIdentity(id)
      client.emit('ACK_FORGOT_IDENTITY')
      socket.to(room).emit('PARTNERS_LIST', state.getClientsAt(room))
      socket.emit('MESSAGE', logger.unsetIdentity(id))
    },
    CHAT_MESSAGE: message => {
      const room = state.whereIs(id)
      const msg = {
        authorId: id,
        author: state.whoIs(id),
        content: message
      }
      socket.to(room).emit('CHAT_MESSAGE', msg)
    }
  }
}