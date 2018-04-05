pragma solidity ^0.4.18;

contract TodoBank {
  mapping(bytes32 => uint) TodoVault;

  function getTodoDeposit(bytes32 _todoId) public view returns (uint) {
    return TodoVault[_todoId];
  }

  function setTodoDeposit(bytes32 _todoId, uint _deposit) public {
    TodoVault[_todoId] = _deposit;
  }
}
