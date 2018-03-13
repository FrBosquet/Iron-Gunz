import { createReducer } from 'redux-act'
import * as actions from './actions'

const defaultState = 'title'

export default createReducer({
  [actions.setScreen]: (state, screen) => screen
}, defaultState)