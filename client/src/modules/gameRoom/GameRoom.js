import React from 'react'
import { Wrapper } from '../shared'
import { GameRoomScreen, Player } from './styled'

const makeStyle = player => ({
  transform: `translate(${player.x - 2.5}px, ${player.y - 2.5}px)`
})

const GameRoom = ({ game }) => {
  if(!game) return null
  
  const players = Object.values(game.players)
  const player1style = makeStyle(players[0])
  const player2style = makeStyle(players[1])

  return (
    <Wrapper center>
      <h1>I´m the propper game </h1>
      <GameRoomScreen>
        <Player id='player1' style={ player1style } />
        <Player id='player2' style={ player2style } />
      </GameRoomScreen>
    </Wrapper>
  )
}

export default GameRoom