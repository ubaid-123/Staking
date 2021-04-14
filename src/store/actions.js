export const adminBalance = (transaction)=> {
    return {
        type: 'ADMIN_WETH_BALANCE',
        payload: transaction
    };
}

export const contractbalance = (transaction)=> {
    return {
        type: 'CONTRACT_WETH_BALANCE',
        payload: transaction
    };
}

export const totalStakedValue = (transaction)=> {
    return {
        type: 'TOTAL_STAKED_vALUE',
        payload: transaction
    };
}

export const userStakedValue = (transaction)=> {
    return {
        type: 'USER_STAKED_vALUE',
        payload: transaction
    };
}

export const userRewardValue = (transaction)=> {
    return {
        type: 'USER_REWARD_vALUE',
        payload: transaction
    };
}

export const isConnected = (transaction)=> {
    return {
        type: 'IS_CONNECTED',
        payload: transaction
    };
}

export const getTokenSymbol = (transaction)=> {
    return {
        type: 'GET_TOKEN_SYMBOL',
        payload: transaction
    };
}

export const getTokenBalance = (transaction)=> {
    return {
        type: 'GET_TOKEN_BALANCE',
        payload: transaction
    };
}

export const setupWeb3 = (web3) => {
    return {
        type: 'SETUP_WEB3',
        payload: web3
    };
}

export const setupStakingContract = (contract) => {
    return {
        type: 'SETUP_STAKING_CONTRACT',
        payload: contract
    };
}

export const setupWethContract = (contract) => {
    return {
        type: 'SETUP_WETH_CONTRACT',
        payload: contract
    };
}
export const addEthereumAccounts = (accounts) => {
    return {
        type: 'ADD_ETHEREUM_ACCOUNTS',
        payload: accounts
    };
}

export const web3LoadingError = (errorMessage) => {
    return {
        type: 'WEB3_LOADING_ERROR',
        errorMessage: errorMessage
    };
}