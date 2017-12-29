import { createReducer } from 'redux-act'
import * as actions from './actions'

const defaultState = {
  currentGame: false
}

function newGame(){
  return {
    players: [
      {
        pos: [0,5]
      },
      {
        pos: [9,5]
      }
    ]
  }
}

export default createReducer({
  [actions.initGame]: state => ({...state, game: newGame()}),
  [actions.finishGame]: state => ({...state, game: false})
}, defaultState)