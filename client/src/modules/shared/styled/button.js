import styled from 'styled-components'

export const Button = styled.button`
  text-transform: uppercase;
  font-size: 1.2em;
  color: ${ props => props.theme.color.lightGrey};
  font-weight: bold;
  border: none;
  padding: 24px 8px;
  background: none;
  margin: 5px;
  cursor: pointer;
  &:hover{
    background-color: ${props => props.back ? 
      props.theme.color.lightRose : 
      props.theme.color.lightGrey };
    color: ${props => props.back ? 
      props.theme.color.darkRose : 
      props.theme.color.darkGrey };
  }

  &:focus{
    outline: none;
  }
`

Button.defaultProps = {
  back: false
}

Button.displayName = 'Button'