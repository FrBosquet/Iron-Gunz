import { createReducer } from 'redux-act'
import * as actions from './actions'

const defaultState = []

export default createReducer({
  [actions.logMessage]: (state, message) => {
    const time = new Date()
    return [...state, `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} :: ${message}`]
  }
}, defaultState)