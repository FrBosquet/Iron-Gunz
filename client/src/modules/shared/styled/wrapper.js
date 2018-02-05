import styled from 'styled-components'

export const Wrapper = styled.div`
  width: calc(${ props => props.width} - 42px);
  display: inline-block;
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
  Wrapper-shadow: 0 5px 0 0 black;
`

Wrapper.defaultProps = {
  width: '100%'
}