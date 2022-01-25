var TrackProduct = artifacts.require("./TrackProduct.sol");

module.exports = function(deployer) {
  deployer.deploy(TrackProduct);
};
