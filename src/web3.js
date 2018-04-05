import Web3 from 'web3'

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

web3.bzz.setProvider('http://localhost:8500')

export default web3
