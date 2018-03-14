import React from 'react'
import styled from 'styled-components'

export const ScreenWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #222522;
`

ScreenWrapper.displayName = 'ScreenWrapper'

export const Screen = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;  
  max-width: 920px;
  min-width: 800px;
  margin: auto;
`