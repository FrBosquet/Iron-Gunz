import React from 'react'
import ReactDOM from 'react-dom'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import './index.css'
import App from './App'
import rootReducer from './modules/rootReducer'
import socketConnector from './modules/socketConnector'
import { IP, PORT } from './config'
import sagas from './modules/sagas'
import { ThemeProvider } from 'styled-components'
import theme from './theme'

const sagaMiddleware = createSagaMiddleware()

let store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware), 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  )

sagaMiddleware.run(sagas)

const storedIdentity = localStorage.getItem('nickname')
const url = `${IP}:${PORT}${storedIdentity ? `?nickname=${storedIdentity}` : ''}`
socketConnector.connect(url, store)

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
  , document.getElementById('root'))
