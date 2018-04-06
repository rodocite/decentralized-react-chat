var Shh = require('web3-shh')
const shh = new Shh()
shh.setProvider('http://localhost:8545')

shh.getInfo()
  .then((info) => console.log('Whisper connected.', info))
  .catch(() => console.error('Whisper is could not connect to geth'))

export default shh