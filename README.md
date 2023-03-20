# 311581012-bdaf-lab3

# Simple ERC20 Safe
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

## Contract link 
- Bank contract was deployed [here](https://goerli.etherscan.io/address/0xacD36E8A30f90E6c20E790De89476eD372CA3a84#writeContract).
- ERC20 Token was deployed [here](https://goerli.etherscan.io/address/0x93ce1b10b272d279d469c4d17d1e8d237be20b39).

## Interactive step 
- First, go to [ERC20 Token contract](https://goerli.etherscan.io/address/0x93ce1b10b272d279d469c4d17d1e8d237be20b39#writeContract).
- Connect to wallet, use `mint` function in write function to get some token
- Approve some allowance to bank contract, use `approve` function in write function, input `0xacD36E8A30f90E6c20E790De89476eD372CA3a84` (bank contract address) in `spender` row

## Interactive step 
- Then you can go to [Bank contract](https://goerli.etherscan.io/address/0xacD36E8A30f90E6c20E790De89476eD372CA3a84#writeContract).
- Connect to wallet, interact with `deposit` and `withdraw` function in write function



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
