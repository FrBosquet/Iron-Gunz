import { compose, lifecycle, setDisplayName } from 'recompose'
import { connect } from 'react-redux'
import socketConnector from '../socketConnector'
import GameRoom from './GameRoom'
import { initGame, finishGame, updateGame } from './actions'

const mapStateToProps = state => ({
  
})

const mapDispatchToProps = {
  initGame,
  finishGame,
  updateGame
}

const enhance = compose(
  setDisplayName('GameRoomEnhanced'),
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount(){
      socketConnector.addListener('GAME_UPDATE', newGameState => this.props.updateGame(newGameState))
    }
  })
)

export default enhance(GameRoom)