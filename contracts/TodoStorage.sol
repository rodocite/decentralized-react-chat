pragma solidity ^0.4.18;

contract TodoStorage {
  mapping(bytes32 => bytes32[]) TodoStore;

  function getTodoByIndex(uint _index, bytes32 _user) public view returns (bytes32) {
    return TodoStore[_user][_index];
  }

  function getTodoCount(bytes32 _user) public view returns (uint) {
    return TodoStore[_user].length;
  }

  function setTodo(bytes32 _todoId, bytes32 _user) public {
    TodoStore[_user].push(_todoId);
  }
}
