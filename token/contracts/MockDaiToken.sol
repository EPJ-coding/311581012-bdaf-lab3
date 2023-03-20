//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract MockDaiToken is ERC20 {

  address public owner;

  constructor() ERC20("MockDaiToken", "DAI") {
    _mint(msg.sender, 100000 * 10 ** decimals());
    owner = msg.sender;
  }

  function mint( uint256 amount) public {
    _mint(msg.sender, amount);
  }


}