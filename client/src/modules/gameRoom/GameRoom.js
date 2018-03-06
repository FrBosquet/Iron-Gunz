import React from 'react'
import { Wrapper } from '../shared'
import { GameRoomScreen, Player } from './components'
import Base from './components/sprites/base'

const makeStyle = player => ({
  transform: `translate(${player.x - 2.5}px, ${player.y - 2.5}px)`
})

const GameRoom = ({ game }) => {
  if(!game) return null
  
  const players = Object.values(game.players)
  const player1style = makeStyle(players[0])
  const player2style = makeStyle(players[1])
  const { height, width, stage } = game.board

  return (
    <Wrapper center>
      <h1>I´m the propper game </h1>
      <GameRoomScreen width={width} height={height}>
        { stage && stage.map((columns, row) => {
          return columns.map((content, column) => {
            return <Base key={row+column} sprite={content ? content : 'floor'} x={row} y={column}/>
          })
        })}
      </GameRoomScreen>
    </Wrapper>
  )
}

export default GameRoom