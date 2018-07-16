import { createReducer } from 'redux-act'
import * as actions from './actions'

const defaultState = {
	connectionStatus: false,
	notificationsVisible: true,
	lastMessage: ''
}

export default createReducer(
	{
		[actions.setConnected]: state => ({
			...state,
			connectionStatus: true,
			lastMessage: 'Connected to service'
		}),
		[actions.setDisconnected]: state => ({
			...state,
			connectionStatus: false,
			lastMessage: 'Disconnected from service'
		}),
		[actions.addNotification]: (state, message) => ({
			...state,
			lastMessage: message
		}),
		[actions.showNotifications]: state => ({
			...state,
			notificationsVisible: true
		}),
		[actions.hideNotifications]: state => ({
			...state,
			notificationsVisible: false
		})
	},
	defaultState
)
