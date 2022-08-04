import { ethers } from "hardhat";
import path from "path";
import * as child_process from "child_process";

function copyABI() {
  const src = path.join(
    __dirname,
    "../artifacts/contracts/FileFly.sol/FileFly.json"
  );
  const dest = path.join(__dirname, "../../frontend");
  child_process.execSync(`copy ${src} ${dest}`);
}

async function main() {
  const FileFly = await ethers.getContractFactory("FileFly");
  const file_fly = await FileFly.deploy();

  await file_fly.deployed();
  console.log("FileFly deployed to:", file_fly.address);

  copyABI();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
