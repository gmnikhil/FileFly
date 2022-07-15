// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import 'hardhat/console.sol';

contract HealthNet {
    address public owner;

    struct Admin {
        address addr;
    }

    struct File {
        string link;
        address user;
        uint prevIdx;
    }

    uint public hospitalCount = 0;
    Hospital[] public hospitals;

    uint public doctorCount = 0;
    address payable[] public doctors;

    uint public adminCount = 0;
    Admin[] public admins;

    uint public reportCount = 0;
    File[] public files;
    mapping(address => uint) public reportUserMap;

    constructor() {
        owner = msg.sender;
        File memory _r;
        _r.user = 0x0000000000000000000000000000000000000000;
        _r.link = "";
        _r.prevIdx = 0;
        files.push(_r);
        adminCount++;
        admins.push(owner);
    }

    function isHospital(address _addr) public view returns(bool) {
        for (uint i = 0; i < hospitalCount; i++) {
            if (_addr == hospitals[i].addr) return true;
        }
        return false;
    }

    function isDoctor(address _addr) public view returns(bool) {
        for (uint i = 0; i < doctorCount; i++) {
            if (_addr == doctors[i]) return true;
        }
        return false;
    }

    function isAdmin(address _addr) public view returns(bool) {
        for (uint i = 0; i < adminCount; i++) {
            if (_addr == admins[i].addr) return true;
        }
        return false;
    }

    function addHospital(address _addr, string memory _location) public {
        require(owner == msg.sender, "Only Owner can add hospital");
        hospitalCount++;
        hospitals.push(Hospital(_addr, _location));
    }

    function addAdmin(address _addr) public {
        require(isAdmin(msg.sender), "Only admin can add another admin");
        adminCount++;
        admins.push(Admin(_addr));
    }

    function addDoctor(address payable[] calldata _addr) public payable {
        require(
            owner == msg.sender || isHospital(msg.sender),
            "Only Owner or Hospital can add hospital"
        );
        for (uint i = 0; i < _addr.length; i++) {
            doctorCount++;
            doctors.push(_addr[i]);
        }
    }

    function editReport(address _addr, string memory _link) public {
        require(
            isDoctor(msg.sender),
            "Only a doctor can change File"
        );
        File memory _r;
        _r.user = _addr;
        _r.link = _link;
        _r.prevIdx = reportUserMap[_addr];
        files.push(_r);
        reportUserMap[_addr] = ++reportCount;
    }
}
