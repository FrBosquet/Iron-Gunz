import { takeEvery, select, put } from 'redux-saga/effects'
import { sendKeyset, initGame } from '../gameRoom/actions'
import socket from '../socketConnector'
import { setScreen } from '../screens/actions'

export default function* saga() {
	yield takeEvery(sendKeyset, function*() {
		const keyset = yield select(state => state.game && state.game.keySet)
		socket.emit('KEYSET', keyset)
	})

	yield takeEvery(initGame, function*() {
		yield put(setScreen('game'))
	})
}
