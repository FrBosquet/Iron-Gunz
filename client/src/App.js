import React, { Component } from 'react'
import Logger from './modules/logger/LoggerEnhanced'
import RoomSelector from './modules/roomSelector/RoomSelectorEnhanced'
import Identity from './modules/identity/IdentityEnhanced'
import Chat from './modules/chat/ChatEnhanced'
import GameRoom from './modules/gameRoom/GameRoomEnhanced'
import styled from 'styled-components'

const AppWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <Logger />
        <Identity />
        <GameRoom />
        <Chat />
        <RoomSelector />
      </AppWrapper>
    )
  }
}

export default App
