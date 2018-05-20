import { setConnected, setDisconnected, addNotification } from './actions'

export default {
	connect: () => setConnected(),
	disconnect: () => setDisconnected()
}
