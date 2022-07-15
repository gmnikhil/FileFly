import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { FileFly } from "../typechain-types";

describe("FileFly contract", function () {
  async function deployFileFlyFixture() {
    const [
      owner,
      addr1,
      addr2,
      addr3,
      addr4,
      addr5,
      addr6,
      addr7,
      addr8,
      addr9,
      addr10,
    ] = await ethers.getSigners();

    const FileFly = await ethers.getContractFactory("FileFly");
    const file_fly = await FileFly.deploy();

    await file_fly.deployed();

    return {
      file_fly,
      owner,
      addr1,
      addr2,
      addr3,
      addr4,
      addr5,
      addr6,
      addr7,
      addr8,
      addr9,
      addr10,
    };
  }

  it("Should add admin", async function () {
    const { file_fly, addr1 } = await loadFixture(deployFileFlyFixture);

    await file_fly.addAdmin(addr1.address);
    expect(await file_fly.isAdmin(addr1.address)).to.equal(true);
  });

  it("Should add file", async function () {
    const { file_fly, addr1, addr2 } = await loadFixture(deployFileFlyFixture);

    await file_fly
      .connect(addr2)
      .addFile(
        "<image_link>",
        "Sample",
        "Sample Description",
        "sample_timestamp"
      );
    expect(await file_fly.fileCount()).to.equal(BigInt(1));
  });

  async function getFiles(file_fly: FileFly, userAddress: string) {
    let fileCount = await file_fly.fileCount();
    const user_files = [];
    for (let i = 0; i < fileCount; i++) {
      const data = await file_fly.files(i);
      if (data.user == userAddress) user_files.push(data);
    }
    return user_files;
  }

  it("Test getFiles function", async function () {
    const { file_fly, addr2, addr8, addr10 } = await loadFixture(
      deployFileFlyFixture
    );

    await file_fly
      .connect(addr2)
      .addFile(
        "<image_link>",
        "Sample",
        "Sample Description",
        "sample_timestamp"
      );

    await getFiles(file_fly, addr2.address);
  });
});
