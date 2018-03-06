class Board {
  constructor(width, height){
    this.width = width
    this.height = height
    this.stage = Array(width).fill(null).map(() => Array(height).fill(''))
    this.populateStage()
  }

  populateStage(){
    for(let i = 0; i < 20; i++) {
      let x = Math.floor(Math.random() * this.width)
      let y = Math.floor(Math.random() * this.height)
      this.stage[x][y] = 'Column'
    }
  }
}

module.exports = Board