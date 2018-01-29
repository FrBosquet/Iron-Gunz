import { compose, lifecycle, setDisplayName } from 'recompose'
import { connect } from 'react-redux'
import socketConnector from '../socketConnector'
import GameRoom from './GameRoom'
import { initGame, finishGame, updateGame, keyPress, keyRelease } from './actions'

const mapStateToProps = state => ({
  game: state.game
})

const mapDispatchToProps = {
  initGame,
  finishGame,
  updateGame,
  keyPress,
  keyRelease
}

const validKeys = [37,38,39,40]

const enhance = compose(
  setDisplayName('GameRoomEnhanced'),
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount(){
      socketConnector.addListener('INIT_GAME', game => this.props.initGame(game))
      socketConnector.addListener('UPDATE_GAME', game => this.props.updateGame(game))
      socketConnector.addListener('FINISH_GAME', game => this.props.finishGame())

      document.addEventListener('keydown', ({ keyCode }) => validKeys.includes(keyCode) && this.props.keyPress(keyCode))
      document.addEventListener('keyup', ({ keyCode }) => validKeys.includes(keyCode) && this.props.keyRelease(keyCode))
    }
  })
)

export default enhance(GameRoom)