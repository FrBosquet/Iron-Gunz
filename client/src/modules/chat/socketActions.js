import { addMessage } from './actions'

export default {
  CHAT_MESSAGE: msg => addMessage(msg)
}