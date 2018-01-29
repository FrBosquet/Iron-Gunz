const Lobby = require('./Lobby')
const Game = require('../game')

class Room extends Lobby {
  constructor( name ) {
    super()
    this.name = name
    this.available = true
    this.game = undefined
  }

  addClient(id){
    super.addClient(id)
    if(this.clients.length == 2){
      this.available = false
      this.game = new Game(...this.clients)
    }
  }

  getGame() {
    return this.game
  }

  removeClient(id){
    this.clients = this.clients.filter(clientId => clientId !== id)
    this.available = true
    if(this.game){
      this.game.stopTimer()
      this.game = undefined
    }
  }

  getClientCount(){
    return this.clients.length
  }
}

module.exports = Room