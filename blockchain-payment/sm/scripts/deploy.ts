import { ethers } from "hardhat";

async function main() {

  const shopping = await ethers.getContractFactory("shop");
  const shop = await shopping.deploy();

  await shop.deployed();
  const txhash = shop.deployTransaction.hash
  const Receipt = await ethers.provider.waitForTransaction(txhash)
  console.log(`Contract deployed to https://sepolia.etherscan.io/tx${Receipt.contractAddress}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
