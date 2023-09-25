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
  const first = useSelector((state) => state.steppethandling.first);
  const second = useSelector((state) => state.steppethandling.second);
  const third = useSelector((state) => state.steppethandling.third);

  return (
    <>
      {first && (
        <div>
          <StepA />
          <Form />
        </div>
      )}
      {second && (
        <div>
          <StepB />
          <FormB />
        </div>
      )}
      {third && (
        <div>
          <StepC />
          <FormC />
        </div>
      )}
      
    </>
  );
};
