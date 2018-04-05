const path = require('path')

module.exports = {
  /**
   * contractFileExtension
   *
   * File extension of the target contracts
   *
   * @default sol
   * @type {String}
   */
  contractFileExtension: 'sol',

  /**
   * contracts
   *
   * The contract files to be compiled
   *
   * @type {Array}
   */
  contracts: [
    'Todo',
    'TodoBank',
    'TodoStorage',
  ],

  /**
   * inputPath
   *
   * Directory to read target contracts from
   *
   * @type {String}
   */
  inputPath: path.join(__dirname, '../contracts'),

  /**
   * outputFilename
   *
   * Filename for the compiler output
   *
   * @default contracts
   * @type {String}
   */
  outputFilename: 'contracts',

  /**
   * outputPath
   *
   * Directory to write compiled contracts to
   * Will inherit `inputPath` if undefined
   *
   * @default `inputPath`
   * @type {String}
   */
  outputPath: path.join(__dirname, '../contracts'),
}
