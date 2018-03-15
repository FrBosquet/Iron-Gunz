import React from 'react'
import { LayoutWrapper, Button, LayoutWrapperutton, Text } from '../shared'

const RoomSelector = ({currentRoom, rooms, joinRoom, leaveRoom, partners}) =>{
  const lobby = currentRoom === 'lobby'
  return (
    <LayoutWrapper>
      <Text>You are in {currentRoom}. Who is here?</Text>
      <Text bold padded>{ partners.join(', ')}</Text>
      { lobby && <Text>Available rooms:</Text> }
      {
        lobby ?
          rooms.map( room => 
            <Button leftAlign key={room} onClick={() => joinRoom(room)}>{room}</Button>
          ) :
          <Button onClick={leaveRoom}>Leave room</Button>
      }
    </LayoutWrapper>
  )
}

export default RoomSelector