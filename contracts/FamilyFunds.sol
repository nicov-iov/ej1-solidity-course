// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract FamilyFunds {
  address owner;

  mapping (address => bool) public familyMember;

  constructor (address[] memory members) {
    owner = msg.sender;

    for(uint256 i = 0; i < members.length; i++) {
      familyMember[members[i]] = true;
    }
  }

  event Deposit(address sender, uint time, uint amount);
  event Withdraw(address _to, uint time, uint amount);

  fallback() external payable {}

  receive() external payable {
    emit Deposit(msg.sender, block.timestamp, msg.value);
  }

  modifier onlyFamilyMembers {
    require(familyMember[msg.sender], "Withdraw allowed only to family members");
    _;
  }

  function withdraw(address payable _to, uint amount) external onlyFamilyMembers {
    _to.transfer(amount);

    emit Withdraw(_to, block.timestamp, amount);
  }

  function getBalance() public view returns(uint) {
    return address(this).balance;
  }
}