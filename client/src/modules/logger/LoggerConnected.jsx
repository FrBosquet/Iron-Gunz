import { compose, lifecycle, setDisplayName } from 'recompose'
import { connect } from 'react-redux'
import Logger from './Logger.jsx'
import { logMessage } from './actions'
import socketConnector from '../socketConnector'

const mapStateToProps = state => {
  return {
    logs: state.logs
  }
}
const mapDispatchToProps = {
  logMessage
}

const enhance = compose(
  setDisplayName('LoggerEnhanced'),
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      socketConnector.addListener('MESSAGE', msg => this.props.logMessage(msg))
    }
  })
)

export default enhance(Logger)