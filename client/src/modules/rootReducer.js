import { combineReducers } from 'redux'
import loggerReducer from './logger'

export default combineReducers({
  logs: loggerReducer
})