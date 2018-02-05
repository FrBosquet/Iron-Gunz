import styled from 'styled-components'

export const Wrapper = styled.div`
  width: calc(${ props => props.width} - 46px);
  display: inline-block;
  margin: 10px;
  padding: 10px;
  border: 3px solid black;
  Box-shadow: 0 5px 0 0 black;
  background-color: papayawhip;
`

Wrapper.defaultProps = {
  width: '100%'
}

Wrapper.displayName = 'Wrapper'