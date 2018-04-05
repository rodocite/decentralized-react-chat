const path = require('path')

module.exports = {
  /**
   * Path to deployed contract addresses file
   * @type {String}
   */
  addressesPath: path.join(__dirname, '../contracts/addresses.json'),

  /**
   * Path to compiled contracts file
   * @type {String}
   */
  contractsPath: path.join(__dirname, '../contracts/contracts.json'),

  /**
   * Contracts to deploy with filenames
   * @type {Object}
   */
  contracts: {
    Todo: {
      filename: 'Todo.sol',
    },
  },

  /**
   * Default gas limit
   * @type {Number}
   */
  gasLimit: 4700000,

  /**
   * Path to contracts directory
   * @type {String}
   */
  inputPath: path.join(__dirname, '../contracts'),

  /**
   * Path to write deployed contract address to
   * @type {String}
   */
  outputPath: path.join(__dirname, '../app/contracts'),

  /**
   * Deployed contract output file banner
   * @type {String}
   */
  outputString: "import web3 from '../js/web3'\n\n",

  /**
   * RPC endpoints to use when deploying contracts
   * @type {String}
   */
  rpc: {
    development: 'http://localhost:8545',
    production: 'http://localhost:8545',
  },
}
