import { createReducer } from 'redux-act'
import * as actions from './actions'

const defaultState = {
  roomList: [],
  currentRoom: 'lobby',
  partners: [],
  playerState: 'not ready'  
}

export default createReducer({
  [actions.setRooms]: (state, rooms) => ({...state, roomList: rooms}),
  [actions.joinRoom]: (state, room) => ({ ...state, currentRoom: room }),
  [actions.leaveRoom]: (state, room) => ({ ...state, currentRoom: 'lobby'}),
  [actions.setPartners]: (state, partners) => ({ ...state, partners: partners }),
  [actions.setReady]: state => ({ ...state, playerState: 'ready' }),
  [actions.unsetReady]: state => ({ ...state, playerState: 'not ready' }),
  [actions.setPlayerStateWaitingForAck]: state => ({ ...state, playerState: 'waiting'})
}, defaultState)