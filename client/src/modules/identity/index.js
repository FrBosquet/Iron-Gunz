import { createReducer } from 'redux-act'
import * as actions from './actions'

const defaultState = localStorage.getItem('nickname') || null

export default createReducer({
  [actions.setIdentity]: (state, identity) => {
    localStorage.setItem('nickname', identity)
    return identity
  },
  [actions.unsetIdentity]: state => {
    localStorage.removeItem('nickname')
    return null
  }
}, defaultState)