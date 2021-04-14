import React,{ useState } from 'react';
import { Route ,Routes} from 'react-router-dom';
import UserPanel from './Components/User/UserPanel';
import Login from './Components/Admin/Login';
import Dashboard from './Components/Admin/Dashboard'
import { useStore } from '../src/context/GlobalState'
import { isConnected } from './store/actions'
import { ContractWethbalance, AdminWethbalance, getTotalStakedValue, getUserStakedValue, getUserRewardValue, getSymbolOfToken, getBalanceOfToken} from '../src/store/asyncActions'
function App() {
  const [{WethContract,StakingContract,accounts}, dispatch] = useStore();
  const [connect, setConnect] = useState(false);
  const onConnect = async ()=>{

      try {
            await ContractWethbalance(WethContract, accounts, dispatch);
            await AdminWethbalance(StakingContract,WethContract, accounts, dispatch);
            await getTotalStakedValue(StakingContract, accounts, dispatch);
            await getUserStakedValue(StakingContract, accounts, dispatch);
            await getUserRewardValue(StakingContract, accounts, dispatch);
            await getSymbolOfToken(StakingContract, accounts, dispatch);
            await getBalanceOfToken(StakingContract, accounts, dispatch);
            setConnect(true)
            document.getElementById("aa").innerHTML = accounts[0]
            dispatch(isConnected(true))
        }catch (error){
          console.log("error trax = ",error);
        }
  }
  return (
    <div>
        <div style={{backgroundColor:"#3657d9", minHeight:"60px", maxHeight:"60px"}}>
          <div className="col text-center">
             {
               connect == true ? 
                  <div style={{color:'white',fontSize:'30px'}} > CONNECTED :  &nbsp;&nbsp; <span id="aa" style={{color:'white',fontSize:'30px'}}></span></div>:
                  <button type="button" class="btn btn-danger" style={{marginTop:"10px"}} onClick={onConnect}>Connect to Wallet</button>
             }
          </div>
       </div> 
      
      
       <Routes>
          <Route path='/' element={<UserPanel/>}></Route>
          <Route path='/admin' element={<Login/>}></Route>
          {
              <Route path='/admin/richie' element={<Dashboard/>}></Route>
          }
          
      </Routes>
    </div>
  );
}

export default App;
