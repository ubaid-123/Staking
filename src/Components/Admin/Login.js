import React, { useState } from 'react'

function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(
            username == "admin" &&
            password == "richie"
        ){
        
            window.location.href = "/admin/richie"                
            window.localStorage.setItem(username,password)
        }else{
            alert("You have passed wrong Username or Password.")
        }
    }
    return(
        <div className="container">
            <br/><br/><br/><br/>
            <div className="row" >
                
                <div className="col-md-6 mx-auto" style={{  padding: '5%',  boxShadow: '0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19)',textAlign: 'center',color: '#333'}}>
                  
                    <h1 style={{color:'#3657d9', fontWeight:'bold'}}>ADMIN LOGIN</h1>
                    <br></br>
                    
                    <form onSubmit={handleSubmit}>
                  
                        <div className="input-group form-group">
                        <div className="input-group-prepend">
							<span className="input-group-text" style={{backgroundColor:'#3657d9'}}><i className="fas fa-user" style={{color:'white'}}></i></span>
						</div>
                            <input type="text" className="form-control" placeholder="User Name" style={{height:'50px'}} onChange={(e)=>setUsername(e.target.value)} />
                        </div>
                        <br></br>
                        <div className="input-group form-group">
                        <div className="input-group-prepend" >
							<span className="input-group-text" style={{backgroundColor:'#3657d9'}}><i className="fas fa-key"  style={{color:'white'}} ></i></span>
						</div>
                            <input type="password" className="form-control" placeholder="Password" style={{height:'50px'}}  onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                        <br></br>
                        <div className="input-group form-group">
                       
                            <button type="submit" style={{width: '550px',height:'50px',borderRadius: '1rem',padding: '1.5%', border: 'none',  cursor:'pointer',fontWeight: 'bold',  color: 'white',backgroundColor: '#3657d9'}} onSubmit={handleSubmit}  ><i class="fas fa-sign-in-alt"></i>     LOGIN</button>  
                                  
                        </div>
                        
                        </form>
                </div>
                </div>
        </div>
        
    )
}
export default Login;