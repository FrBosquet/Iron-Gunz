import React from 'react'
import { LayoutWrapper, Button, LayoutWrapperutton, Text } from '../shared'

const RoomSelector = ({
  currentRoom,
  rooms,
  joinRoom,
  leaveRoom,
  partners,
  playerState,
  setReady,
  unsetReady
}) => {
  const lobby = currentRoom === 'lobby'
  return (
    <LayoutWrapper>
      <Text>You are in {currentRoom}. Who is here?</Text>
      <Text bold padded>
        {partners.join(', ')}
      </Text>
      {lobby && <Text>Available rooms:</Text>}
      {lobby ? (
        rooms.map(room => (
          <Button leftAlign key={room} onClick={() => joinRoom(room)}>
            {room}
          </Button>
        ))
      ) : (
        <LayoutWrapper direction="vertical">
          {playerState === 'not ready' && <Button onClick={setReady}>Ready</Button>}
          {playerState === 'ready' && <Button onClick={unsetReady}>Not ready</Button>}
          <Button onClick={leaveRoom}>Leave room</Button>
        </LayoutWrapper>
      )}
    </LayoutWrapper>
  )
}

export default RoomSelector
