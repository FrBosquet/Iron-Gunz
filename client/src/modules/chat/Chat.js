import React from 'react'
import { Wrapper, Button, PhosporScreen } from '../shared'
import { Field } from 'redux-form'
import './style.css'

const Chat = ({ currentRoom, messages, newMessage}) =>
  <Wrapper className='chat'>
    <h1>{ currentRoom }</h1>
    <PhosporScreen>
      {messages.map( message => {
          return (
            <div className='chat-message' key={`${message.author+message.content+message.timeStamp}`}>
              <span className='author'>{message.author}:</span>
              <span className='content'>{message.content}</span>
              <span className='time-stamp'>{message.timeStamp}</span>
            </div>
          )
        })
      }
    <form onSubmit={newMessage}>
      <Field name="entry" component="input" type="text"/>
      <Button type='submit'>Send</Button>
    </form>
    </PhosporScreen>
  </Wrapper>

export default Chat