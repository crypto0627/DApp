const { ethers } = require("hardhat");

async function main() {

  const Boneboss = await ethers.getContractFactory("boneboss");
  const boneboss = await Boneboss.deploy("boneboss","0x13D8CaF1EaBcCBBD00d1E6D2dbB4dc4FECF2a022");
  const txHash = boneboss.deployTransaction.hash;
  await boneboss.deployed("boneboss","bb2");

  const txReceipt = await ethers.provider.waitForTransaction(txHash);
  console.log(`Contract deployed to address: https://mumbai.polygonscan.com/address/${txReceipt.contractAddress}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
