import React from 'react';
import Stake from './Stake'
import { Route ,Routes, Link} from 'react-router-dom';
import UserInfo from './UserInfo';


function UserPanel(){
    return(
        <div>
            <center className="container">
                <div style={{border:'5px solid black', marginTop: '100px'}} className="col-sm-5 flex-container">
                    <form  style={{marginBottom: '50px', marginTop:"50px"}}>
                        <div>
                            <Link to="#" style={{maxWidth:'95%', minWidth:'95%', backgroundColor:'#3657d9', color:'white'}}  className="btn btn-lg">
                                Stake Your Tokens
                            </Link>
                        </div>
                        <br/><br/>
                        
                        <Routes>
                            <Route path='/' element={<Stake/>}></Route>
                        </Routes>

                    </form>
                </div>
            </center>
            <br/><br/><br/>

            <UserInfo/>
        </div>
    )
}
export default UserPanel;