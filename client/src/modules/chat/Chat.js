import React from 'react'
import { Wrapper, Button, PhosporScreen } from '../shared'
import { Field } from 'redux-form'
import { Message } from './components'

const Chat = ({ currentRoom, messages, newMessage}) =>
  <Wrapper className='chat'>
    <h1>{ currentRoom }</h1>
    <PhosporScreen>
      {messages.map( message => <Message {...message} />)
      }
    <form onSubmit={newMessage}>
      <Field name="entry" component="input" type="text"/>
      <Button type='submit'>Send</Button>
    </form>
    </PhosporScreen>
  </Wrapper>

export default Chat