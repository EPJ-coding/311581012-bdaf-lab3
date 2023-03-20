const hre = require("hardhat");

async function main() {
  const MockDaiToken = await hre.ethers.getContractFactory("MockDaiToken");
  const token = await MockDaiToken.deploy();

  await token.deployed();

  console.log("Deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });