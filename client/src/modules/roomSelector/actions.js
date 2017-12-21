import { createAction } from 'redux-act'

export const setRooms = createAction('Set list of available rooms')
export const joinRoom = createAction('Join a room')
export const leaveRoom = createAction('Leave current room')