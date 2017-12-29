const acho = require('acho')()

module.exports = {
  listen: port => {
    acho.info('Server running')
    acho.debug(`Listening on port ${port}`)
  },
  newConnection: who => {
    const msg = `User ${who} has connected`
    acho.info(msg)
    return msg
  },
  retrieveRooms: who => {
    const msg = `User ${who} retrieves list of rooms`
    acho.debug(msg)
    return msg
  },
  joinRoom: (who, room) => {
    const msg = `User ${who} joins room ${room}` 
    acho.info(msg)
    return msg
  },
  leaveRoom: (who, room) => {
    const msg = `User ${who} leaves room ${room}`
    acho.info(msg)
    return msg
  }
}