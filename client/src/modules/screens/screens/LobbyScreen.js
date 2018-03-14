import React from 'react'
import { Screen } from '../components'
import { Title, LayoutWrapper, Button } from '../../shared'

export const LobbyScreen = ({goToTitle}) => 
  <Screen>
    <LayoutWrapper weight={1} align='start'>
      <Title shadow={true} size='big'>Lobby</Title>
    </LayoutWrapper>
    <LayoutWrapper weight={10}>
      Hola
    </LayoutWrapper>
    <LayoutWrapper weight={1} direction='horizontal' align='end' justify='end'>
      <Button onClick={goToTitle}> Back </Button>
    </LayoutWrapper>
  </Screen>