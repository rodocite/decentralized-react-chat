import web3 from '../js/web3'

const abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "getTodoCount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x104a7cd8"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_todoId",
        "type": "bytes32"
      }
    ],
    "name": "addTodo",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function",
    "signature": "0xda2f6460"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "getTodo",
    "outputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xdd68afb6"
  },
  {
    "inputs": [
      {
        "name": "_todoBank",
        "type": "address"
      },
      {
        "name": "_todoStorage",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor",
    "signature": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "todoId",
        "type": "bytes32"
      }
    ],
    "name": "TodoAdded",
    "type": "event",
    "signature": "0xe4d8bcfe65624a678f07558e849c5db999c82166c7299f065a5912838b1675b9"
  }
]

export const Todo = new web3.eth.Contract(
  abi,
  '0xEcC1D001500F4F7aE804695c761b6dfFd3DAA3E5'
)
