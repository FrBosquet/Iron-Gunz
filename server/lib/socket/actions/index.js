module.exports = (logger, state, socket, client, id) => {
  return {
    RETRIEVE_ROOMS: () => {
      logger.retrieveRooms(state.whoIs(id))
      client.emit('ROOM_LIST', state.getAvailableRooms())
    },
    JOIN_ROOM: room => {
      const user = state.whoIs(id)
      const msg = logger.joinRoom(user, room)
      state.moveClientToRoom(id, room)
      client.leave('lobby')
      client.join(room)
      socket.emit('MESSAGE', msg)
      socket.to('lobby').emit('ROOM_LIST', state.getAvailableRooms())
      socket.to(room).emit('PARTNERS_LIST', state.getClientsAt(room))
      socket.to('lobby').emit('PARTNERS_LIST', state.getClientsAt('lobby'))
      socket
        .to(room)
        .emit('CHAT_MESSAGE', { content: `${user} has join ${room}` })
      const game = state.getGame(room)
      if (game) {
        const createGameMsg = logger.createGame(room)
        socket.to(room).emit('MESSAGE', createGameMsg)
        socket.to(room).emit('INIT_GAME', game)
        const timer = setInterval(() => {
          const clientsKeysets = state.getKeysetFrom(room)
          const newState = game.update(clientsKeysets)
          socket.to(room).emit('UPDATE_GAME', newState)
        }, 100)
        game.setTimer(timer)
      }
    },
    LEAVE_ROOM: () => {
      const user = state.whoIs(id)
      const room = state.whereIs(id)
      const msg = logger.leaveRoom(state.whoIs(id), room)
      const game = state.getGame(room)
      state.moveClientToLobby(id)
      if (game) {
        game.stopTimer()
        socket.to(room).emit('FINISH_GAME', 'the game has finished')
      }
      client.emit('ACK_UNSET_READY')
      client.leave(room)
      client.join('lobby')
      socket.to(room).emit('CHAT_MESSAGE', { content: `${user} has left the room`})
      socket.emit('MESSAGE', msg)
      socket.to('lobby').emit('ROOM_LIST', state.getAvailableRooms())
      socket.to('lobby').emit('PARTNERS_LIST', state.getClientsAt('lobby'))
      socket.to(room).emit('PARTNERS_LIST', state.getClientsAt(room))
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
    },
    SET_READY: () => {
      const room = state.whereIs(id)
      const user = state.whoIs(id)
      logger.userReady(user)
      socket.to(room).emit('CHAT_MESSAGE', { content: `${user} is ready` })
      client.emit('ACK_SET_READY')
    },
    UNSET_READY: () => {
      const room = state.whereIs(id)
      const user = state.whoIs(id)
      logger.userNotReady(user)
      socket.to(room).emit('CHAT_MESSAGE', { content: `${user} is not ready` })
      client.emit('ACK_UNSET_READY')
    },
    KEYSET: set => {
      state.setKeysetToClient(id, set)
    }
  }
}
