import { compose, lifecycle, setDisplayName, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import RoomSelector from './RoomSelector'
import socketConnector from '../socketConnector'
import { setRooms, joinRoom, leaveRoom, setPartners } from './actions'

const mapStateToProps = state => ({
  rooms: state.rooms.roomList,
  currentRoom: state.rooms.currentRoom,
  partners: state.rooms.partners
})

const mapDispatchToProps = {
  setRooms,
  joinRoom,
  leaveRoom,
  setPartners
}

const enhance = compose(
  setDisplayName('RoomSelectorEnhanced'),
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      socketConnector.emit('RETRIEVE_ROOMS')
    }
  }),
  withHandlers({
    joinRoom: props => room => {
      props.joinRoom(room)
      socketConnector.emit('JOIN_ROOM', room)
    },
    leaveRoom: props => () => {
      props.leaveRoom()
      socketConnector.emit('LEAVE_ROOM')
    }

  })
)

export default enhance(RoomSelector)