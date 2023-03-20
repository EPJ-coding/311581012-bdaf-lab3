// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
/*
interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}*/

contract Bank {
    mapping(address => mapping(address => uint256)) private balances;
    address payable public owner;

    constructor() payable{
        // The totalSupply is assigned to the transaction sender, which is the
        // account that is deploying the contract.
        owner = payable (msg.sender);
    }

    function deposit(address token, uint256 amount) public payable{
        require(amount > 0, "Amount must be greater than 0");
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        balances[msg.sender][token] += amount;
    }

    function withdraw(address token, uint256 amount) public {
        require(amount > 0, "Amount must be greater than 0");
        require(balances[msg.sender][token] >= amount, "Insufficient balance");
        IERC20(token).transfer(msg.sender, amount);
        balances[msg.sender][token] -= amount;
    }

    function balanceOf(address token) public view returns (uint256) {
        return balances[msg.sender][token];
    }
}