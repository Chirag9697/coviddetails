import React, { useState } from "react";
import { useEffect } from "react";
import { auth, provider } from "../../googlesignin/config";
import { signInWithPopup } from "firebase/auth";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeemailid, setemailid } from "./GooglesigninSlice";
import Typewriter from "typewriter-effect";
import Google from "../../image/google.png"

import "./Signin.css"
import axios from 'axios'
// signInWithPopup
export const Signin = () => {
  const handleType = (count) => {
    // Access the word count number
    console.log(count);
  };

  const handleDone = () => {
    console.log('Done after 5 loops!');
  };
  const value=useSelector((state)=>state.signin.value);
  const dispatch=useDispatch();
  const navigate = useNavigate();
  

  const handleclick = () => {
    signInWithPopup(auth, provider).then((data) => {
      dispatch(setemailid(data.user.email));
      localStorage.setItem("email", data.user.email);
  
      // Send the email to the backend API
      axios.post("http://127.0.0.1:5000/save-email", {
        email: data.user.email,
      })
      .then((response) => {
        console.log(response);
        navigate("/display");
      })
      
      .catch((error) => {
        console.error('Error saving email:', error);
      });
    });
  };

  const clicklogout = () => {
    console.log("logout");
    dispatch(removeemailid());
    localStorage.removeItem("email");
    // localStorage.removeItem("email");
    // setValue("");
  };
  useEffect(() => {
    dispatch(setemailid(localStorage.getItem("email")));
  });
  return (
    <div className="signinhome">
      <div className="App">
            <Typewriter
 
              options={{
                strings: [
                  '<span style="font-size: 40px; color: yellow;">Welcome to Covid19 App</span>',
                  '<span style="font-size: 25px; color: white;">To know the Health Status of Your family</span>',
                ],
                autoStart: true,
                loop: true, // Set loop to true to make it loop
}}
            />
        </div>
       
      
      {!value && <Button onClick={handleclick} style={{fontSize: "19px", borderStyle:"none"}}>Sign in with google 
      <img src={Google} style={{height:"27px", marginLeft: "5px"}} alt="" /> </Button>}
     
      
    </div>
  );
};