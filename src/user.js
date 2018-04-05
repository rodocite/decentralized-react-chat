import web3 from './web3'

export const getAccounts = () => {
  return web3.eth.getAccounts()
}

export const getBalance = address => {
  return web3.eth.getBalance(address)
    .then(balance => web3.utils.fromWei(balance, 'ether'))
}
