import React,{useState} from 'react'
import { removeStaking, withdrawRewards } from '../../store/asyncActions'
import { useStore } from '../../context/GlobalState';
import Loader from '../../images/loader.gif'

function UserInfo(){
    const [isTransactionInProcess, setTransactionInprocess] = useState(false);
    const [isTransactionInProcess2, setTransactionInprocess2] = useState(false);
    const [isTransactionSuccessful , setTransactionSuccessful] = useState(false);
    const [transactionError , setTransactionError] = useState("");
    const [{StakingContract,accounts,userReward,userStaked,connected}, dispatch] = useStore();

    const onRemove = async (e)=>{
        e.preventDefault();
        try {
            setTransactionInprocess(true)
            await removeStaking(StakingContract, accounts, dispatch);
            setTransactionInprocess(false);
            setTransactionSuccessful(true);
            window.location.reload()

        }catch (error){
            console.log("error trax = ",error);
            setTransactionInprocess(false);
            setTransactionSuccessful(false);
            setTransactionError(error.message);
        }
    }

    const onWithdraw = async (e)=>{
        e.preventDefault();
        try {
            setTransactionInprocess2(true)
            await withdrawRewards(StakingContract, accounts, dispatch);
            setTransactionInprocess2(false);
            setTransactionSuccessful(true);
            window.location.reload()

        }catch (error){
            console.log("error trax = ",error);
            setTransactionInprocess2(false);
            setTransactionSuccessful(false);
            setTransactionError(error.message);
        }
    }    

    return(
        <div className="container">
            <div style={{color:'red',fontSize:'20px'}}>{transactionError != "" ? <div style={{color:"red"}}>Error :  Error in Transaction</div>:null}</div>
            <div style={{color:'green',fontSize:'20px'}}>{isTransactionSuccessful && <div style={{color:"green"}}>Transaction Succesful</div>}</div>
            <div className="row">
                
                <div className="col sm-4" style={{borderRight:"5px solid black"}}>
                    <h2 style={{color:'#3657d9'}}>
                        <b>TOTAL STAKED:</b>
                    </h2>
                    <h3>
                        {connected == true ? userStaked/Math.pow(10,18) : '-'}   
                    </h3>
                </div>
                <div className="col sm-4" style={{borderRight:"5px solid black"}}>
                    <h2 style={{color:'#3657d9'}}>
                        <b>REWARDS:</b>
                    </h2>    
                    <div className="row">
                        <div className="col sm-6">
                            <h3>{connected == true ? userReward/Math.pow(10,18) : '-'}</h3>
                        </div>
                        <div className="col sm-6">
                            <input type="submit" value="CLAIM" style={{backgroundColor:"#3657d9", color:"white", border:"0",
                                minWidth:"60%", maxWidth:"60%", height:"40px", fontWeight:"bold"}} onClick={onWithdraw}/>
                            {isTransactionInProcess2 && <img width="40px" src={Loader} alt="Loading..." />}    

                        </div>
                    </div>
                </div>
                <div className="col sm-4" style={{borderRight:"5px solid black"}}>
                    <h2 style={{color:'#3657d9'}}>
                        <b>UNSTAKE:</b>
                    </h2>
                    <center>
                        <input type="submit" value="WITHDRAW" style={{backgroundColor:"#3657d9", color:"white", border:"0",
                            minWidth:"60%", maxWidth:"60%", height:"40px", fontWeight:"bold"}} onClick={onRemove}/>
                        {isTransactionInProcess && <img width="40px" src={Loader} alt="Loading..." />}
                        
                   </center>
                </div>
            </div>

        </div>
    )
}
export default UserInfo;