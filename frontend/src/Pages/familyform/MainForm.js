import React from "react";
import { useSelector } from "react-redux";
import StepB from "./StepB";
import StepC from "./StepC";
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