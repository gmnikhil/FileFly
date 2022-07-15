// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import 'hardhat/console.sol';

contract HealthNet {

    struct Admin {
        address addr;
    }

    struct File {
        string link;
        address user;
        string name;
        string description;
        uint likes;
        uint dislikes;
        uint wows;
        uint laughs;
        string uploaded_on;
    }

    uint public adminCount = 0;
    Admin[] public admins;

    uint public fileCount = 0;
    File[] public files;

    constructor() {
        adminCount++;
        admins.push(msg.sender);
    }

    function isAdmin(address _addr) public view returns(bool) {
        for (uint i = 0; i < adminCount; i++) {
            if (_addr == admins[i].addr) return true;
        }
        return false;
    }

    function addAdmin(address _addr) public {
        require(isAdmin(msg.sender), "Only admin can add another admin");
        adminCount++;
        admins.push(Admin(_addr));
    }

    function addFile(string memory _link, string memory _name, string memory _description, string memory _uploaded_on) public {
        require(_name != "", "File should have a name");
        require(_description != "", "File should have a description");
        require(_link != "", "File should have a link");
        require(_uploaded_on != "", "File should have a upload date_time");

        File memory _r;
        _r.user = msg.sender;
        _r.link = _link;
        _r.name = _name;
        _ri.description = _description;
        _r.uploaded_on = _uploaded_on;
        files.push(_r);
        fileCount++;
    }
}
