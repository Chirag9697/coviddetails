import React, { useState } from "react";
import { useEffect } from "react";
import { auth, provider } from "../../googlesignin/config";
import { signInWithPopup } from "firebase/auth";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux";
import { removeemailid, setemailid } from "./GooglesigninSlice";

// signInWithPopup
export const Signin = () => {
  const value=useSelector((state)=>state.signin.value);
  const dispatch=useDispatch();

  const handleclick = () => {
    signInWithPopup(auth, provider).then((data) => {
      dispatch(setemailid(data.user.email))
      localStorage.setItem("email", data.user.email);
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
    <div>
      <p>{ "welcome to covid app"}</p>
      {!value && <Button onClick={handleclick}>Sign in with google</Button>}
      {value ? <Button colorScheme='blue' onClick={clicklogout}>Logout</Button> : ""}
      
    </div>
  );
};
