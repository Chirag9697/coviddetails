import React, { useEffect } from "react";
import Form from "./Form";
import FormB from "./FormB";
import FormC from "./FormC";
import StepA from "./StepA";
import StepB from "./StepB";
import StepC from "./StepC";
import { useDispatch, useSelector } from "react-redux";
import {
  firststepcompleted,
  secondstepcompleted,
} from "../../features/stepperhandling/StepperhandleSlice";
import { clearform } from "../../features/stepperhandling/Stepperhandledata";
export const MainForm = () => {
  const dispatch=useDispatch();
  const second = useSelector((state) => state.stepperhandling.second);
  const third = useSelector((state) => state.stepperhandling.third);
  // useEffect(()=>{
    // dispatch(clearform());
  // },[])
  return (
    <>
      
      {second && (
        <div>
          <StepB />
        </div>
      )}
      {third && (
        <div>
          <StepC />
        </div>
      )}
    </>
  );
};