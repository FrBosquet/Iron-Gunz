const log = require('./lib/log')
const state = require('./lib/state')
const serverCreator = require('./lib/socket')
const server = serverCreator(log, state)