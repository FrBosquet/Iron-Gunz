import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './index.css'
import App from './App'
import rootReducer from './modules/rootReducer'
import socketConnector from './modules/socketConnection'
import registerServiceWorker from './registerServiceWorker'

let store = createStore(
  rootReducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

socketConnector.connect('192.168.1.45:4343')

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'))
registerServiceWorker()
