import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import io from 'socket.io-client'

class App extends Component {
  constructor() {
    super()
    this.socket = io('192.168.1.45:4343')
    this.state = { message: ''}

    document.addEventListener('keydown', keyEvent => {
      this.socket.emit('keyPress', keyEvent.key)
    })
  }

  componentDidMount(){
    this.socket.on('notification',console.log)
    this.socket.on('message', msg => this.setState({ message: msg }))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          {this.state.message}
        </div>
      </div>
    )
  }
}

export default App
