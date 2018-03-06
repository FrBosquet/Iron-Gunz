import styled from 'styled-components'
import PropTypes from 'prop-types'

export const GameRoomScreen = styled.div`
  width: ${props => props.width * 32}px;
  height: ${props => props.height * 32}px;
  position: relative;
  background-color: black;
`

GameRoomScreen.defaultProps = {
  width: 10,
  height: 10
}

GameRoomScreen.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
}

export const Player = styled.div`
  position: absolute;
  width: 5px;
  height: 5px;
  animation-name: blink;
  animation-duration: 500ms;
  animation-iteration-count: infinite;
  content: "";

  @keyframes blink{
    from {background-color: green;}
    to {background-color: rgb(0, 255, 0);}
  }
`

GameRoomScreen.displayName = 'GameRoomScreen'
Player.displayName = 'Player'