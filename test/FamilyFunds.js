const { expect } = require("chai");

describe('FamilyFunds', async function () {
  
  it('should set the right owner', async function () {
    const [owner, addr1, addr2] = await ethers.getSigners()
    const FamilyFundsContract = await ethers.getContractFactory('FamilyFunds')
    const familyFunds = await FamilyFundsContract.deploy([addr1.address, addr2.address])
    
    await familyFunds.deployTransaction.wait()

    expect(await familyFunds.owner()).to.be.equal(owner.address)
  })

  it('should recognise addresses as family members', async function () {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners()
    const FamilyFundsContract = await ethers.getContractFactory('FamilyFunds')
    const familyFunds = await FamilyFundsContract.deploy([addr1.address, addr2.address])

    await familyFunds.deployTransaction.wait()

    expect(await familyFunds.isFamilyMember(addr1.address)).to.equal(true)
    expect(await familyFunds.isFamilyMember(addr2.address)).to.equal(true)
    expect(await familyFunds.isFamilyMember(addr3.address)).to.equal(false)

  })
})

