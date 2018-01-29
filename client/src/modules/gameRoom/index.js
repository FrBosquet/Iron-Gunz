import { createReducer } from 'redux-act'
import * as actions from './actions'

const defaultState = {
  game: false
}

function newGame(){
  return {
    state: 0
  }
}

export default createReducer({
  [actions.initGame]: state => ({...state, game: newGame()}),
  [actions.finishGame]: state => ({...state, game: false}),
  [actions.updateGame]: (state, newGameState) => ({...state, game: {state: newGameState}})
}, defaultState)