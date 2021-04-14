import { getTokenBalance,getTokenSymbol, adminBalance, contractbalance, totalStakedValue , userStakedValue, userRewardValue,setupWethContract ,setupWeb3, setupStakingContract, addEthereumAccounts, web3LoadingError } from "./actions";
import Web3 from "web3";
import { STAKING_ADDRESS, STAKING_ABI } from '../contract/StakingContract';
import { WETH_ADDRESS, WETH_ABI } from '../contract/WETH'

let web3
let BN
export const loadBlockchain = async(dispatch) =>{
    try {
        console.log("Web3 = ",Web3);
        console.log("Web3.givenProvider = ",Web3.givenProvider);
        
        if(Web3.givenProvider){
        
            web3 = new Web3(Web3.givenProvider);
            await Web3.givenProvider.enable();
            BN = web3.utils.BN
            dispatch(setupWeb3(web3));
            const StakingContract = new web3.eth.Contract(STAKING_ABI, STAKING_ADDRESS);
            dispatch(setupStakingContract(StakingContract));
            const WethContract = new web3.eth.Contract(WETH_ABI,WETH_ADDRESS)
            dispatch(setupWethContract(WethContract))
            const accounts = await web3.eth.getAccounts();
            dispatch(addEthereumAccounts(accounts));
            /*web3.eth.getBalance(accounts[0]).then((res)=>{
                console.log(res)
                dispatch(eth_balance(web3.utils.fromWei(new BN(res).toString(),"ether")))
            })*/
            console.log("contract = ",StakingContract);
            console.log("contract.methods = ",StakingContract.methods);
            console.log("contract.methods = ",WethContract.methods);
            
        }
        else {
            dispatch(web3LoadingError("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!"))
        }
    }
    catch(error){
        console.log("Error in loading Web3 = ",error);
        if(error.code===4001){
            
            dispatch(web3LoadingError(error.message));
        }
    }
}


//  GET TOKEN DATA 
//  CONNECT TO WALLET VALUE
export const getSymbolOfToken = async(StakingContract,accounts,dispatch)=>{
    const receipt = await StakingContract.methods.symbol().call({
        from : accounts[0]
    })
    dispatch(getTokenSymbol(receipt))
    
}

export const getBalanceOfToken = async(StakingContract,accounts,dispatch)=>{
    const receipt = await StakingContract.methods.balanceOf(accounts[0]).call({
        from : accounts[0]
    })
    dispatch(getTokenBalance(receipt))
    
}


//  CONNECT TO WALLET VALUE
export const ContractWethbalance = async(WethContract,accounts,dispatch)=>{
    const receipt = await WethContract.methods.balanceOf(STAKING_ADDRESS).call({
        from : accounts[0]
    })
    dispatch(contractbalance(web3.utils.fromWei(new BN(receipt).toString(),"ether")))
}

//  CONNECT TO WALLET VALUE
export const AdminWethbalance = async(StakingContract,WethContract,accounts,dispatch)=>{
    const getOwnerAddress = await StakingContract.methods.owner().call({from:accounts[0]})
    const receipt = await WethContract.methods.balanceOf(getOwnerAddress).call({
        from : accounts[0]
    })
    dispatch(adminBalance(web3.utils.fromWei(new BN(receipt).toString(),"ether")))
    
}

//  CONNECT TO WALLET VALUE
export const getTotalStakedValue = async(StakingContract,accounts,dispatch)=>{
    console.log("before transaction")
    const receipt = await StakingContract.methods.totalStakes().call({
        from : accounts[0]
    });
    dispatch(totalStakedValue(receipt))
    
}

//  CONNECT TO WALLET VALUE
export const getUserStakedValue = async(StakingContract,accounts,dispatch)=>{
    console.log("before transaction")
    const receipt = await StakingContract.methods.stakeOf(accounts[0]).call({
        from : accounts[0]
    });
    dispatch(userStakedValue(receipt))
    
}

//  CONNECT TO WALLET VALUE
export const getUserRewardValue = async(StakingContract,accounts,dispatch)=>{
    console.log("before transaction")
    const receipt = await StakingContract.methods.rewardOf(accounts[0]).call({
        from : accounts[0]
    });
    dispatch(userRewardValue(receipt))
    
}




// USER FUNCTIONS

export const doStaking = async(StakingContract,accounts,transaction,dispatch)=>{
    console.log("before transaction")
    const receipt = await StakingContract.methods.createStake(String(transaction.stake)).send({
        from : accounts[0]
    });
    console.log("Receipt = ",receipt)
}

export const removeStaking = async(StakingContract,accounts,dispatch)=>{
    console.log("before transaction")
    const receipt = await StakingContract.methods.removeStake().send({
        from : accounts[0]
    });
    console.log("Receipt = ",receipt)
}

export const withdrawRewards = async(StakingContract,accounts,dispatch)=>{
    console.log("before transaction")
    const receipt = await StakingContract.methods.withdrawReward().send({
        from : accounts[0]
    });
    
}

//  ADMIN FUNCTIONS 
export const DepositWethInAccount = async(WethContract,accounts,transaction,dispatch)=>{
    console.log("before transaction")
    const receipt = await WethContract.methods.deposit().send({
        from : accounts[0],
        value : web3.utils.toHex(web3.utils.toWei(String(transaction.value)))
    });
    console.log("Receipt = ",receipt)
}

export const DepositWethInContract = async(WethContract,accounts,transaction,dispatch)=>{
    console.log("before transaction")
    const receipt = await WethContract.methods.transfer(STAKING_ADDRESS,web3.utils.toHex(web3.utils.toWei(String(transaction.value)))).send({
        from : accounts[0],
    });
    console.log("Receipt = ",receipt)
}

export const minting = async(StakingContract,accounts,transaction,dispatch)=>{
    console.log("before transaction")
    const receipt = await StakingContract.methods.mintNewTokens(web3.utils.toHex(web3.utils.toWei(String(transaction.value)))).send({
        from : accounts[0]
    });
    console.log("Receipt = ",receipt)
}

export const distributeFunds = async(WethContract,StakingContract,accounts,dispatch)=>{
    console.log("before transaction")
    const balanceOfContract = await WethContract.methods.balanceOf(STAKING_ADDRESS).call({from: accounts[0]})
    const receipt = await StakingContract.methods.distributeRewards(String(balanceOfContract)).send({
        from : accounts[0]
    });
    console.log("Receipt = ",receipt)
}