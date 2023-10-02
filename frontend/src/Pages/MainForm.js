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
  const first = useSelector((state) => state.stepperhandling.first);
  const second = useSelector((state) => state.stepperhandling.second);
  const third = useSelector((state) => state.stepperhandling.third);
  const fourth = useSelector((state) => state.stepperhandling.fourth);
  return (
    <>
      {first && (
        <div>
          <StepA />
        </div>
      )}
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
      {fourth && <div>Thanks for Submitting</div>}
    </>
  );
};