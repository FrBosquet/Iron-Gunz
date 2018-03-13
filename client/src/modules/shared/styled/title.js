import styled from 'styled-components'

export const Title = styled.h1`
  font-family: Pixelicious, monospace;
  font-size: ${props => ({
    regular: 1,
    enormous: 4,
    big: 2
  }[props.size] || 1)}em;
  color: #bbbebb;
  text-shadow: ${props => props.shadow ?
    '2px 2px #666966' :
    ''
  }
`

Title.displayName = 'Title'
