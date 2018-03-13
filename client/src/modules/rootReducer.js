import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import loggerReducer from './logger'
import roomsReducer from './roomSelector'
import identityReducer from './identity'
import chatReducer from './chat'
import gameReducer from './gameRoom'
import screenReducer from './screens'

export default combineReducers({
  logs: loggerReducer,
  rooms: roomsReducer,
  form: formReducer,
  identity: identityReducer,
  chat: chatReducer,
  game: gameReducer,
  screen: screenReducer
})