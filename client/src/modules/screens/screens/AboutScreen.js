import React from 'react'
import { Screen } from '../components'
import { Title, LayoutWrapper, Button } from '../../shared'

export const AboutScreen = ({goToTitle}) => 
  <Screen>
    <LayoutWrapper weight={1} align='center' justify='end'>
      <Title shadow={true} size='big'>Iron Gunz</Title>
      <Title size='regular'>Version 0.1.0</Title>
      <Title size='regular'>Made by Fran Bosquet. CR2018</Title>
    </LayoutWrapper>
    <LayoutWrapper weight={1} direction='horizontal' align='end' justify='end'>
      <Button onClick={goToTitle}> Back to title</Button>
    </LayoutWrapper>
  </Screen>