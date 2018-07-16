const Room = require('../Room')
const Lobby = require('../Lobby')
const { expect } = require('chai')

describe('Room test', () => {
	let room
	const name = 'A room'
	const id = 39485

	beforeEach(() => {
		room = new Room(name)
	})

	it('Should create a room', () => {
		expect(room).to.exist
	})

	it('Should inherit from Lobby', () => {
		expect(room).to.instanceof(Lobby)
	})

	it('Should have a name', () => {
		expect(room.name).to.exist
		expect(room.name).to.be.equal(name)
	})

	it('Should have a state', () => {
		expect(room.state).to.exist
		expect(room.state).to.be.equal('WAITING')
	})

	it('Should have a available flag', () => {
		expect(room.available).to.exist
		expect(room.available).to.be.equal(true)
	})

	it('Should have a clientsReady object', () => {
		expect(room.clientsReady).to.exist
		expect(room.clientsReady).to.be.instanceof(Object)
	})

	it('Should have a seconds left', () => {
		expect(room.secondsLeft).to.exist
		expect(room.secondsLeft).to.be.equal(0)
	})

	describe('Should expose methods', () => {
		it('Add clients', () => {
			expect(room.addClient).to.exist
			room.addClient(id)
			expect(room.clientsReady[id]).to.exist
			expect(room.clientsReady[id]).to.be.false
			expect(room.clients).to.include(id)
		})

		// TODO: Complete
	})
})
