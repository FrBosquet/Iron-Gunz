import { compose, lifecycle, setDisplayName, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import RoomSelector from './RoomSelector'
import socketConnector from '../socketConnector'
import { setRooms, joinRoom } from './actions'

const mapStateToProps = state => ({
  rooms: state.rooms.roomList
})

const mapDispatchToProps = {
  setRooms,
  joinRoom
}

const enhance = compose(
  setDisplayName('RoomSelectorEnhanced'),
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      socketConnector.emit('RETRIEVE_ROOMS')
      socketConnector.addListener('ROOM_LIST', msg => this.props.setRooms(msg))
    }
  }),
  withHandlers({
    joinRoom: props => room => {
      console.log('Join room', room)
      props.joinRoom(room)
      socketConnector.emit('JOIN_ROOM', room)
    }
  })
)

export default enhance(RoomSelector)