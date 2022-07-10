import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { HealthNet } from "../typechain-types";

describe("HealthNet contract", function () {
    async function deployHealthNetFixture() {
        const [owner, addr1, addr2, addr3, addr4, addr5, addr6, addr7, addr8, addr9, addr10] = await ethers.getSigners();

        const HealthNet = await ethers.getContractFactory("HealthNet");
        const health_net = await HealthNet.deploy();

        await health_net.deployed();

        return { health_net, owner, addr1, addr2, addr3, addr4, addr5, addr6, addr7, addr8, addr9, addr10 };
    }

    it("Should add hospital", async function () {
        const { health_net, addr1 } = await loadFixture(deployHealthNetFixture);

        await health_net.addHospital(addr1.address, "Aluva");
        expect(await health_net.isHospital(addr1.address)).to.equal(true);
    });

    it("Should fail add hospital", async function () {
        const { health_net, addr1, addr2 } = await loadFixture(deployHealthNetFixture);

        await expect(health_net.connect(addr1).addHospital(addr2.address, "Aluva"))
            .to.be.revertedWith("Only Owner can add hospital");
        expect(await health_net.isHospital(addr2.address)).to.equal(false);
    });

    it("Should add doctor", async function () {
        const { health_net, addr1, addr2 } = await loadFixture(deployHealthNetFixture);

        await health_net.addHospital(addr1.address, "Aluva");
        await health_net.connect(addr1).addDoctor([addr2.address]);
        expect(await health_net.isDoctor(addr2.address)).to.equal(true);
    });

    it("Should add multiple doctors", async function () {
        const { health_net, addr1, addr2, addr3, addr4 } = await loadFixture(deployHealthNetFixture);

        await health_net.addHospital(addr1.address, "Aluva");
        await health_net.connect(addr1).addDoctor([addr2.address, addr3.address, addr4.address]);
        expect(await health_net.isDoctor(addr2.address)).to.equal(true);
        expect(await health_net.isDoctor(addr3.address)).to.equal(true);
        expect(await health_net.isDoctor(addr4.address)).to.equal(true);
    });

    it("Should fail add doctor", async function () {
        const { health_net, addr1, addr2 } = await loadFixture(deployHealthNetFixture);

        await expect(health_net.connect(addr1).addDoctor([addr2.address]))
            .to.be.revertedWith("Only Owner or Hospital can add hospital");
        expect(await health_net.isDoctor(addr2.address)).to.equal(false);
    });

    async function addDoctorsFixture() {
        const { health_net, addr1, addr2, addr3, addr4, addr5, addr6, addr7, addr8, addr9, addr10 } = await loadFixture(deployHealthNetFixture);

        await health_net.addHospital(addr1.address, "Aluva");
        await health_net.connect(addr1).addDoctor([addr2.address, addr3.address, addr4.address]);
        await health_net.isDoctor(addr2.address);
        await health_net.isDoctor(addr3.address);
        await health_net.isDoctor(addr4.address);

        return { health_net, addr1, addr2, addr3, addr4, addr5, addr6, addr7, addr8, addr9, addr10 };
    }

    it("Should fail add report", async function () {
        const { health_net, addr5, addr6 } = await loadFixture(addDoctorsFixture);

        await expect(health_net.connect(addr5).editReport(addr6.address, "asdfasdfasdf"))
            .to.be.revertedWith("Only a doctor can change report");
    });

    it("Should add 4 reports", async function () {
        const { health_net, addr4, addr6 } = await loadFixture(addDoctorsFixture);

        await health_net.connect(addr4).editReport(addr6.address, "asdfasdfasdf");
        await health_net.connect(addr4).editReport(addr6.address, "qwerqwer");
        await health_net.connect(addr4).editReport(addr6.address, "pouipoi");
        await health_net.connect(addr4).editReport(addr6.address, "m,n,mn,");
        expect(await health_net.reportCount()).to.equal(BigInt(4));
    });

    async function getReports(health_net: HealthNet, userAddress: string) {
        let idx = await health_net.reportUserMap(userAddress);
        let res = []
        while(idx.toNumber()) {
            const data = await health_net.reports(idx);
            res.push(data);
            idx = data.prevIdx;
        }
        return res;
    }

    it("Test getReports function", async function () {
        const { health_net, addr4, addr5, addr6, addr7, addr8, addr9, addr10 } = await loadFixture(addDoctorsFixture);

        await health_net.connect(addr4).editReport(addr6.address, "nnnnnnnnnnnnnnnnnnnnnnnnnnnn");
        await health_net.connect(addr4).editReport(addr5.address, "qwerqwer");
        await health_net.connect(addr4).editReport(addr7.address, "pouipoi");
        await health_net.connect(addr4).editReport(addr8.address, "m,n,mn,");
        await health_net.connect(addr4).editReport(addr9.address, "asdfasdfasdf");
        await health_net.connect(addr4).editReport(addr10.address, "cccccccccccccccccccccccccccc");
        await health_net.connect(addr4).editReport(addr10.address, "cccccccccccccccccccccccccccc");
        await health_net.connect(addr4).editReport(addr10.address, "cccccccccccccccccccccccccccc");
        await health_net.connect(addr4).editReport(addr9.address, "asdfasdfasdf");
        await health_net.connect(addr4).editReport(addr7.address, "qwerqwer");
        await health_net.connect(addr4).editReport(addr5.address, "pouipoi");
        await health_net.connect(addr4).editReport(addr6.address, "nnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
        await health_net.connect(addr4).editReport(addr6.address, "nnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
        await health_net.connect(addr4).editReport(addr7.address, "qwerqwer");
        await health_net.connect(addr4).editReport(addr6.address, "nnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
        await health_net.connect(addr4).editReport(addr6.address, "nnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
        await health_net.connect(addr4).editReport(addr10.address, "cccccccccccccccccccccccccccc");
        await health_net.connect(addr4).editReport(addr8.address, "qwerqwer");
        await health_net.connect(addr4).editReport(addr6.address, "nnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
        await health_net.connect(addr4).editReport(addr10.address, "cccccccccccccccccccccccccccc");

        await getReports(health_net, addr10.address);
        await getReports(health_net, addr6.address);
    });

});
