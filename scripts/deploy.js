const hre  = require("hardhat");

async function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// This is the new hardhat version for deploying a contract
async function main() {
	// DeployContract in ethers.js is an abstraction used to deploy new smart contracts, so whitelistContract
	// here is a factory for instances of our whitelist contract.
	// To deploy our contract, we just have to call ethers.deployContract and await
    // its waitForDeployment() method, which happens once its transaction has been mined.
	const whitelistContract = await hre.ethers.deployContract("Whitelist", [10]);
	// Max num of whitelisted contracts is 10

	// Wait for the contract to deploy
	await whitelistContract.waitForDeployment();

	// Print the address of the contract
	console.log("Whitelist Contract Address:", whitelistContract.target);

	// Sleep for 30 seconds while Etherscan indexes the new contract deployment
	await sleep(30 * 1000);

	// Verify the contract on etherscan
	await hre.run("verify:verify", {
		address: whitelistContract.target,
		constructorArguments: [10],
	});
}

// Call the main function and catch if there is any error
// We recommend this pattern to be able to use async/await everywhere and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});

	// A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
	// so whitelistContract here is a factory for instances of our Whitelist contract.
	// const whitelistContract = await ethers.getContractFactory("Whitelist");

	// Deploy the contract
	// 10 is the maximum number
	// const deployedWhitelistContract = await whitelistContract.deploy(10);

	// Wait for it to finish deploying
	// await deployedWhitelistContract.deployed();

	// Print the contract address
	// console.log("Whitelist contract addres: ", deployedWhitelistContract.address);
// }

// Main function and catch if any error
// main()
// 	.then(() => process.exit(0))
// 	.catch((error) => {
// 		console.error(error);
// 		process.exit(1);
// 	});