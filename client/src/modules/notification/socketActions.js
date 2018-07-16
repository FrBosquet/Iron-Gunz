import { setConnected, setDisconnected } from './actions'

export default {
	connect: () => setConnected(),
	disconnect: () => setDisconnected()
}
