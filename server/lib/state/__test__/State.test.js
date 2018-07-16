const State = require('../index')
const Lobby = require('../Lobby')
const Clients = require('../Clients')
const Room = require('../Room')
const { expect } = require('chai')

describe('State test', () => {
	let lobby
  const id = '39485'
  const nickname = 'Nick'

	beforeEach(() => {
		state = new State()
	})

	it('Should create a state', () => {
		expect(state).to.exist
	})

	it('Should have a lobby', () => {
		expect(state.lobby).to.exist
		expect(state.lobby).to.be.instanceof(Lobby)
	})

	it('Should have a clients container', () => {
		expect(state.clients).to.exist
		expect(state.clients).to.be.instanceof(Clients)
	})

  it('Should have a diccionary of Rooms', () => {
		expect(state.rooms).to.exist
    expect(state.rooms).to.be.instanceof(Object)
    Object.values(state.rooms).forEach( room => {
      expect(room).to.be.instanceof(Room)
    })
	})

	describe('Should expose methods', () => {
		describe('New client', () => {
			it('Creates a client', () => {
				expect(state.newClient).to.exist
				state.newClient(id, nickname)
				expect(Object.keys(state.clients.list)).to.include(id)
			})

			it('Didnt create two clients with the same id', () => {
				state.newClient(id, 'John')
				state.newClient(id, 'Jack')
				expect(Object.keys(state.clients.list).length).to.be.equal(1)
			})
		})

    //TO DO: Complete
	})
})
