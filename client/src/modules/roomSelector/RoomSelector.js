import React from 'react'
import { Box, Button } from '../shared'

const RoomSelector = ({rooms, joinRoom}) =>{
  return (
    <Box>
      <h1>Room selector</h1>
      { rooms.map( room => 
        <Button key={room} label={room} action={ ()=>joinRoom(room) } />
      )}
    </Box>
  )
}

export default RoomSelector