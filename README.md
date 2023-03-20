# 311581012-bdaf-lab3

## Simple ERC20 Safe
- Create a simple safe contract that allows everyone to store funds in the contract.
- The contract should at least includes the following two functions:
    
    ```bash
    function deposit(address token, uint256 amount)
    
    function withdraw(address token, uint256 amount)
    ```
    
- `deposit` is expected to take away users' funds as specified.
- `withdraw` is expected to return users' funds as specified.
- Construct **tests** with Hardhat (You will have to create your own ERC20)
- **Deploy** the contract with Hardhat
- **Verify** the contract with Hardhat on the testnet

# Bank with deposit & withdraw implement

## Install

With [npm](https://npmjs.org/) installed, run

    $ npm install --save @nomiclabs/hardhat-etherscan
    $ npm install ethers mocha
    $ npm install --save-dev @openzeppelin/contracts
    $ npm install --save dotenv
    
## Compile

    $ cd bank/
    $ npx hardhat compile

## Test Bank function(create a ERC20 Token for test)

    $ npx hardhat test
    
## Set .env
  set your PRIVATE_KEY, infura ENDPOINT_URL(goerli) and ETHERSCAN_API_KEY

    $ PRIVATE_KEY = ""
    $ ENDPOINT_URL = ""
    $ ETHERSCAN_API_KEY = ""

## Deploy to goerli    
    npx hardhat run scripts/deploy.js --network goerli
    
    
# ERC20 Token Implement

## Install
    
## Compile

    $ cd ../token
    $ npx hardhat compile

## Test Token function

    $ npx hardhat test
    
## Set .env
  set your PRIVATE_KEY, infura ENDPOINT_URL(goerli) and ETHERSCAN_API_KEY

    $ PRIVATE_KEY = ""
    $ ENDPOINT_URL = ""
    $ ETHERSCAN_API_KEY = ""

## Deploy to goerli    
    npx hardhat run scripts/deploy.js --network goerli
