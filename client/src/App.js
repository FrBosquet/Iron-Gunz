import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import io from 'socket.io-client'

class App extends Component {
  constructor() {
    super()
    this.socket = io('http://localhost:4343')
    this.state = {}

    document.addEventListener('keydown', keyEvent => {
      this.setState({ [keyEvent.key]: true })
      this.socket.emit('message', this.state)
    })
    
    document.addEventListener('keyup', keyEvent => {
      this.setState({ [keyEvent.key]: false })
    })
  }

  componentDidMount(){
    this.socket.on('message', msg => console.log('Received', JSON.stringify(msg)))
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <ul>
          {
            Object.keys(this.state)
              .filter( key => this.state[key])
              .map( key => <li key={key}>{key}</li>)
          }
          </ul>
        </div>
      </div>
    )
  }
}

export default App
