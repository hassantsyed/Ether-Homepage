pragma solidity ^0.4.20;
//OpenZeppelin is a library for secure smart contract development https://openzeppelin.org
contract Ownable {
	address public owner;

	event OwnershipTransferred(address indexed prevOwner, address indexed newOwner);

	constructor() public {
		owner = msg.sender;
	}

	modifier onlyOwner() {
		require(msg.sender == owner);
		_;
	}

	function transferOwnership(address newOwner) public onlyOwner {
		require(newOwner != address(0));
		emit OwnershipTransferred(owner, newOwner);
		owner = newOwner;
	}
}