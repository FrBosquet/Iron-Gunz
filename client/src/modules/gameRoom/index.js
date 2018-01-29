import { createReducer } from 'redux-act'
import * as actions from './actions'

const defaultState = null

export default createReducer({
  [actions.initGame]: (state, newGame) => newGame,
  [actions.finishGame]: () => defaultState,
  [actions.updateGame]: (state, newGameState) => newGameState
}, defaultState)