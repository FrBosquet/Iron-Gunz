import React from 'react'
import { Screen } from '../components'
import { Title, LayoutWrapper, Button } from '../../shared'

export const TitleScreen = ({goToGame, goToOptions}) => 
  <Screen>
    <LayoutWrapper weight={1} align='start'>
      <Title shadow={true} size='enormous'>IRONGUNZ</Title>
    </LayoutWrapper>
    <LayoutWrapper weight={1} direction='horizontal' align='end' justify='end'>
      <Button onClick={goToGame}> Start </Button>
      <Button onClick={goToOptions}> Options </Button>
      <Button> About </Button>
    </LayoutWrapper>
  </Screen>