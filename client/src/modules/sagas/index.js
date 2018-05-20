import { takeEvery, select, put } from 'redux-saga/effects'
import { sendKeyset, initGame } from '../gameRoom/actions'
import socket from '../socketConnector'
import { setScreen } from '../screens/actions'
import {
	showNotifications,
	hideNotifications,
	setConnected,
	setDisconnected,
	addNotification
} from '../notification/actions'

const delay = ms => new Promise(res => setTimeout(res, ms))

function* notificationsSaga() {
	yield put(showNotifications())
	yield delay(5000)
	yield put(hideNotifications())
}

export default function* saga() {
	yield takeEvery(sendKeyset, function*() {
		const keyset = yield select(state => state.game && state.game.keySet)
		socket.emit('KEYSET', keyset)
	})

	yield takeEvery(initGame, function*() {
		yield put(setScreen('game'))
	})

	yield takeEvery(setConnected, notificationsSaga)
	yield takeEvery(setDisconnected, function*() {
		yield put(showNotifications())
	})
	yield takeEvery(addNotification, notificationsSaga)
}
