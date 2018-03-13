import React, { Component } from 'react'
import Logger from './modules/logger/LoggerEnhanced'
import RoomSelector from './modules/roomSelector/RoomSelectorEnhanced'
import Identity from './modules/identity/IdentityEnhanced'
import Chat from './modules/chat/ChatEnhanced'
import GameRoom from './modules/gameRoom/GameRoomEnhanced'
import styled from 'styled-components'
import ScreenRouter from './modules/screens/ScreenRouterEnhanced'

const AppWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <ScreenRouter />
      </AppWrapper>
    )
  }
}

export default App
