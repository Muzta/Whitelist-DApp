// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Whitelist {
  // Max number of whitelisted addresses allowed
    uint8 public maxWhitelistedAddresses;

    // Only if an address has been whitelisted, it is set to tru in the mapping
    mapping(address => bool) public whitelistedAddresses;

    // How many addresses have already be whitelisted
    uint8 public numAddressesWhitelisted;

    // Setting the max num of whitelisted addresses at the deployment time
    constructor(uint8 _maxWhitelistedAddresses) {
        maxWhitelistedAddresses = _maxWhitelistedAddresses;
    }

    // Add the address of the sender to the whitelist
    function addAddressToWhitelist() public {
        // Check if the user has been whitelisted
        require(!whitelistedAddresses[msg.sender], "Sender has already been whitelisted");

        // Check if more address can be whitelisted
        require(numAddressesWhitelisted < maxWhitelistedAddresses, "More addresses cant be added, limit reached");

        whitelistedAddresses[msg.sender] = true;
        numAddressesWhitelisted += 1;
    }
}