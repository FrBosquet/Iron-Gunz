import { reduxForm } from 'redux-form'
import { compose, setDisplayName, withHandlers, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import Identity from './Identity'
import socketConnector from '../socketConnector'
import { setIdentity, unsetIdentity } from './actions'

const mapStateToProps = state => {
  const form = state.form.identity 
  const formValues = form ? form.values : null 
  return {
    formNickname: formValues ? formValues.nickname : undefined,
    validatedNickname: state.identity
  }
}

const mapDispatchToProps = {
  setIdentity,
  unsetIdentity
}

const enhance = compose(
  setDisplayName('IdentityEnhanced'),
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({form: 'identity'}),
  lifecycle({
    componentDidMount(){
      socketConnector.addListener('ACK_IDENTITY', newName => {
        this.props.setIdentity(newName)
      })
      socketConnector.addListener('ACK_FORGOT_IDENTITY', () => {
        this.props.unsetIdentity()
      })
    }
  }),
  withHandlers({
    setIdentity: props => () => {
      console.log('I want to be named as', props.formNickname)
      socketConnector.emit('SET_IDENTITY', props.formNickname)
    },
    unsetIdentity: props => () => {
      console.log('I want to be unidentified')
      socketConnector.emit('UNSET_IDENTITY')
    }
  })
)

export default enhance(Identity)