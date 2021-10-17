//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract BegContract {
    uint256 begCount;

    constructor() {
        console.log("Contract running in console bing bong\n");
    }

    function increment() public {
        begCount += 1;
        console.log("begCount incremented by: %s \n", msg.sender);
        console.log("begCount is now: %d \n",begCount);
    }

    function getTotalBegs() public view returns (uint256) {
        console.log("Total Beg Count is: %d \n",begCount);
        return begCount;
    }
}
