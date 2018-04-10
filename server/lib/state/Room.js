const Lobby = require('./Lobby')
const Game = require('../game')

class Room extends Lobby {
  constructor( name ) {
    super()
    this.name = name
    this.state = 'WAITING'
    this.available = true
    this.game = undefined
    this.clientsReady = {}
    this.secondsLeft = 0
    this.countdown = undefined
  }

  addClient(id){
    super.addClient(id)
    this.clientsReady[id] = false
    if(this.clients.length == 2){
      this.available = false
      this.game = new Game(...this.clients)
    }
  }
  
  removeClient(id){
    this.clients = this.clients.filter(clientId => clientId !== id)
    delete this.clientsReady[id]
    this.state = 'WAITING'
    this.available = true
    if(this.game){
      this.game.stopTimer()
      this.game = undefined
    }
  }

  setClientReady(id){
    this.clientsReady[id] = true
    if(this.arePlayersReady()){
      this.state = 'ALL_READY'
    }
  }

  unsetClientReady(id){
    this.state = 'WAITING'
    this.clientsReady[id] = false
  }

  startCountdown(secondCallback, finalCallback){
    this.secondsLeft = 5
    this.countdown = setInterval(() => {
      if(this.secondsLeft > 0){
        secondCallback(this.secondsLeft)
        this.secondsLeft--
      }else {
        this.stopCountdown()
        finalCallback()
      }
    }, 1000)
  }

  stopCountdown(){
    clearInterval(this.countdown)
  }

  getGame() {
    return this.game
  }

  getState(){
    return this.state
  }

  isRoomReady(){
    return this.getState() === 'ALL_READY'
  }

  arePlayersReady(){
    return this.getClientCount() === 2 &&
      this.getClients().reduce((acc, id) => acc && this.clientsReady[id] , true)
  }
}

module.exports = Room