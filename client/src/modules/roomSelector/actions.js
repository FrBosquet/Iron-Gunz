import { createAction } from 'redux-act'

export const setRooms = createAction('Set list of available rooms')
export const joinRoom = createAction('Join a room')
export const leaveRoom = createAction('Leave current room')
export const setPartners = createAction('Set list of partners in current room')
export const setReady = createAction('Set ready')
export const unsetReady = createAction('Unset ready')
