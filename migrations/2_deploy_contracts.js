const Ad = artifacts.require("./Ad.sol")

module.exports = function(deployer) {
	deployer.deploy(Ad);
}