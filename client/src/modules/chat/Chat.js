import React from 'react'
import { LayoutWrapper, Button, ChatForm, Text, Input } from '../shared'
import { Message } from './components'

const Chat = ({ currentRoom, messages, newMessage}) =>
  <LayoutWrapper>
    <Text bold>{ currentRoom }</Text>
    <LayoutWrapper contrast>
        {messages.map( message => <Message {...message} key={message.timeStamp+message.content}/>)}
    </LayoutWrapper>
    <ChatForm onSubmit={newMessage}>
      <Input name="entry" component="input" type="text"/>
      <Button type='submit'>Send</Button>
    </ChatForm>
  </LayoutWrapper>

export default Chat