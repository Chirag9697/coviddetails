import React, { useEffect } from "react";

import StepcUpdate from "./stepcUpdate";
import axios from "axios";
import StepBupdate from "./stepbUpdate";
import { useDispatch, useSelector } from "react-redux";
import {
  
  updateformcompleted,
} from "../../features/stepperHandling/stepperHandleData";
import { useParams } from "react-router-dom";




export const MainFormUpdate = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const first = useSelector((state) => state.stepperhandling.first);
  const second = useSelector((state) => state.stepperhandling.second);
  const third = useSelector((state) => state.stepperhandling.third);

  useEffect(()=>{
    const alldata = async()=>{
     
        const email = localStorage.getItem("email");
        try {
          const details = await axios.get(
            `http://localhost:5000/families1/${id}`
          );
          if (details) {
            const newdata=details.data.allfamily1;
            dispatch(updateformcompleted({...newdata,...newdata.members[0]}))
            
          }
        } catch (err) {
          console.log(err);
        }
      };
  },[])
  

  return (
    <>
    
      {second && (
        <div>
          <StepBupdate />
        </div>
      )}
      {third && (
        <div>
          <StepcUpdate />
        </div>
      )}
    </>
  );
};