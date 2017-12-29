const Lobby = require('./Lobby')
const Room = require('./Room')
const Clients = require('./Clients')

const defaultRooms = ['room1','room2','room3','room4']

class State {
  constructor(){
    this.lobby = new Lobby()
    this.clients = new Clients()
    this.rooms = defaultRooms.reduce((acc, room) => {
      acc[room] = new Room(room)
      return acc
    }, {} )
  }

  newClient(id, nickname) {
    this.clients.newClient(id, nickname)
  }

  moveClientToLobby(id) {
    const room = this.clients.whereIs(id)
    this.lobby.addClient(id)
    this.rooms[room].removeClient(id)
    this.clients.moveToLobby(id)
  }

  moveClientToRoom(id, room) {
    this.lobby.removeClient(id)
    this.rooms[room].addClient(id)
    this.clients.moveToRoom(id, room)
  }

  removeClient(id) {
    this.lobby.removeClient(id)
    Object.keys(this.rooms)
      .forEach(room => 
        this.rooms[room].removeClient(id))
    delete this.clients[id]
  }
}

module.exports = State