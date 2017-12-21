import { createReducer } from 'redux-act'
import * as actions from './actions'

const defaultState = {
  roomList: [],
  currentRoom: null
}

export default createReducer({
  [actions.setRooms]: (state, rooms) => ({...state, roomList: rooms}),
  [actions.joinRoom]: (state, room) => ({ ...state, currentRoom: room }),
  [actions.leaveRoom]: (state, room) => ({ ...state, currentRoom: null })
}, defaultState)