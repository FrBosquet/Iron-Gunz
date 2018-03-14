import React from 'react'
import { Screen } from '../components'
import { Title, LayoutWrapper, Button } from '../../shared'
import RoomSelector from '../../roomSelector/RoomSelectorEnhanced'
import Chat from '../../chat/ChatEnhanced'

export const LobbyScreen = ({goToTitle}) => 
  <Screen>
    <LayoutWrapper weight={1} align='start'>
      <Title shadow={true} size='big'>Lobby</Title>
    </LayoutWrapper>
    <LayoutWrapper direction='horizontal' weight={10}>
      <LayoutWrapper weight={1}>
        <Title size='regular'>Rooms</Title>
        <RoomSelector />
      </LayoutWrapper>
      <LayoutWrapper weight={1}>
        <Title size='regular'>Chat</Title>
        <Chat />
      </LayoutWrapper>
    </LayoutWrapper>
    <LayoutWrapper weight={1} direction='horizontal' align='end' justify='end'>
      <Button onClick={goToTitle}> Back </Button>
    </LayoutWrapper>
  </Screen>