import styled from 'styled-components'

export const Button = styled.button`
  border: 3px solid black;
  color: black;
  border-radius: 6px;
  font-weight: bold;
  background-color: ${props => props.back ? 'red' : 'lightGrey'};
  margin: 5px;
  cursor: pointer;
  &:hover{
    border-color: ${props => props.back ? 'orange' : 'darkGreen'};
    color: ${props => props.back ? 'orange' : 'darkGreen'};
  }
`

Button.defaultProps = {
  back: false
}

Button.displayName = 'Button'