import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
//import "@nomiclabs/hardhat-ganache";

//const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

//const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY!;

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    ganache: {
      url: "http://localhost:7545",
      chainId: 1337,
    },

    // rinkeby: {
    //     url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
    //         accounts: [RINKEBY_PRIVATE_KEY]
    // }
    // hardhat: {
    //   chainId: 1337,
    // },
  },
};

export default config;
