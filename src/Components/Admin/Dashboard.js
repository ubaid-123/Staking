import React, { useState } from 'react'
import Loader from '../../images/loader.gif';
import { useStore } from '../../context/GlobalState';
import Page404 from '../Admin/Page404'
import { DepositWethInContract, DepositWethInAccount, minting, distributeFunds} from '../../store/asyncActions'
function Dashboard(){
    const [{StakingContract,WethContract, accounts, adminWethBal, contractWethBal, totalStaked, connected}, dispatch] = useStore();
    const [isTransactionInProcess1, setTransactionInprocess1] = useState(false);
    const [isTransactionInProcess2, setTransactionInprocess2] = useState(false);
    const [isTransactionInProcess3, setTransactionInprocess3] = useState(false);
    const [isTransactionInProcess4, setTransactionInprocess4] = useState(false);
    const [contractDeposit, setContractDeposit] = useState(0)
    const [isTransactionSuccessful , setTransactionSuccessful] = useState(false);
    const [transactionError , setTransactionError] = useState("");
    const [accountDeposit, setAccountDeposit] = useState(0)
    const [mintValue, setMintValue] = useState(0)

    
    const onDistribute = async (e)=>{
        e.preventDefault();
        try {
            setTransactionInprocess4(true)
            await distributeFunds(WethContract,StakingContract, accounts, dispatch);
            setTransactionInprocess4(false);
            setTransactionSuccessful(true);
            window.location.reload()
            
        }catch (error){
            console.log("error trax = ",error);
            setTransactionInprocess4(false);
            setTransactionSuccessful(false);
            setTransactionError(error.message);
        }
    }

    const onMint = async (e)=>{
        e.preventDefault();
        try {
            setTransactionInprocess1(true)
            const newTransaction = {
                value : mintValue
            }
            await minting(StakingContract, accounts,newTransaction, dispatch);
            setTransactionInprocess1(false);
            setTransactionSuccessful(true);
            document.getElementById('mintBox').value = ''
            window.location.reload()

        }catch (error){
            console.log("error trax = ",error);
            setTransactionInprocess1(false);
            setTransactionSuccessful(false);
            setTransactionError(error.message);
        }
    }
    const onAccountDeposit = async (e) =>{
        e.preventDefault();
        try {
            setTransactionInprocess2(true)
            const newTransaction = {
                value : accountDeposit
            }
            await DepositWethInAccount(WethContract, accounts,newTransaction, dispatch);
            setTransactionInprocess2(false);
            setTransactionSuccessful(true);
            document.getElementById('depositBox1').value = ''
            window.location.reload()

        }catch (error){
            console.log("error trax = ",error);
            setTransactionInprocess2(false);
            setTransactionSuccessful(false);
            setTransactionError(error.message);
        }
    }

    const onContractDeposit = async (e) =>{
        e.preventDefault();
        try {
            setTransactionInprocess3(true)
            const newTransaction = {
                value : contractDeposit
            }
            await DepositWethInContract(WethContract, accounts,newTransaction, dispatch);
            setTransactionInprocess3(false);
            setTransactionSuccessful(true);
            document.getElementById('depositBox').value = ''
            window.location.reload()

        }catch (error){
            console.log("error trax = ",error);
            setTransactionInprocess3(false);
            setTransactionSuccessful(false);
            setTransactionError(error.message);
        }
    } 
    return(
        <div>
        {

            (window.localStorage.getItem("admin")=="richie") ?

        (
        <div>
            <br/>
            <center>
                <h1 style={{textDecoration:'underline', fontWeight:'bold'}}>
                    ADMIN DASHBOARD
                   
                </h1>
                <br/>
                <div>
                    {transactionError != "" ?<div style={{color:"red"}}>Error in Transaction</div>:null}
                    <div style={{color:'green',fontSize:'20px'}}>{isTransactionSuccessful == true ? <div style={{color:"green"}}>Transaction Succesful</div>:null}</div>
                </div>
            </center>
            <br/><br/>
           

            <div className="container">
                <div className="row">
                    <div className="col sm-4" style={{borderRight:"5px solid black"}}>
                        <h2 style={{color:'#3657d9'}}>
                            <b>TOTAL STAKED VALUE:</b>
                        </h2>
                        <h3>
                            {connected == true ? totalStaked/Math.pow(10,18) : '-'}
                        </h3>
                    </div>
                    <div className="col sm-4" style={{borderRight:"5px solid black"}}>
                        <h2 style={{color:'#3657d9'}}>
                            <b>CONTRACT BALANCE:</b>
                        </h2>    
                        <h3>
                            {connected == true ? contractWethBal : '-'}     
                        </h3>
                    </div>
                    <div className="col sm-4" style={{borderRight:"5px solid black"}}>
                        <h2 style={{color:'#3657d9'}}>
                            <b>BALANCE:</b>
                        </h2>
                        <h3>
                            {connected == true ? adminWethBal : '-'}
                        </h3>
                    </div>
                </div>
            </div>

            



            <br/>
            <form style={{padding:'2%'}}>
                <h3>
                    Mint New Tokens:     
                </h3>
                <div className="input-group form-group">
                    <input type="number" placeholder="Number of Tokens" className="form-control" style={{minWidth:'30%',maxWidth:'30%', border:'2px solid black'}}
                        onChange={(e)=>{setMintValue(e.target.value)}} id="mintBox"/>
                    <input type="submit" value="MINT" style={{backgroundColor:"#3657d9", color:"white", border:"0",
                        minWidth:"10%", maxWidth:"10%", height:"40px", fontWeight:"bold", marginLeft:'1%'}} onClick={onMint}/>    
                    {isTransactionInProcess1 && <img width="40px" src={Loader} alt="Loading..." />}    

                </div>
                    
            </form>
            <br/>    
            
            <form style={{padding:'2%'}}>
                <h3>
                    Deposit WETH in Account:     
                </h3>
                <div className="input-group form-group">
                    <input type="number" placeholder="Number of WETH" className="form-control" style={{minWidth:'30%',maxWidth:'30%', border:'2px solid black'}}
                        onChange={(e)=>{setAccountDeposit(e.target.value)}} id="depositBox1"/>
                    <input type="submit" value="DEPOSIT" style={{backgroundColor:"#3657d9", color:"white", border:"0",
                        minWidth:"10%", maxWidth:"10%", height:"40px", fontWeight:"bold", marginLeft:'1%'}} onClick={onAccountDeposit}/>
                    {isTransactionInProcess2 && <img width="40px" src={Loader} alt="Loading..." />}    
                </div>
                    
            </form>
            <br/>
            
            <form style={{padding:'2%'}}>
                <h3>
                    Deposit WETH in Contract:     
                </h3>
                <div className="input-group form-group">
                    <input type="number" placeholder="Number of WETH" className="form-control" style={{minWidth:'30%',maxWidth:'30%', border:'2px solid black'}}
                        onChange={(e)=>{setContractDeposit(e.target.value)}} id="depositBox"/>
                    <input type="submit" value="DEPOSIT" style={{backgroundColor:"#3657d9", color:"white", border:"0",
                        minWidth:"10%", maxWidth:"10%", height:"40px", fontWeight:"bold", marginLeft:'1%'}} onClick={onContractDeposit}/>
                    {isTransactionInProcess3 && <img width="40px" src={Loader} alt="Loading..." />}    
                </div>
                    
            </form>
            <br/>
            <div style={{padding:'2%'}}>
                <h5>
                    <span style={{color:'#3657d9', fontWeight:'bold'}}>Note:</span> You Need to click the Distribute Button to Show the Rewards in the User Panel
                    <span>
                        <input type="submit" value="DISTRIBUTE" style={{backgroundColor:"#3657d9", color:"white", border:"0",
                            minWidth:"10%", maxWidth:"10%", height:"40px", fontWeight:"bold", marginLeft:'1%'}}
                            onClick={onDistribute}/>
                        {isTransactionInProcess4 && <img width="40px" src={Loader} alt="Loading..." />}    
                    </span>
                </h5>
                  
            </div>
            <br/>
            <center>
                <input type="submit" value="LOGOUT" style={{backgroundColor:"#3657d9", color:"white", border:"0",
                    minWidth:"10%", maxWidth:"10%", height:"60px", fontWeight:"bold", fontSize:'25px',marginLeft:'1%'}}
                    onClick={()=>{
                                    window.localStorage.removeItem("admin")
                                    window.location.href = "/"
                    }}/>
            </center><br/>    
        </div>
        ):<Page404/>
    }
    </div>
    )
}
export default Dashboard;