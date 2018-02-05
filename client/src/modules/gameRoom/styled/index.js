import styled from 'styled-components'

export const GameRoomScreen = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  background-color: black;
`

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