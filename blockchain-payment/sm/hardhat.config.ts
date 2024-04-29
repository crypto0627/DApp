import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import "@nomiclabs/hardhat-etherscan";


dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    sepolia:{
      url:process.env.ALCHEMY_KEY,
      accounts:[`0x${process.env.PRIVATE_KEY}`]
    },
  },
  etherscan:{
    apiKey:process.env.ETHERSCAN_KEY,
  }
};

export default config;
