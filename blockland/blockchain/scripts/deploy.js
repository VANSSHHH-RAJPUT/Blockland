const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const LandRegistry = await ethers.getContractFactory("LandRegistry");
  const landRegistry = await LandRegistry.deploy();

  await landRegistry.waitForDeployment();
  const address = await landRegistry.getAddress();

  console.log("LandRegistry deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
