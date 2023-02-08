const { expect } = require("chai");

describe('FamilyFunds', function () {
  it('should set the right owner', async function () {
    const [owner, addr1, addr2] = await ethers.getSigners()
    
    const FamilyFundsContract = await ethers.getContractFactory('FamilyFunds')

    const familyFunds = await FamilyFundsContract.deploy([addr1.address, addr2.address])

    await familyFunds.deployTransaction.wait()

    expect(await familyFunds.owner()).to.be.equal(owner.address)
  })
})

