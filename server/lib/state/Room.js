const Lobby = require('./Lobby')

class Room extends Lobby {
  constructor( name ) {
    super()
    this.name = name
    this.available = true
  }

  addClient(id){
    this.clients.push(id)
    if(this.getClientCount() === 2){
      this.available = false
    }
  }

  removeClient(id){
    this.clients = this.clients.filter(clientId => clientId !== id)
    this.available = true
  }

  getClientCount(){
    return this.clients.length
  }
}

module.exports = Room