import React from 'react'
import { Wrapper } from '../shared'
import './style.css'

const makeStyle = player => ({
  transform: `translate(${player.x - 2.5}px, ${player.y - 2.5}px)`
})

const GameRoom = ({ game }) => {
  if(!game) return null
  
  const players = Object.values(game.players)
  const player1style = makeStyle(players[0])
  const player2style = makeStyle(players[1])

  return (
    <Wrapper className='game-room'>
      <h1>I´m the propper game </h1>
      <div className='game-room-screen'>
        <div className='player' id='player1' style={ player1style }></div>
        <div className='player' id='player2' style={ player2style }></div>
      </div>
    </Wrapper>
  )
}

export default GameRoom