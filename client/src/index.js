import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './index.css'
import App from './App'
import rootReducer from './modules/rootReducer'
import socketConnector from './modules/socketConnector'
import registerServiceWorker from './registerServiceWorker'
import { IP, PORT } from './config'

let store = createStore(
  rootReducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const storedIdentity = localStorage.getItem('nickname')
const url = `${IP}:${PORT}${storedIdentity ? `?nickname=${storedIdentity}` : ''}`
socketConnector.connect(url)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'))
registerServiceWorker()
