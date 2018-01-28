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
    if(room) this.rooms[room].removeClient(id)
    this.clients.moveToLobby(id)
  }

  moveClientToRoom(id, room) {
    this.lobby.removeClient(id)
    this.rooms[room].addClient(id)
    this.clients.moveToRoom(id, room)
  }

  getAvailableRooms(){
    return Object.keys(this.rooms).filter( room => this.rooms[room].available)
  }

  getClientsAtLobby(){
    return this.lobby.getClients()
  }

  getClientsAtRoom(room){
    return this.rooms[room].getClients()
  }

  getClientCountAtRoom(room){
    return this.getClientsAtRoom(room).length
  }

  whereIs(id) {
    return this.clients.whereIs(id)
  }

  whoIs(id) {
    return this.clients.whoIs(id)
  }

  setIdentity(id, name) {
    this.clients.setIdentity(id, name)
  }

  forgetIdentity(id) {
    this.clients.forgetIdentity(id)
  }

  removeClient(id) {
    this.lobby.removeClient(id)
    Object.keys(this.rooms)
      .forEach(room => 
        this.rooms[room].removeClient(id))
    this.clients.remove(id)
  }
}

module.exports = State