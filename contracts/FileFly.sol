// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import 'hardhat/console.sol';

contract FileFly {

    struct Admin {
        address addr;
        string name;
        bool access;
        uint index;
    }

    struct Owner {
        address addr;
        string name;
    }

    struct User {
        address addr;
        string name;
    }

    struct File {
        string link;
        address payable user;
        string name;
        string description;
        string uploaded_on;
        string updated_on;
        string label;
        uint index;
        bool deleted;
        uint likes;
        string id;
    }

    struct Comment {
        address user;
        string comment;
        string file_link;
        string date_time;
    }

    uint public commentCount = 0;
    Comment[] public comments;

    uint public ownerCount = 0;
    Owner[] public owners;

    uint public adminCount = 0;
    Admin[] public admins;

    uint public fileCount = 0;
    File[] public files;

    constructor() {
        ownerCount++;
        owners.push(Owner(msg.sender, 'FileFly Admin'));
    }

    function addComment(string memory _comment, string memory _file_link, string memory date_time) public {
        comments.push(Comment(msg.sender, _comment, _file_link, date_time));
        commentCount++;
    }

    function isOwner(address _addr) public view returns(bool) {
        for (uint i = 0; i < ownerCount; i++) {
            if (_addr == owners[i].addr) return true;
        }
        return false;
    }

    function isAdmin(address _addr) public view returns(bool) {
        for (uint i = 0; i < adminCount; i++) {
            if (_addr == admins[i].addr && admins[i].access) return true;
        }
        return false;
    }

    function addAdmin(address _addr, string memory _name) public {
        require(isOwner(msg.sender), "Only owner can add another admin");
        admins.push(Admin(_addr, _name, true, adminCount));
        adminCount++;
    }

    function removeAdmin(uint _index) public {
        require(isOwner(msg.sender), "Only owner can remove admin");
        admins[_index].access = false;
    }

    function addFile(string memory _link, string memory _name, string memory _description, string memory _label, string memory _uploaded_on, string memory _id) public {
        // require(bytes(_name).length == 0, "File should have a name");
        // require(bytes(_description).length == 0, "File should have a description");
        // require(bytes(_link).length == 0, "File should have a link");
        // require(bytes(_uploaded_on).length == 0, "File should have a upload date_time");

        File memory _r;
        _r.user = payable(msg.sender);
        _r.link = _link;
        _r.name = _name;
        _r.description = _description;
        _r.uploaded_on = _uploaded_on;
        _r.label = _label;
        _r.deleted = false;
        _r.index = fileCount;
        _r.updated_on = '';
        _r.id = _id;
        files.push(_r);
        fileCount++;
    }

    function editFile(uint _index, string memory _name, string memory _description, string memory _label, string memory _updated_on) public {
        File memory _r = files[_index];
        _r.name = _name;
        _r.description = _description;
        _r.label = _label;
        _r.updated_on = _updated_on;

        files[_index] = _r;
    }

    function deleteFile(uint _index) public {
        require(isAdmin(msg.sender) || isOwner(msg.sender) || files[_index].user == msg.sender, "Only Admins can delete other users files");
        files[_index].link='';
        files[_index].deleted = true;
    }

    function likeFile(uint _index) public payable {
        require(msg.value >= 1000000000000000000, "You have to send atleast 1 ETH");
        files[_index].user.transfer(msg.value);
        files[_index].likes++;
    }
}
