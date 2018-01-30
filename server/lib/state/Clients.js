const Client = require('./Client')

class Clients {
  constructor(){
    this.list = {}
  }

  newClient(id, nickname) {
    this.list[id] = new Client(id)
    this.setIdentity(id, nickname)
  }

  moveToLobby(id) {
    this.list[id].room = 'lobby'
  }
  
  moveToRoom(id, room) {
    this.list[id].room = room
  }

  whoIs(id){
  return this.list[id].nickname || `${id.substr(0, 5)}...`
  }

  whereIs(id) {
    return this.list[id].room
  }

  setIdentity(id, name){
    this.list[id].nickname = name
  }
  
  forgetIdentity(id){
    this.list[id].nickname = undefined
  }

  remove(id) {
    delete this.list[id]
  }
}

module.exports = Clients