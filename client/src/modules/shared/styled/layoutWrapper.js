import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const centerMixin = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
//TO BE DELETED
export const Wrapper = styled.div`
  width: calc(${ props => props.width} - 46px);
  display: inline-block;
  margin: 10px;
  padding: 10px;
  border: 3px solid black;
  Box-shadow: 0 5px 0 0 black;
  background-color: papayawhip;
  ${ props => props.center && centerMixin }
`

Wrapper.defaultProps = {
  width: '100%'
}

Wrapper.displayName = 'Wrapper'

//END OF TO BE DELETED

export const LayoutWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: ${props => props.padded ?
    props.theme.gap.small :
    0
  };
  flex-direction: ${props => ({
    horizontal: 'row',
    vertical: 'column'
  }[props.direction] || 'row')};
  justify-content: ${props => ({
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    beetwen: 'space-between',
    around: 'space-around',
    even: 'space-evenly'
  }[props.justify])};
  align-items: ${props => ({
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    stretch: 'stretch'
  }[props.align])};
  flex: ${props => props.weight};
  border: ${ props => props.theme.debug ? '2px solid red' : 'none'};
`

LayoutWrapper.defaultProps = {
  padded: false,
  direction: 'vertical',
  justify: 'start',
  align: 'stretch',
  weight: 1
}

LayoutWrapper.propTypes = {
  padded: PropTypes.bool,
  direction: PropTypes.string,
  justify: PropTypes.string,
  align: PropTypes.string,
  weight: PropTypes.number
}

LayoutWrapper.displayName = 'LayoutWrapper'
