import React from 'react'
import { LayoutWrapper, Button, ChatForm, Text, Input } from '../shared'
import { Message, Notification } from './components'

const Chat = ({ currentRoom, messages, newMessage}) =>
  <LayoutWrapper>
    <Text bold>{ currentRoom }</Text>
    <LayoutWrapper contrast>
      { messages.map( message => {
          return message.authorId ?
            <Message {...message} key={message.id}/> :
            <Notification {...message} key={message.id} />
        })
      }
    </LayoutWrapper>
    <ChatForm onSubmit={newMessage}>
      <Input name="entry" component="input" type="text"/>
      <Button type='submit'>Send</Button>
    </ChatForm>
  </LayoutWrapper>

export default Chat