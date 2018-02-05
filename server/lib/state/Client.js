class Client {
  constructor(id){
    this.id = id
    this.keySet = []
  }

  setKeyset(keyset) {
    this.keySet = keyset
  }

  getKeyset(){
    return this.keySet
  }
}

module.exports = Client