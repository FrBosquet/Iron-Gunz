import { createReducer } from 'redux-act'
import * as actions from './actions'
import socket from '../socketConnector'

const defaultGameState = null
const notEqualTo = (value) => (comparator) => comparator != value

export default createReducer({
  [actions.initGame]: (state, newGame) => {
    return { ...newGame, keySet: []}
  },
  [actions.finishGame]: state => {
    return defaultGameState
  },
  [actions.updateGame]: (state, newGameState) => ({...state, ...newGameState}),
  [actions.keyPress]: (state, keyCode) => {
    if(!state) return state
    const { keySet } = state
    const newKeySet = keySet.includes(keyCode) ? keySet : [...keySet, keyCode]
    return { ...state, keySet: newKeySet }
  },
  [actions.keyRelease]: (state, keyCode) => {
    if (!state) return state
    const newKeySet = state.keySet.filter(notEqualTo(keyCode))
    return { ...state, keySet: newKeySet }
  }
}, defaultGameState)
