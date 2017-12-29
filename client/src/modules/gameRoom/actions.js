import { createAction } from 'redux-act'

export const initGame = createAction('Inits a new game')
export const finishGame = createAction('Ends current game')