import { takeEvery, select } from 'redux-saga/effects'
import { sendKeyset } from '../gameRoom/actions'
import socket from '../socketConnector'

export default function* saga(){
  yield takeEvery(sendKeyset, function* () {
    const keyset = yield select(state => state.game && state.game.keySet)
    socket.emit('KEYSET', keyset)
    console.log('Send keyset to server', keyset)
  })
}