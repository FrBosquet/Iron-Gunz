import React from 'react'
import { Box } from '../shared'
import './style.css'

const GameRoom = () => 
  <Box className="game-room">
    <h1>I´m the propper game </h1>
    <div className="game-room-screen">
      <div className="player" id='player1'></div>
      <div className="player" id='player2'></div>
    </div>
  </Box>

export default GameRoom