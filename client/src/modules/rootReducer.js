import { combineReducers } from 'redux'
import loggerReducer from './logger'
import roomsReducer from './roomSelector'

export default combineReducers({
  logs: loggerReducer,
  rooms: roomsReducer
})