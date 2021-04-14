import React, { useEffect,createContext, useReducer, useContext } from 'react';
import AppReducer from '../store/AppReducer';

import { loadBlockchain } from '../store/asyncActions';
// Initial state
const initialState = {
  transactions: [],
  web3: null,
  accounts: [],
  WethContract: null,
  StakingContract: null,
  web3LoadingErrorMessage:"",
  web3Loadded: false,
  adminWethBal : 0,
  contractWethBal : 0,
  totalStaked : 0,
  userStaked : 0,
  userReward : 0,
  connected : false,
  tokenSymbol : "",
  tokenBalance : 0 
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    useEffect(()=> {
        loadBlockchain(dispatch);
    },[])    
    

    return (<GlobalContext.Provider value={[state,dispatch]}>
                {children}
            </GlobalContext.Provider>);
}

export const useStore = () => useContext(GlobalContext);