import React from 'react'
import { Box, Button } from '../shared'

const RoomSelector = ({currentRoom, rooms, joinRoom, leaveRoom, partners}) =>{
  return (
    <Box>
      {
        currentRoom === 'lobby' ?
          rooms.map( room => 
            <Button key={room} label={room} action={ ()=>joinRoom(room) } />
          ) :
          <Button label='Leave room' action={leaveRoom} />
      }
      <h3>You are in {currentRoom}. Who is here?</h3>
      <div>
        { partners.join(', ')}
      </div>
    </Box>
  )
}

export default RoomSelector