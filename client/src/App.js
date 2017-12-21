import React, { Component } from 'react'
import Logger from './modules/logger/LoggerEnhanced'
import RoomSelector from './modules/roomSelector/RoomSelectorEnhanced'
import Identity from './modules/identity/IdentityEnhanced'
import Chat from './modules/chat/ChatEnhanced'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Logger />
        <Identity />
        <Chat />
        <RoomSelector />
      </div>
    )
  }
}

export default App
