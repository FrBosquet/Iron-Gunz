import styled from 'styled-components'
import PropTypes from 'prop-types'

export const Button = styled.button`
  text-transform: ${ props => props.big ? 'uppercase' : 'none'};
  text-align: ${ props => props.leftAlign ? 'left' : 'center'};
  font-size: ${ props => props.big ?
    1.2 :
    1
  }em;
  font-family: ${ props => props.big ? 
    props.theme.font.decorated :
    props.theme.font.main
  };
  color: ${ props => props.theme.color.lightGrey};
  font-weight: bold;
  border: none;
  padding: ${ props => props.big ?
    '24px 8px' :
    '4px'
  };
  background: none;
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
  back: false,
  big: false,
  leftAlign: false
}

Button.propTypes = {
  back: PropTypes.bool,
  big: PropTypes.bool,
  leftAlign: PropTypes.bool
}

Button.displayName = 'Button'