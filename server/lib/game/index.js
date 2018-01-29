class Game {
  constructor( player1, player2 ){
    this.players = {
      [player1]:{ x: 0, y: 5 },
      [player2]:{ x: 0, y: 10 }
    }
    this.board = []
    this.state = 0
    this.timer = null
  }

  update(input){
    const { timer, ...state} = this
    return state
  }

  setTimer(timer) {
    this.timer = timer
  }

  stopTimer() {
    clearInterval(this.timer)
  }
}

module.exports = Game