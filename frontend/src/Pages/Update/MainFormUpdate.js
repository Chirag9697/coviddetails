import React, { useEffect } from "react";
import FormUpdate from "./FormUpdate";
import FormbUpdate from "./FormbUpdate";
import FormcUpdate from "./FormcUpdate";
import StepA from "../../Pages/familyform/StepA";
import StepB from "../../Pages/familyform/StepB";
import StepcUpdate from "../../Pages/Update/StepcUpdate";
import axios from "axios";
import StepBupdate from "./StepBupdate";
import { useDispatch, useSelector } from "react-redux";
import {
  secondstepformcompleted,
  updateformcompleted,
} from "../../features/stepperhandling/Stepperhandledata";
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
            console.log("Hyaa",details);
            const newdata=details.data.allfamily1;
            // const memberdata={...newdata.members[0]};
            dispatch(updateformcompleted({...newdata,...newdata.members[0]}))
            // console.log("data",details.data.allfamily1);
          }
        } catch (err) {
          console.log(err);
        }
      };
    // alldata()
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