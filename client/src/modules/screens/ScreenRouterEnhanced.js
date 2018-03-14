import { compose, setDisplayName } from 'recompose'
import { connect } from 'react-redux'
import ScreenRouter from './ScreenRouter'
import * as actions from './actions'

const mapStateToProps = state => ({
  screen: state.screen
})

const mapDispatchToProps = {
  goToOptions: () => actions.setScreen('options'),
  goToTitle: () => actions.setScreen('title'),
  goToLobby: () => actions.setScreen('lobby'),
  goToAbout: () => actions.setScreen('about')
}

const enhance = compose(
  setDisplayName('ScreenRouterEnhanced'),
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(ScreenRouter)