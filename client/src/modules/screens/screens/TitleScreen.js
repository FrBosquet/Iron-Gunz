import React from 'react'
import { Screen } from '../components'
import { Title, LayoutWrapper, Button } from '../../shared'

export const TitleScreen = ({goToLobby, goToOptions, goToAbout}) => 
  <Screen>
    <LayoutWrapper weight={1} align='start' padded>
      <Title shadow={true} size='enormous'>IRONGUNZ</Title>
    </LayoutWrapper>
    <LayoutWrapper weight={1} direction='horizontal' align='end' justify='end' padded>
      <Button onClick={goToLobby} big> Start </Button>
      <Button onClick={goToOptions} big> Options </Button>
      <Button onClick={goToAbout} big> About </Button>
    </LayoutWrapper>
  </Screen>