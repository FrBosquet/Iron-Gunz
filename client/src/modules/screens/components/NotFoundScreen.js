import React from 'react'
import { Screen } from './screen'
import { Title, LayoutWrapper, Button } from '../../shared'

export const NotFoundScreen = ({goToTitle}) => 
  <Screen>
    <LayoutWrapper weight={8} align='center' justify='center'>
      <Title shadow={true} size='big'>Option not found</Title>
      <Title size='regular'>Something went really wrong</Title>
    </LayoutWrapper>
    <LayoutWrapper weight={1} direction='horizontal' align='end' justify='end'>
      <Button onClick={goToTitle}> Back to title</Button>
    </LayoutWrapper>
  </Screen>