import io from 'socket.io-client'

export default class socketConnector {
  static socket
  static connect(port){
    this.socket = io(port)
  }
  static addListener(event, callback){
    if (!this.socket) throw new Error('The socket is not open')
    this.socket.on(event, callback)
  }
  
  static emit(event, message) {
    if (!this.socket) throw new Error('The socket is not open')
    this.socket.emit(event, message)
  }
}