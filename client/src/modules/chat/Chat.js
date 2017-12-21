import React from 'react'
import { Box, Button } from '../shared'
import { Field } from 'redux-form'
import './style.css'

const Chat = ({messages, newMessage}) =>
  <Box className='chat'>
    <h1>General</h1>
    <Box className='green-phospor'>
      {messages.map( message => {
          return (
            <div className='chat-message'>
              <span className='author'>{message.author}:</span>
              <span className='content'>{message.content}</span>
              <span className='time-stamp'>{message.timeStamp}</span>
            </div>
          )
        })
      }
    </Box>
    <form onSubmit={newMessage}>
      <Field name="entry" component="input" type="text"/>
      <Button label='send' />
    </form>
  </Box>

export default Chat