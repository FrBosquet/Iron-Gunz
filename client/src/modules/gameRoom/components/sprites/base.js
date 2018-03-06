import styled from 'styled-components'
import PropTypes from 'prop-types'

const Sprite = styled.div`
  position: absolute;
  left: ${props => props.static ? 0 : -16}px;
  top: ${props => props.static ? 0 : -16}px;
  width: 32px;
  height: 32px;
  background-image: url(../sprites/${props => props.sprite}.png);
  transform: translate(${
    props => props.x * 32
  }px,${
    props => props.y * 32
  }px) rotate(${
    props => props.rotation
  }deg);
`

Sprite.propTypes = {
  sprite: PropTypes.string.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
  static: PropTypes.bool,
  rotation: PropTypes.number
}

Sprite.defaultProps = {
  x: 0,
  y: 0,
  static: true,
  rotation: 0
}

Sprite.displayName = 'Sprite'

export default Sprite
