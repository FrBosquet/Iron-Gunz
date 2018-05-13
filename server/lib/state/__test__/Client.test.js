const Client = require('../Client')
const { expect } = require('chai')

describe('Client test', () => {
	const id = 39485
	const keyset = [45, 12, 35]

	it('Should create a client', () => {
		const client = new Client(id)
		expect(client).to.exist
	})

	it('Should have a provided id', () => {
		const client = new Client(id)
		expect(client.id).to.be.equal(id)
	})

	it('Should have a keyset', () => {
		const client = new Client(id)
		expect(client.keyset).to.exist
		expect(client.keyset).to.be.instanceof(Array)
	})

	describe('Should expose keyset getter and setter', () => {
		const client = new Client(id)
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
