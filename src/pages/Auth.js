import React, { useState } from 'react'
import API_ENDPOINTS from '../constants/endpoint';
import { extractIdFromToken } from '../constants/validation';

const Auth = () => {

 const [mode, setMode] = useState("login");//login or signup

 const [Email, setEmail] = useState("");
 const [userName, setUserName] = useState("");
 const [Password, setPassword] = useState("");
 const [responseMessage, setResponseMessage] = useState("");

 const handleSubmit = async (e) => {
    const apiUrl = mode==="login"?API_ENDPOINTS.LOG:API_ENDPOINTS.SIGN;

    let formData = {
      email: Email,
      password: Password,
    }
    if(mode==="signup"){
      formData.id= "";
      formData.userName= userName;
    }

    e.preventDefault();
    try {
      const response = await fetch(apiUrl, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(formData), 
      })

      ;

      const responseJson = await response.json();

      if (responseJson.token) {
        localStorage.removeItem("readerlyJWTstorageitem");
        localStorage.setItem("readerlyJWTstorageitem", responseJson.token);
        console.log(extractIdFromToken());
      }

      setResponseMessage(`Success`);

    } catch (err) {
      setResponseMessage(`Error`);
    }

  };

 const handleClear = () => {
    setEmail("");
    setPassword("");
 }

  return (
    <div>
        <div>
            <h2>{mode==="login"?"Login":"Register"}</h2>
            <input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
            {mode==="signup"?<input type="text" placeholder="User Name" onChange={(e)=>setUserName(e.target.value)}/>:''}
            <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div>
            <button onClick={handleSubmit}>{mode==="login"?"Login":"Signup"}</button>
            <button onClick={handleClear}>Clear</button>
            {mode==="login"?<p style={{cursor:'pointer'}} onClick={()=>setMode("signup")}>I have no account</p>:<p style={{cursor:'pointer'}} onClick={()=>setMode("login")}>I already have an account</p>}
        </div>
    </div>
  )
}

export default Auth