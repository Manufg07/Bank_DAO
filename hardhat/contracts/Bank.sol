// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Bank is Ownable {
  // Mapping to store the balances of users
    uint public count;
    mapping(uint=>address) public  addressCount;
    mapping (address=>uint) public balanceLedger;

    constructor(address initialOwner)
        Ownable(initialOwner)
    {}


    // Function to deposit funds into the DAO bank
    function deposite() public payable {
        if(balanceLedger[msg.sender]==0){
            addressCount[++count]=msg.sender;
        }
        balanceLedger[msg.sender]+=msg.value;
    }

     // Function to transfer funds between members
function transfer(uint amnt, address ad) public onlyOwner {
    require(balanceLedger[msg.sender] >= amnt, "Insufficient balance");
    balanceLedger[msg.sender] -= amnt;
    balanceLedger[ad] += amnt;
    payable(ad).transfer(amnt);
}

}

