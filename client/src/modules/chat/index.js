import { createReducer } from 'redux-act'
import * as actions from './actions'
import { leaveRoom, joinRoom } from '../roomSelector/actions'
import { getTimestamp } from '../utils/time';

const defaultState = []

export default createReducer({
  [actions.addMessage]: (state, message) => {
    const msg = {...message, timeStamp: getTimestamp()}
    return [msg, ...state]
  },
  [joinRoom]: state => [],
  [leaveRoom]: state => []
}, defaultState)