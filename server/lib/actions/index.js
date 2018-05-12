module.exports = (logger, state, socket, client, id) => {
	const lobby = 'lobby'
	const messageTo = (where, content, who) => {
		const message = {
			content
		}

		if (who) {
			message.authorId = who
			message.author = state.whoIs(id)
		}

		socket.to(where).emit('CHAT_MESSAGE', message)
	}

	return {
		RETRIEVE_ROOMS: () => {
			logger.retrieveRooms(state.whoIs(id))
			client.emit('ROOM_LIST', state.getAvailableRooms())
		},
		JOIN_ROOM: room => {
			const user = state.whoIs(id)
			const msg = logger.joinRoom(user, room)
			state.moveClientToRoom(id, room)
			client.leave(lobby)
			client.join(room)

			socket.to(lobby).emit('ROOM_LIST', state.getAvailableRooms())
			socket.to(room).emit('PARTNERS_LIST', state.getClientsAt(room))
			socket.to(lobby).emit('PARTNERS_LIST', state.getClientsAt(lobby))

			messageTo(room, `${user} has join`)
			messageTo(lobby, `${user} has join ${room}`)

			const game = state.getGame(room)
			if (game) {
				const createGameMsg = logger.createGame(room)
				messageTo(room, createGameMsg)
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

			state.stopRoomCountdown(room)
			client.emit('ACK_UNSET_READY')
			client.leave(room)
			client.join(lobby)

			messageTo(room, `${user} has left the room`)
			messageTo(room, `${user} has left ${room}`)

			socket.to(lobby).emit('ROOM_LIST', state.getAvailableRooms())
			socket.to(lobby).emit('PARTNERS_LIST', state.getClientsAt(lobby))
			socket.to(room).emit('PARTNERS_LIST', state.getClientsAt(room))
		},
		SET_IDENTITY: name => {
			const room = state.whereIs(id)
			state.setIdentity(id, name)
			client.emit('ACK_IDENTITY', name)
			socket.to(room).emit('PARTNERS_LIST', state.getClientsAt(room))

			messageTo(lobby, logger.setIdentity(id, name))
		},
		UNSET_IDENTITY: () => {
			const room = state.whereIs(id)
			state.forgetIdentity(id)
			client.emit('ACK_FORGOT_IDENTITY')
			socket.to(room).emit('PARTNERS_LIST', state.getClientsAt(room))
			messageTo(lobby, logger.unsetIdentity(id))
		},
		CHAT_MESSAGE: message => {
			const room = state.whereIs(id)
			messageTo(room, message, id)
		},
		SET_READY: () => {
			const room = state.whereIs(id)
			const user = state.whoIs(id)
			const userReadyMsg = logger.userReady(user)
			state.setClientReady(id)
			if (state.isRoomReady(room)) {
				state.startRoomCountdown(
					room,
					secondsLeft => messageTo(room, `${secondsLeft}...`),
					() => messageTo(room, 'Countdown over')
				)
			}
			messageTo(room, userReadyMsg)
			client.emit('ACK_SET_READY')
		},
		UNSET_READY: () => {
			const room = state.whereIs(id)
			const user = state.whoIs(id)
			const userNotReadyMsg = logger.userNotReady(user)
			state.unsetClientReady(id)
			state.stopRoomCountdown(room)
			messageTo(room, userNotReadyMsg)
			client.emit('ACK_UNSET_READY')
		},
		KEYSET: set => {
			state.setKeysetToClient(id, set)
		}
	}
}
