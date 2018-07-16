const Lobby = require('../Lobby')
const { expect } = require('chai')

describe('Lobby test', () => {
	let lobby
	const id = 39485

	beforeEach(() => {
		lobby = new Lobby(id)
	})

	it('Should create a lobby', () => {
		expect(lobby).to.exist
	})

	it('Should have a list of clients', () => {
		expect(lobby.clients).to.exist
		expect(lobby.clients).to.be.instanceof(Array)
	})

	describe('Should expose methods', () => {
		describe('Add clients', () => {
			it('Adds client', () => {
				expect(lobby.addClient).to.exist
				lobby.addClient(id)
				expect(lobby.clients).to.include(id)
			})

			it('Didnt add the same id twice', () => {
				lobby.addClient(id)
				lobby.addClient(id)
				expect(lobby.clients.length).to.be.equal(1)
			})
		})

		it('Remove client', () => {
			expect(lobby.removeClient).to.exist
			lobby.addClient(id)
			lobby.removeClient(id)
			expect(lobby.clients).to.not.include(id)
		})

		it('Get clients', () => {
			expect(lobby.getClients).to.exist
			expect(lobby.getClients()).to.be.equal(lobby.clients)
		})

		it('Get client count', () => {
			expect(lobby.getClientCount).to.exist
			lobby.addClient(id)
			expect(lobby.getClientCount()).to.equal(1)
		})
	})
})
