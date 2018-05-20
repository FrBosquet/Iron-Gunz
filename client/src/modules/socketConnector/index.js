import io from 'socket.io-client'
import roomSelectorActions from '../roomSelector/socketActions'
import chatActions from '../chat/socketActions'
import gameActions from '../gameRoom/socketActions'
import notificationActions from '../notification/socketActions'

const Actions = {
	...roomSelectorActions,
	...chatActions,
	...gameActions,
	...notificationActions
}

export default class socketConnector {
	static socket
	static connect(port, store) {
		this.socket = io(port)
		Object.keys(Actions).forEach(action => {
			this.addListener(action, payload =>
				store.dispatch(Actions[action](payload))
			)
		})
	}
	static addListener(event, callback) {
		if (!this.socket) throw new Error('The socket is not open')
		this.socket.on(event, callback)
	}

	static emit(event, message) {
		if (!this.socket) throw new Error('The socket is not open')
		this.socket.emit(event, message)
	}
}
