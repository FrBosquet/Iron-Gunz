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
      socketConnector.addListener('ROOM_LIST', msg =>  this.props.setRooms(msg))
      socketConnector.addListener('PARTNERS_LIST', list => this.props.setPartners(list))
    }
  }),
  withHandlers({
    joinRoom: props => room => {
      console.log('Join room', room)
      props.joinRoom(room)
      socketConnector.emit('JOIN_ROOM', room)
    },
    leaveRoom: props => () => {
      console.log('Leave room')
      props.leaveRoom()
      socketConnector.emit('LEAVE_ROOM')
    }

  })
)

export default enhance(RoomSelector)