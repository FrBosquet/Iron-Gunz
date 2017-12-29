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
    componentWillUpdate( nextProps ){
      debugger
    }
  })
)

export default enhance(GameRoom)