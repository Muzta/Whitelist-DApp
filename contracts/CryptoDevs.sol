// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Whitelist.sol";

contract CryptoDevs is ERC721Enumerable, Ownable {
    // Price in ether of one NFT
    uint128 constant public PRICE = 0.01 ether;
    // Max number of CryptoDevs that can exists
    uint128 constant public MAX_TOKENS = 20;

    // Whitelist contract instance
    Whitelist whitelist;

    // Num of tokens reserved for whitelisted addresses
    uint128 public reservedTokens;
    uint128 public reservedTokensClaimed;

    constructor(address whitelistContract) ERC721("CryptoDevs", "CD") {
        whitelist = Whitelist(whitelistContract);
        reservedTokens = whitelist.maxWhitelistedAddresses();
    }

    function mint() public payable {
        // Always leave enough room for whitelisted reservations
        require(totalSupply() + reservedTokens - reservedTokensClaimed < MAX_TOKENS, "Exeeded max supply");

        // If user is whitelisted, make sure theres still reserved tokens left
        if(whitelist.whitelistedAddresses(msg.sender) && msg.value < PRICE) {
            // Make sure user doesnt have already an NFT
            require(balanceOf(msg.sender) == 0, "Already owned");
            reservedTokensClaimed += 1;
        } else {
            // If user is not whitelisted, make sure they have sent enough ETH
            require(msg.value >= PRICE, "NOT_ENOUGH_ETHER");
        }
        uint256 tokenId = totalSupply();
        _safeMint(msg.sender, tokenId);
        
    }

    // @dev Sends all the ether in the contract to the owner
    function withdraw() public onlyOwner {
        address _owner = owner();
        uint256 _amount = address(this).balance;
        (bool sent, ) = _owner.call{value: _amount}("");
        require(sent, "Failed to send the Ether");
    }
}