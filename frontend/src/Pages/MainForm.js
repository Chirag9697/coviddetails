import React from "react";
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
} from "../features/stepperhandling/StepperhandleSlice";

export const MainForm = () => {
  
  const second = useSelector((state) => state.stepperhandling.second);
  const third = useSelector((state) => state.stepperhandling.third);

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