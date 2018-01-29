import { compose, lifecycle, setDisplayName } from 'recompose'
import { connect } from 'react-redux'
import socketConnector from '../socketConnector'
import GameRoom from './GameRoom'
import { initGame, finishGame, updateGame } from './actions'

const mapStateToProps = state => ({
  game: state.game
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
      socketConnector.addListener('INIT_GAME', game => this.props.initGame(game))
      socketConnector.addListener('UPDATE_GAME', game => this.props.updateGame(game))
      socketConnector.addListener('FINISH_GAME', game => this.props.finishGame())
      document.addEventListener('keydown', ({ keyCode }) => console.log(keyCode))
    }
  })
)

export default enhance(GameRoom)