const express = require('express')
const app = express()
const server = require('http').Server(app)
const socket = require('socket.io')(server)
const actionsCreator = require('../actions')
const port = 4343

module.exports = function(log, state) {
	server.listen(port, () => {
		log.listen(port)
	})

	socket.on('connection', client => {
		const id = client.id
		const nickname = client.handshake.query.nickname

		const actions = actionsCreator(log, state, socket, client, id)

		state.newClient(id, nickname)
		state.moveClientToLobby(id)

		const msg = log.newConnection(state.whoIs(id))
		client.join('lobby')

		socket.to('lobby').emit('CHAT_MESSAGE', { content: msg })

		socket.to('lobby').emit('PARTNERS_LIST', state.getClientsAt('lobby'))

		client.on('disconnect', () => {
			const room = state.whereIs(id)
			const user = state.whoIs(id)

			if (room !== 'lobby') {
				const userDisconnectedMsg = log.disconnection(user)
				state.unsetClientReady(id)
				state.stopRoomCountdown(room)
				const message = {
					content: userDisconnectedMsg
				}
				socket.to(room).emit('CHAT_MESSAGE', message)
			}

			socket
				.to('lobby')
				.emit('CHAT_MESSAGE', { content: log.disconnection(state.whoIs(id)) })
			state.removeClient(id)
			socket.to(room).emit('PARTNERS_LIST', state.getClientsAt(room))
		})

		Object.keys(actions).forEach(key => {
			client.on(key, actions[key])
		})
	})
}
