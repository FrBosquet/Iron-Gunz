import Chat from './Chat'
import { connect } from 'react-redux'
import { compose, setDisplayName, withHandlers, lifecycle } from 'recompose'
import { reduxForm, reset } from 'redux-form'
import socketConnector from '../socketConnector'
import { addMessage } from './action'

const mapStateToProps = state => {
  const form = state.form.chat
  const formValues = form ? form.values : null 
  return {
    messages: state.chat,
    entry: formValues ? formValues.entry : undefined,
    currentRoom: state.rooms.currentRoom
  }
}

const mapDispatchToProps = dispatch => ({
  clearEntry: () => dispatch(reset('chat')),
  addMessage: message => dispatch(addMessage(message))
})

const enhance = compose(
  setDisplayName('ChatEnhanced'),
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({form: 'chat'}),
  lifecycle({
    componentDidMount(){
      socketConnector.addListener('CHAT_MESSAGE', msg => {
        this.props.addMessage(msg)
      })
    }
  }),
  withHandlers({
    newMessage: props => e => {
      e.preventDefault()
      socketConnector.emit('CHAT_MESSAGE', props.entry)
      props.clearEntry()
    }
  })

)

export default enhance(Chat)