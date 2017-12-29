const Lobby = require('./Lobby')

class Room extends Lobby {
  constructor( name ) {
    super()
    this.name = name
    this.available = true
  }
}

module.exports = Room