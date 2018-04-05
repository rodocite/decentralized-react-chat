import { format } from 'date-fns'
import * as swarm from './swarm'
import web3 from './web3'
import { Todo } from '../contracts/Todo.sol'

/**
 * Add a new todo
 *
 * @param  {Number} stake Stake amount in Ether
 * @param  {String} todo  Todo task
 * @param  {String} user  Ethereum address of todo owner
 * @return {Object}       Add todo transaction receipt
 */
export const addTodo = async (stake, todo, user) => {
  // Upload the todo data to Swarm and receive the content hash
  const swarmHash = await swarm.upload({
    complete: false,
    deposit: 1,
    owner: user,
    task: todo,
    timestamp: format(new Date(), 'x'),
  })

  // Convert raw swarm hash to bytes
  const todoId = `0x${swarmHash}`

  // Convert stake from Ether into Wei for deposit
  const value = web3.utils.toWei(stake.toString(), 'ether')

  // Set the transaction `from` address, `gas` limit and todo deposit `value`
  const options = { from: user, gas: 4700000, value: value }

  // Send transaction to add a new todo
  const tx = await Todo.methods.addTodo(todoId).send(options)

  // Return the transaction receipt
  return tx
}

/**
 * Get user's todo list
 *
 * @param  {String} user Ethereum address of user
 * @return {Array}       User's todo list
 */
export const getTodos = async user => {
  // Set the transaction `from` address and `gas` limit
  const options = { from: user, gas: 4700000 }

  // Send transaction to get the number of todos in the user's todo list
  const todoCount = await Todo.methods.getTodoCount().call(options)

  // Send transaction to get the todoId for each todo in the user's todo list
  const todoIds = await Promise.all(
    Array(Number(todoCount))
      .fill()
      .map((x, todoIndex) => Todo.methods.getTodo(todoIndex).call(options))
  )

  // Download each todo's raw data from Swarm
  const rawTodos = await Promise.all(
    // Remove the leading `0x` from the todoId to get the Swarm content hash
    todoIds.map(todo => swarm.download(todo.slice(2)))
  )

  // Convert raw todo data back to plain todo object
  const todos = rawTodos.map(todo => {
    // For each property of the todo, convert the value from Uint8Array to String
    return Object.keys(todo)
      .map(key => ({ [key]: new TextDecoder("utf-8").decode(todo[key].data) }))
      .reduce((o, v) => Object.assign({}, o, v), {})
  })

  // Return todo list array
  return todos
}
