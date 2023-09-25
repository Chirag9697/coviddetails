import React, { useEffect } from "react";
import { auth, provider } from "../../googlesignin/config";
import { signInWithPopup } from "firebase/auth";
import { Button } from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux";
import { setemailid } from "./GooglesigninSlice";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const Signup = () => {
  const value = useSelector((state) => state.signin.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendEmail = async () => {
    const userEmail = localStorage.getItem("email");
    try {
      const response = await axios.post("http://localhost:5000/register", {
        email: userEmail,
      });
      if (response) {
        console.log('Success');
        navigate("/signin"); // Navigate to the signin page after successful signup
      } else {
        console.log('Error');
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleclick = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        dispatch(setemailid(data.user.email));
        localStorage.setItem("email", data.user.email);
        sendEmail(); // Send the email to the backend
        navigate("/signin");
      })
      .catch((error) => {
        console.error("Error during sign-up:", error);
        if (error.response) {
          // Handle error response from the server
          console.error("Server responded with:", error.response.data);
        } else {
          // Handle other errors (e.g., network issues)
          console.error("Network error:", error.message);
        }
      });
  };

  return (
    <div>
      <p>{"Successfully signed up"}</p>
      <Button onClick={handleclick}>Sign up with Google</Button>
    </div>
  );
};