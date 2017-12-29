class Clients {
  constructor(){
    this.list = {}
  }

  newClient(id, nickname) {
    this.list[id] = {
      nickname
    }
  }

  moveToLobby(id) {
    this.list[id].room = 'lobby'
  }
  
  moveToRoom(id, room) {
    this.list[id].room = room
  }

  whereIs(id) {
    return this.list[id].room
  }
}

module.exports = Clients