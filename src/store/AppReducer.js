export default (state, action) => {
    switch(action.type) {
      
      
      case 'ADMIN_WETH_BALANCE':
        return {
          ...state,
          adminWethBal: action.payload
        }

      case 'CONTRACT_WETH_BALANCE':
        return {
          ...state,
          contractWethBal: action.payload
      }

      case 'TOTAL_STAKED_vALUE':
        return {
          ...state,
          totalStaked: action.payload
      }

      case 'USER_STAKED_vALUE':
        return {
          ...state,
          userStaked: action.payload
      }

      case 'USER_REWARD_vALUE':
        return {
          ...state,
          userReward: action.payload
      }

      case 'IS_CONNECTED':
        return {
          ...state,
          connected: action.payload
      }

      case 'GET_TOKEN_SYMBOL':
        return {
          ...state,
          tokenSymbol: action.payload
      }

      case 'GET_TOKEN_BALANCE':
        return {
          ...state,
          tokenBalance: action.payload
      }

      case 'SETUP_WEB3':
        return {
          ...state,
          web3: action.payload,
          web3LoadingErrorMessage: "",
          web3Loadded: true
        }
      case 'SETUP_STAKING_CONTRACT':
        return {
          ...state,
          StakingContract: action.payload
        }

        case 'SETUP_WETH_CONTRACT':
        return {
          ...state,
          WethContract: action.payload
        }

      case 'ADD_ETHEREUM_ACCOUNTS':
        return {
          ...state,
          accounts: action.payload
        }
      case 'WEB3_LOADING_ERROR':
        return {
          ...state,
          web3LoadingErrorMessage: action.errorMessage,
          web3Loadded: false
        }
      default:
        return state;
    }
  }