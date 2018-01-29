class Game {
  constructor(){
    this.players = []
    this.board = []
    this.state = 0
    this.timer = null
  }

  update(input){
    this.state ++
    return this.state
  }

  setTimer(timer) {
    this.timer = timer
  }

  stopTimer() {
    clearInterval(this.timer)
  }
}

module.exports = Game