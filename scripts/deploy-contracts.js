const args = require('yargs').argv
const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')
const Web3 = require('web3')

/**
 * Get CLI args
 * @const
 */
const { config, rpc } = args

/**
 * Import config options
 * @const opts
 */
const opts = require(path.resolve(config))

/**
 * Import contract interfaces
 * @type {Object}
 */
const compiledContracts = require(path.resolve(opts.contractsPath))

/**
 * Resolve deployed contract addresses filepath
 * @type {String}
 */
const deployedAddressesPath = path.resolve(opts.addressesPath)

/**
 * Initialise Web3 with an RPC endpoint (http://localhost:8545)
 * @type {Web3}
 */
const web3 = new Web3(
  new Web3.providers.HttpProvider(opts.rpc[rpc])
)

/**
 * Deploy the Todo contracts!
 */
const deployContracts = (async () => {
  try {
    // get web3 accounts
    const accounts = await web3.eth.getAccounts()

    // set contract deployment address to primary account
    opts.fromAccount = accounts[0]

    // get Todo, TodoBank and TodoStorage contract interfaces
    const todoInterface = compiledContracts.Todo
    const todoBankInterface = compiledContracts.TodoBank
    const todoStorageInterface = compiledContracts.TodoStorage

    // create TodoBank contract instance
    const todoBankContract = new web3.eth
      .Contract(todoBankInterface.abi, { data: todoBankInterface.bytecode })

    // deploy TodoBank contract
    const todoBank = await todoBankContract
      .deploy()
      .send({ from: opts.fromAccount, gasLimit: opts.gasLimit })

    // get TodoBank contract address
    const todoBankAddress = todoBank.options.address

    // create TodoStorage contract instance
    const todoStorageContract = new web3.eth
      .Contract(todoStorageInterface.abi, { data: todoStorageInterface.bytecode })

    // deploy TodoStorage contract
    const todoStorage = await todoStorageContract
      .deploy()
      .send({ from: opts.fromAccount, gasLimit: opts.gasLimit })

    // get Todo contract address
    const todoStorageAddress = todoStorage.options.address

    // create Todo contract instance
    const todoContract = new web3.eth
      .Contract(todoInterface.abi, { data: todoInterface.bytecode })

    // deploy Todo contract, passing the TodoBank and TodoStorage contract
    // address as arguments to the constructor function
    const todo = await todoContract
      .deploy({ arguments: [todoBankAddress, todoStorageAddress] })
      .send({ from: opts.fromAccount, gasLimit: opts.gasLimit })

    // get Todo contract address
    const todoAddress = todo.options.address

    // ensure deployed contract addresses file exists before reading it
    const deployedAddressesExists = await fs.pathExists(deployedAddressesPath)

    // create empty JSON file if deployed contract addresses file does not exist
    if (!deployedAddressesExists)
      await fs.outputJson(deployedAddressesPath, {}, { spaces: 2 })

    // read existing deployed contract addresses
    const deployedAddresses = await fs.readJson(deployedAddressesPath)

    // write deployed contract address to disk
    await fs.writeJson(
      deployedAddressesPath,
      Object.assign({}, deployedAddresses, {
        Todo: todoAddress,
        TodoBank: todoBankAddress,
        TodoStorage: todoStorageAddress,
      }),
      { spaces: 2 }
    )

    // construct Todo module export
    const todoContractExport = `
      const abi = ${JSON.stringify(todoInterface.abi)}

      export const Todo = new web3.eth.Contract(abi, '${todoAddress}')
    `

    // write Todo contract export file
    await fs.writeFileSync(
      `${opts.outputPath}/${opts.contracts.Todo.filename}.js`,
      opts.outputString.concat(todoContractExport)
    )

    // happy days!
    return console.log(chalk.green.bold(`🎉  Todo contracts deployed!`))
  } catch (e) {
    console.error(e)
  }
})()
