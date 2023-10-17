import React from "react";
import { auth, provider } from "../../googleSignIn/config";
import { signInWithPopup } from "firebase/auth";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import Google from "../../image/google.png"

import "./signIn.css";
import axios from "axios";
// signInWithPopup
export const Signin = () => {

  const navigate = useNavigate();
  const checkprofile=()=>{
    if(
    axios.get(`http://localhost:5000/get-profile/${localStorage.getItem("email")}`)
    .then((response)=>{

      if(response.data.profileDetail){
       
       
        localStorage.setItem("userid",response.data.profileDetail._id);
        return true;
      }
      
    })==true){
      return true;
    }
    return false;
  }

  const handleclick = () => {

    signInWithPopup(auth, provider).then((data) => {
      localStorage.setItem("email", data.user.email);
      const email = localStorage.getItem("email");
      const newData = {
        firstName: "",
        lastName: "",
        dob: "",
        address: "",
        phone: "",
        email,
      };
     
      const checkprof=checkprofile();
     
      
      if(checkprof==false){
       
        axios.post("http://localhost:5000/profile", newData)
        .then((response)=>{
    
          localStorage.setItem("userid",response.data._id);
        })
      }
      
      axios
      .post("http://127.0.0.1:5000/save-email", {
        email: data.user.email,
      })
        .then((response) => {
       
          
          navigate("/");
        })

        .catch((error) => {
          console.error("Error saving email:", error);
        });
    });
  };

  

  return (
    <div className="signinhome">
      <div className="App">
        <Typewriter
          options={{
            strings: [
              '<span style="font-size: 30px; color: yellow;">Welcome to Covid19 App</span>',
              '<span style="font-size: 30px; color: white;">To know the Health Status of Your family</span>',
            ],
            autoStart: true,
            loop: true, 
          }}
        />
      </div>

      {!localStorage.getItem("email") && (
        <Button
          onClick={handleclick}
          style={{ fontSize: "19px", borderStyle: "none", marginTop:"15px" }}
        >
          Sign in with google
          <img
            src={Google}
            style={{ height: "27px", marginLeft: "5px" }}
            alt=""
          />{" "}
        </Button>
      )}
    </div>
  );
};