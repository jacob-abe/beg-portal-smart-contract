const main = async() => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const begContractContractFactory = await hre.ethers.getContractFactory("BegContract")
  const begContract = await begContractContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.1'),
  })
  await begContract.deployed()

  console.log("Deployed to "+ begContract.address+"\n")

  let contractBalance = await hre.ethers.provider.getBalance(begContract.address);
  console.log('Contract balance:', hre.ethers.utils.formatEther(contractBalance));
  
  console.log("Contract deployed by:", owner.address);

  for(i=0; i<5; i++){
    await begContract.increment(`Calling in Loop: ${i+1}`)
  }

  contractBalance = await hre.ethers.provider.getBalance(begContract.address);
  console.log('Contract balance:', hre.ethers.utils.formatEther(contractBalance));

  console.log("Enter random person")

  let begTxn = await begContract.connect(randomPerson).increment("Hello by rando");
  await begTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(begContract.address);
  console.log('Contract balance:', hre.ethers.utils.formatEther(contractBalance));

  let totalBegs = await begContract.connect(randomPerson).getTotalBegs();
  console.log("Total begs after execution = ",totalBegs)

  let allBegs = await begContract.connect(randomPerson).getAllBegs()
  console.log("All begs: ",allBegs)
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
};

runMain()
