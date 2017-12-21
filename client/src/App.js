import React, { Component } from 'react'
import Logger from './modules/logger/LoggerEnhanced'
import RoomSelector from './modules/roomSelector/RoomSelectorEnhanced'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Logger />
        <RoomSelector />
      </div>
    )
  }
}

export default App
