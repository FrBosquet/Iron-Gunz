import styled from 'styled-components'

export const Text = styled.p`
  color: ${props => props.theme.color.lightGrey};
  font-family: ${props => props.theme.font.main};
  font-weight: ${props => props.bold ? 'bold' : 'regular'};
  padding-left: ${props => props.padded ? '8px' : 0}
`

Text.displayName = 'Text'