import Web3 from 'web3'
const web3 = new Web3(`ws://${window.location.hostname}:8546`)

export default web3.shh