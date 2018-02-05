class Game {
  constructor( player1, player2 ){
    this.players = {
      [player1]:{ x: 2.5, y: 50 },
      [player2]:{ x: 97.5, y: 50 }
    }
    this.board = []
    this.state = 0
    this.timer = null
  }

  updatePlayerPosition(id, input){
    const currentPosition = this.players[id]
    const jump = 2.5
    input.forEach(key => {
      switch(key){
        case 38: currentPosition['y'] -= jump; break;//up
        case 40: currentPosition['y'] += jump; break;//down
        case 37: currentPosition['x'] -= jump; break;//left
        case 39: currentPosition['x'] += jump; break;//right
      }
    })
    
    if(currentPosition['y'] < 2.5 ) currentPosition['y'] = 2.5
    if(currentPosition['y'] > 97.5) currentPosition['y'] = 97.5
    if(currentPosition['x'] < 2.5 ) currentPosition['x'] = 2.5
    if(currentPosition['x'] > 97.5) currentPosition['x'] = 97.5

    this.players[id] = currentPosition
  }

  update(input){
    const { timer, ...state } = this
    Object.keys(input).forEach(id => this.updatePlayerPosition(id, input[id]))
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