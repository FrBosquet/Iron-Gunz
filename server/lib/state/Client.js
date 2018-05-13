class Client {
	constructor(id) {
		this.id = id
		this.keyset = []
	}

	setKeyset(keyset) {
		this.keyset = keyset
	}

	getKeyset() {
		return this.keyset
	}
}

module.exports = Client
