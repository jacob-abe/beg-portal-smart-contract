//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import {Beg} from "./BegStruct.sol";

contract BegContract {

    uint256 begCount;

    uint256 private seed;

    Beg[] begs;

    mapping(address => uint256) public lastBeggedAt;

    event NewBeg(address indexed from, uint256 timestamp, string message);

    constructor() payable {
        console.log("Contract running in console bing bong\n");
    }

    function getAllBegs() public view returns (Beg[] memory) {
        return begs;
    }

    function getTotalBegs() public view returns (uint256) {
        console.log("Total Beg Count is: %d \n",begCount);
        return begCount;
    }

    function increment(string memory _message) public {
        getLastBeggedIsNotAbuse();
        
        begCount += 1;
        console.log("begCount incremented by: %s \n", msg.sender);
        console.log("begCount is now: %d \n",begCount);

        begs.push(Beg(msg.sender, _message, block.timestamp));

        emit NewBeg(msg.sender, block.timestamp, _message);

        if(generateRandomNumber() < 10) {
            console.log("%s won!", msg.sender);
            sendPriceMoney();
        }else{
            console.log("%s Didnt win!", msg.sender);
        }
    }

    function sendPriceMoney() private {
        uint256 prizeAmount = 0.0001 ether;
        require(
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has."
        );
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract.");
    }

    function generateRandomNumber() private returns (uint256) {
        uint256 randomNumber = (block.difficulty + block.timestamp + seed) % 100;
        seed = randomNumber;
        return randomNumber;
    }

    function getLastBeggedIsNotAbuse() private returns (bool) {
        require(
            lastBeggedAt[msg.sender] + 15 minutes < block.timestamp,
            "Wait 15m"
        );
        lastBeggedAt[msg.sender] = block.timestamp;

    }

}
