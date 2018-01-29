import { createReducer } from 'redux-act'
import * as actions from './actions'

const defaultGameState = null
const defaultKeyState = []
const notEqualTo = (value) => (comparator) => comparator != value

export const gameReducer = createReducer({
  [actions.initGame]: (state, newGame) => newGame,
  [actions.finishGame]: () => defaultGameState,
  [actions.updateGame]: (state, newGameState) => newGameState
}, defaultGameState)

export const keyReducer = createReducer({
  [actions.keyPress]: (state, keyCode) => state.includes(keyCode) ? state : [...state, keyCode],
  [actions.keyRelease]: (state, keyCode) => state.filter(notEqualTo(keyCode)),
}, defaultKeyState)