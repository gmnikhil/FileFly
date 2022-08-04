import { ethers } from "hardhat";
import fs from "fs";
import path from "path";
import * as child_process from "child_process";
//import { HealthNet } from "../typechain-types";

const deploy_address = path.join(__dirname, "../deploy_address");

// function writeAddress(addr: string) {
//     fs.writeFile(deploy_address, addr, (err) => console.log(err));
// }

function copyABI() {
  const src = path.join(
    __dirname,
    "../artifacts/contracts/FileFly.sol/FileFly.json"
  );
  const dest = path.join(__dirname, "../../frontend");
  child_process.execSync(`copy ${src} ${dest}`);
}

// async function dummyData(health_net: HealthNet) {
//     const hospital = "0x3B87223646ACc9A148BA437f21b5ce4c9A35F79a";
//     const owner = "0x82427ae292798ea3A0C67066b2596AaCe5F493CE";
//     const doctor = "0xD053e0cFCBd2499811435EB31fdD99d3624Ad504";
//     const patient = "0x41a6AabBEc3C1b70bbac6572D966ca6c4bB6eFbd";

//     console.log('Adding hospital');
//     await health_net.addHospital(hospital, "NYC");
//     console.log('Adding doctors');
//     await health_net.addDoctor([doctor, owner]);
//     console.log('Adding record 1');
//     await health_net.editReport(owner, "https://dweb.link/ipfs/QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR")
//     console.log('Adding record 2');
//     await health_net.editReport(patient, "https://dweb.link/ipfs/QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR")
//     console.log('Adding record 3');
//     await health_net.editReport(owner, "https://dweb.link/ipfs/QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR")
//     console.log('Adding record 4');
//     await health_net.editReport(patient, "https://dweb.link/ipfs/QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR")
//     console.log('Adding record 5');
//     await health_net.editReport(patient, "https://dweb.link/ipfs/QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR")
//     console.log('Adding record 6');
//     await health_net.editReport(owner, "https://dweb.link/ipfs/QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR")
// }

async function main() {
  const FileFly = await ethers.getContractFactory("FileFly");
  const file_fly = await FileFly.deploy();

  await file_fly.deployed();
  console.log("FileFly deployed to:", file_fly.address);

  //writeAddress(health_net.address);
  copyABI();

  //await dummyData(health_net);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
