const Clients = require('../Clients')
const { expect } = require('chai')

describe('Clients test', () => {
	let clients
	const id = 39485
	const identity = 'Fran'
	const alterEgo = 'Narf'
	const lobby = 'lobby'
	const room = 'room'
	const mockClient = {
		id,
		keyset: [],
		nickname: identity
	}

	beforeEach(() => {
		clients = new Clients()
		clients.newClient(id, identity)
	})

	it('Should create a clients list', () => {
		expect(clients).to.exist
	})

	it('Should have a client list', () => {
		expect(clients.list).to.exist
		expect(clients.list).to.be.instanceof(Object)
	})

	describe('Should expose methods', () => {
		it('New client', () => {
			expect(clients.newClient).to.exist
			expect(clients.list[id])
				.to.be.eql(mockClient)
				.but.not.equal(mockClient)
		})

		it('Get client', () => {
			expect(clients.getClient).to.exist
			expect(clients.getClient(id))
				.to.be.eql(mockClient)
				.but.not.equal(mockClient)
		})

		it('Move to lobby', () => {
			expect(clients.moveToLobby).to.exist
			clients.moveToLobby(id)
			expect(clients.list[id].room).to.be.equal(lobby)
		})

		it('Move to room', () => {
			expect(clients.moveToRoom).to.exist
			clients.moveToRoom(id, room)
			expect(clients.list[id].room).to.be.equal(room)
		})

		it('Who is', () => {
			expect(clients.whoIs).to.exist
			expect(clients.whoIs(id)).to.be.equal(identity)
		})

		it('Where is', () => {
			expect(clients.whereIs).to.exist
			clients.moveToLobby(id)
			expect(clients.whereIs(id)).to.be.equal(lobby)
			clients.moveToRoom(id, room)
			expect(clients.whereIs(id)).to.be.equal(room)
		})

		it('Set identity', () => {
			expect(clients.setIdentity).to.exist
			clients.setIdentity(id, alterEgo)
			expect(clients.list[id].nickname).to.be.equal(alterEgo)
		})

		it('Forget identity', () => {
			expect(clients.forgetIdentity).to.exist
			clients.forgetIdentity(id)
			expect(clients.list[id].nickname).to.be.undefined
		})

		it('Remove', () => {
			expect(clients.remove).to.exist
			clients.remove(id)
			expect(clients.list[id]).to.be.undefined
		})
	})
})
