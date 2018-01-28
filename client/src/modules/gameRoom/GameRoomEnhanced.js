import { compose, lifecycle, setDisplayName } from 'recompose'
import { connect } from 'react-redux'
import socketConnector from '../socketConnector'
import GameRoom from './GameRoom'
import { initGame, finishGame } from './actions'

const mapStateToProps = state => ({
  
})

const mapDispatchToProps = {
  initGame,
  finishGame
}

const enhance = compose(
  setDisplayName('GameRoomEnhanced'),
  connect(mapStateToProps),
  lifecycle({
    componentDidMount(){
      socketConnector.addListener('INIT_GAME', game => console.log(game))
      socketConnector.addListener('FINISH_GAME', game => console.log(game))
      document.addEventListener('keydown', ({ keyCode }) => console.log(keyCode))
    }
  })
)

export default enhance(GameRoom)