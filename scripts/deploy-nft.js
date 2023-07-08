const hre = require("hardhat");
const WHITELIST_CONTRACT_ADDRESS = "0x7a36e727c41aA225baF6eA099abF72E009EA9E3A"

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
    
    /// Deploy the CryptoDevs contract
    const nftContract = await hre.ethers.deployContract(
        "CryptoDevs",
        [WHITELIST_CONTRACT_ADDRESS],
    );
    
    // Wait for the contract to deploy
    await nftContract.waitForDeployment();

    // Print the address of the deployed contract
    console.log("NFT Contract Address: ", nftContract.target);

    // Sleep for 30seconds while Etherscan idexes the new contract deployment
    await sleep(30 * 1000)

    // Verify the contract on Etherscan
    await hre.run("verify:verify", {
        address: nftContract.target,
        constructorArguments: [WHITELIST_CONTRACT_ADDRESS]
    });
}

// Call the main function and catch any error
// We recommend this pattern to be able to use async/await everywhere and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});