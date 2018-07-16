class Lobby {
  constructor() {
    this.clients = []
  }

  addClient(id) {
    if(!this.clients.includes(id)) this.clients.push(id)
  }

  removeClient(id) {
    this.clients = this.clients.filter(clientId => clientId !== id)
  }

  getClients() {
    return this.clients
  }

  getClientCount() {
    return this.clients.length
  }
}

module.exports = Lobby
