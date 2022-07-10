import { ethers } from "hardhat";
import fs from 'fs';
import path from 'path';
import * as child_process from 'child_process';

const deploy_address = path.join(__dirname, '../deploy_address')

function writeAddress(addr: string) {
    fs.writeFile(deploy_address, addr, (err) => console.log(err));
}

function copyABI() {
    const src = path.join(__dirname, '../artifacts/contracts/HealthNet.sol/HealthNet.json');
    const dest = path.join(__dirname, "..");
    child_process.execSync(`cp ${src} ${dest}`);
}

async function main() {
  const HealthNet = await ethers.getContractFactory("HealthNet");
  const health_net = await HealthNet.deploy();

  await health_net.deployed();

  writeAddress(health_net.address);
  copyABI();

  console.log("HealthNet deployed to:", health_net.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
