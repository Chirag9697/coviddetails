import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  first: true,
  second: false,
  third: false,
};

export const StepperhandleSlice = createSlice({
  name: "stepperhandling",
  initialState,
  reducers: {
    firststepcompleted: (state) => {
      state.first = false;
      state.second = true;
    },
    secondstepcompleted: (state) => {
      state.second = false;
      state.third = true;
    },
    backfromsecondstep: (state) => {
      state.first = true;
      state.second = false;
    },
    backfromthirdstep: (state) => {
      state.second = true;
      state.third = false;
    },
    clearform:(state)=>{
      state.first = true;
      state.second = false;
      state.third = false;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  firststepcompleted,
  secondstepcompleted,
  backfromsecondstep,
  backfromthirdstep,
  clearform,
} = StepperhandleSlice.actions;

export default StepperhandleSlice.reducer;