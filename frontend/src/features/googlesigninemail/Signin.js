import React, { useState } from "react";
import { useEffect } from "react";
import { auth, provider } from "../../googlesignin/config";
import { signInWithPopup } from "firebase/auth";
import { Button, ButtonGroup } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import machine from "./Signinmachine";//ok

import Typewriter from "typewriter-effect";
import Google from "../../image/google.png";
import { useMachine } from "@xstate/react";
import "./Signin.css";
import axios from "axios";
import { interpret } from "xstate";
import { useNavigate } from "react-router-dom";
// import
//a
// signInWithPopup
export const Signin = () => {
  // const signinmachine=interpret(machine).start();
  const navigate = useNavigate();
  const [state, send] = useMachine(machine);
  // const service=interpret(machine).start();
  //bbbb
  const handleclick = () => {
    signInWithPopup(auth, provider).then((data) => {
      localStorage.setItem("email", data.user.email);
      //   const email = localStorage.getItem("email");
      // signinmachine.send({type:"signin"});
      send({ type: "Submit", email: localStorage.getItem("email") });
      // if(state.matches("signedin")===true){
      // navigate('/');
      // }
      // else{
          // return;
          // }
        });
        
    };
    const clicklogout = () => {
        send({ type: "logout" });
        console.log("logout");
    };
    // useEffect(() => {
        //   dispatch(setemailid(localStorage.getItem("email")));
        // });
        useEffect(() => {
            
            console.log(state.context);
            if(state.matches('signedin')===true){

                navigate('/');
                return;
            }
            if(state.matches('signin')===true){
                navigate('/signin');
                return;
            }
            

        }, [state]);
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
      {!state.matches("signedin") ? (
        <Button
          onClick={handleclick}
          style={{ fontSize: "19px", borderStyle: "none", cursor: "pointer" }}
        >
          Sign in with google
          {/* {state.context} */}
          <img
            src={Google}
            style={{ height: "27px", marginLeft: "5px" }}
            alt=""
          />{" "}
        </Button>
      ) : (
        <button onClick={clicklogout}>logout</button>
      )}
    </div>
  );
};
 export default Signin