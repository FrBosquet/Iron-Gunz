class Lobby {
  constructor() {
    this.clients = []
  }

  addClient(id) {
    this.clients.push(id)
  }

  removeClient(id) {
    this.clients.filter( clientId => clientId !== id)
  }
}

module.exports = Lobby