import React from 'react'
import { connect } from 'react-redux'
import { compose, setDisplayName } from 'recompose'
import { Screen } from '../components'
import { Title, LayoutWrapper, Button } from '../../shared'
import RoomSelector from '../../roomSelector/RoomSelectorEnhanced'
import Chat from '../../chat/ChatEnhanced'

export const LobbyScreen = ({ goToTitle, playerState, currentRoom }) => (
  <Screen>
    <LayoutWrapper weight={1} align="start" padded>
      <Title shadow={true} size="big">
        Lobby
      </Title>
    </LayoutWrapper>
    <LayoutWrapper direction="horizontal" weight={10} padded>
      <LayoutWrapper weight={1}>
        <Title size="regular">Rooms</Title>
        <RoomSelector />
      </LayoutWrapper>
      <LayoutWrapper weight={1}>
        <Title size="regular">Chat</Title>
        <Chat />
      </LayoutWrapper>
    </LayoutWrapper>
    <LayoutWrapper
      weight={1}
      direction="horizontal"
      align="end"
      justify="end"
      padded >
      <Button big onClick={goToTitle}>
        Back
      </Button>
    </LayoutWrapper>
  </Screen>
)
