pragma solidity ^0.4.20;

import './Ownable.sol';

contract Ad is Ownable {

	event BlockBought();

	uint price = 1000000000000000000;

	struct Block {
		bool taken;
		string imgLink;
		string redirectLink;
	}

	Block[10][10] blocks;

	modifier isFree(uint row, uint col) {
		require(!blocks[row][col].taken);
		_;
	}

	function buyBlock(uint row, uint col, string _img, string _redirect) payable public isFree(row, col) {
		require(msg.value >= price);
		Block b = blocks[row][col];
		b.imgLink = _img;
		b.redirectLink = _redirect;
		b.taken = true;
		emit BlockBought();

	}

	function withdraw(address destination, uint amount) external onlyOwner {
		require(address(this).balance >= amount);
		require(destination != address(0));
		destination.transfer(amount);
	}

	function getAd(uint row, uint col) public view returns (bool, string, string) {
		return (blocks[row][col].taken, blocks[row][col].imgLink, blocks[row][col].redirectLink); 
	}
}