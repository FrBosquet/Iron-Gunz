import { createAction } from 'redux-act'

export const setConnected = createAction('Set connection status to on')
export const setDisconnected = createAction('Set connection status to off')
export const addNotification = createAction(
	'Add generic message to notification'
)
export const showNotifications = createAction('Show last notification')
export const hideNotifications = createAction('Hide notification')
