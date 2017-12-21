import { createReducer } from 'redux-act'
import * as actions from './actions'
import { getTimestamp } from '../utils/time';

const defaultState = []

export default createReducer({
  [actions.logMessage]: (state, message) => {
    return [`${getTimestamp()} :: ${message}`, ...state]
  }
}, defaultState)