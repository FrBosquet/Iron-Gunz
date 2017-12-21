import { createReducer } from 'redux-act'
import * as actions from './action'
import { leaveRoom } from '../roomSelector/actions'
import { getTimestamp } from '../utils/time';

const defaultState = []

export default createReducer({
  [actions.addMessage]: (state, message) => {
    const msg = {...message, timeStamp: getTimestamp()}
    return [msg, ...state]
  },
  [leaveRoom]: state => []
}, defaultState)