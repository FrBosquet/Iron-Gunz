class Lobby {
  constructor() {
    this.clients = []
  }

  addClient(id) {
    this.clients.push(id)
  }

  getClients() {
    return this.clients
  }

  removeClient(id) {
    this.clients = this.clients.filter( clientId => clientId !== id)
  }
}

module.exports = Lobby