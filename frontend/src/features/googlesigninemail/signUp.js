import React,{useState} from 'react'
// import Logo from "../img/logo.png"
import "./signUp.css"
import { Link, useNavigate } from 'react-router-dom'
import {toast } from 'react-toastify';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate()
  const[fullName,setFullName] = useState("")
  const[lastName,setLastName] = useState("") 
  const[address,setAddress] = useState("")
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const[phone,setPhone] = useState("")
  //Toast Functions
  const notifyA = (msg)=>toast.error(msg)
  const notifyB = (msg)=>toast.success(msg)

  const postData = ()=>{
   //sending data to server
   fetch("http://localhost:5000/signup",{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      fullName:fullName,
      lastName:lastName,
      address:address,
      email:email,
      password:password,
      phone: phone
    })
   }).then(res=>res.json())
   .then(data=>{
    if(data.error){
      notifyA(data.error)
    }else{
      notifyB(data.message)
      navigate('/signin')
    }
    
    console.log(data)})
  }

  

  return (
    <div className='signUp'>
      <div className='form-container'>
        <div className='form'>
        <p className='loginPara'>
            Sign Up to see photos and videos <br/> from your friends
        </p>
        
        <div>
           <input type="text" name="fullName" id="fullName" placeholder='Full Name'  value={fullName} onChange={(e)=>{setFullName
            (e.target.value)}}/>
        </div>
        <div>
           <input type="text" name="lastName" id="lastName" placeholder='Last Name'  value={lastName} onChange={(e)=>{setLastName
            (e.target.value)}}/>
        </div>
        <div>
           <input type="text" name="address" id="address" placeholder='address' value={address} onChange={(e)=>{setAddress
            (e.target.value)}}/>
        </div>
        <div>
           <input type="email" name="email" id="email" placeholder='email' value={email} onChange={(e)=>{setEmail
            (e.target.value)}}/>
        </div>
        <div>
           <input type="password" name="password" id="password" placeholder='Password'  value={password} onChange={(e)=>{setPassword
            (e.target.value)}}/>
        </div>
        <div>
           <input type="phone" name="phone" id="phone" placeholder='Phone'  value={phone} onChange={(e)=>{setPhone
            (e.target.value)}}/>
        </div>
        <p className='loginPara' style={{fontSize:"12px",
    margin:"3px 0px"}}>
            By signing up, you agree our terms <br/> privacy
            policy and cookies policy.
        </p>
        <input type="submit" id='submit-btn' value="Sign Up" 
          onClick={()=>{
            postData();
           
          }}/>
        </div>
        <div className='form2'>
            Already have an account ?
            <Link to="/signin">
            <span style={{color:"blue", cursor:"pointer"}}> Sign In</span>
            </Link> 
        </div>
      </div>
    </div>
  )
}

export default SignUp