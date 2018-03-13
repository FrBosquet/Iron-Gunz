import React from 'react'
import { Screen } from './screen'
import { Title, LayoutWrapper, Button } from '../../shared'

export const OptionsScreen = ({goToTitle}) => 
  <Screen>
    <LayoutWrapper weight={1} align='start'>
      <Title shadow={true} size='big'>Options</Title>
    </LayoutWrapper>
    <LayoutWrapper weight={1} direction='horizontal' align='end' justify='end'>
      <Button onClick={goToTitle}> Back </Button>
    </LayoutWrapper>
  </Screen>