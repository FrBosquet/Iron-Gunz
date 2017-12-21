import React, { Component } from 'react'
import Logger from './modules/logger/LoggerEnhanced'
import RoomSelector from './modules/roomSelector/RoomSelectorEnhanced'
import Identity from './modules/identity/IdentityEnhanced'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Logger />
        <Identity />
        <RoomSelector />
      </div>
    )
  }
}

export default App
