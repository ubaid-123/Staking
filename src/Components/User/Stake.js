import React, { useState } from 'react'
import Loader from '../../images/loader.gif';
import { doStaking } from '../../store/asyncActions'
import { useStore } from '../../context/GlobalState';
function Stake(){
    const [amount, setAmount] = useState(0)
    const [isTransactionInProcess, setTransactionInprocess] = useState(false);
    const [isTransactionSuccessful , setTransactionSuccessful] = useState(false);
    const [transactionError , setTransactionError] = useState("");
    const [{StakingContract,accounts,tokenSymbol,tokenBalance,connected}, dispatch] = useStore();

    const onStake = async (e)=>{
        e.preventDefault();
        try {
            setTransactionInprocess(true)
            const newTransaction = {
                stake : amount
            }
            await doStaking(StakingContract, accounts,newTransaction, dispatch);
            setTransactionInprocess(false);
            setTransactionSuccessful(true);
            document.getElementById('amountBox').value = ''
            window.location.reload()
        }catch (error){
            console.log("error trax = ",error);
            setTransactionInprocess(false);
            setTransactionSuccessful(false);
            setTransactionError(error.message);
        }
    }
    return(
        <div>
            
            <label style={{marginLeft:'50%'}}>Balance: <span>{connected == true ? tokenBalance/Math.pow(10,18)  : '-'}&nbsp;{connected == true ? tokenSymbol  : '-'}</span></label>
            <br/>
            <input type="number" className="form-control" name="value" placeholder="Enter Amount" 
                onChange={(e)=>{setAmount(e.target.value)}} id="amountBox"/>
            <br/><br/>
            <button type="button" className="btn btn-lg" style={{width: '250px',backgroundColor:'#3657d9', color:'white'}}
                onClick={onStake}>Stake</button>
                {isTransactionInProcess && <img width="40px" src={Loader} alt="Loading..." />}    
                {transactionError != "" ?<div style={{color:"red"}}>Error in Transaction</div>:null}
                <div style={{color:'green',fontSize:'20px'}}>{isTransactionSuccessful == true ? <div style={{color:"green"}}>Transaction Succesful</div>:null}</div>

        </div>

    )
}
export default Stake;