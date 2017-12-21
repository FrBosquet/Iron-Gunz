import { createReducer } from 'redux-act'
import * as actions from './actions'

const defaultState = []

const toFixed = number => `0${number}`.slice(-2)

export default createReducer({
  [actions.logMessage]: (state, message) => {
    const time = new Date()
    const hours = toFixed(time.getHours())
    const minutes = toFixed(time.getMinutes())
    const seconds = toFixed(time.getSeconds())
    return [...state, `${hours}:${minutes}:${seconds} :: ${message}`]
  }
}, defaultState)