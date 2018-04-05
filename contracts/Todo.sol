pragma solidity ^0.4.18;

import './TodoBank.sol';
import './TodoStorage.sol';

contract Todo {
  TodoBank todoBank;
  TodoStorage todoStorage;
  event TodoAdded(bytes32 todoId);

  function Todo(address _todoBank, address _todoStorage) public {
    todoBank = TodoBank(_todoBank);
    todoStorage = TodoStorage(_todoStorage);
  }

  function addTodo(bytes32 _todoId) public payable {
    bytes32 _userId = keccak256(msg.sender);
    todoStorage.setTodo(_todoId, _userId);
    todoBank.setTodoDeposit(_todoId, msg.value);
    TodoAdded(_todoId);
  }

  function getTodo(uint _index) public view returns (bytes32) {
    bytes32 _userId = keccak256(msg.sender);
    return todoStorage.getTodoByIndex(_index, _userId);
  }

  function getTodoCount() public view returns (uint) {
    bytes32 _userId = keccak256(msg.sender);
    return todoStorage.getTodoCount(_userId);
  }
}
