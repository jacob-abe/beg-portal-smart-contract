//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

struct Beg {
        address begger; // The address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user waved.
}