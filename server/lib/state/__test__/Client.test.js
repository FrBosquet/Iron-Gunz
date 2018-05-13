const Client = require('../Client')
const { expect } = require('chai')

describe('Client test', () => {
	let client
	const id = 39485
	const keyset = [45, 12, 35]

	beforeEach(() => {
		client = new Client(id)
	})

	it('Should create a client', () => {
		expect(client).to.exist
	})

	it('Should have a provided id', () => {
		expect(client.id).to.be.equal(id)
	})

	it('Should have a keyset', () => {
		expect(client.keyset).to.exist
		expect(client.keyset).to.be.instanceof(Array)
	})

	describe('Should expose keyset getter and setter', () => {
		it('Getter', () => {
			expect(client.getKeyset).to.exist
			expect(client.getKeyset()).to.deep.equals(client.keyset)
		})

		it('Setter', () => {
			expect(client.setKeyset).to.exist
			client.setKeyset(keyset)
			expect(client.keyset).to.deep.equals(keyset)
		})
	})
})
