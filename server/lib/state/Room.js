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
    if(this.clients.length === 2){
      this.available = false
      this.game = new Game()
    }
  }

  removeClient(id){
    super.removeClient(id)
    this.available = true
  }

  getGame() {
    return this.game
  }
}

module.exports = Room