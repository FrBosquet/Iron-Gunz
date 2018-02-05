import React from 'react'
import { Wrapper, Button } from '../shared'

const RoomSelector = ({currentRoom, rooms, joinRoom, leaveRoom, partners}) =>{
  return (
    <Wrapper>
      {
        currentRoom === 'lobby' ?
          rooms.map( room => 
            <Button key={room} onClick={() => joinRoom(room)}>{room}</Button>
          ) :
          <Button onClick={leaveRoom}>Leave room</Button>
      }
      <h3>You are in {currentRoom}. Who is here?</h3>
      <div>
        { partners.join(', ')}
      </div>
    </Wrapper>
  )
}

export default RoomSelector