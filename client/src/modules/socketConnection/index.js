import io from 'socket.io-client'

export default class socketConnector {
  static socket
  static connect(port){
    this.socket = io(port)
  }
  static addListener(event, callback){
    if (!this.socket) throw 'The socket is not opened'
    this.socket.on(event, callback)
  }
}