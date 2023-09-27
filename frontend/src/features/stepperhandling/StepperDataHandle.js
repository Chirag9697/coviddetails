import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstname: "",
  lastname: "",
  address: "",
  phone: "",
  gender: "",
  dob: "",
  email: "",
  
};

export const StepperhandleData = createSlice({
  name: "stepperdatahandling",
  initialState,
  reducers: {
    firststepformcompleted: (state, action) => {
      console.log("dataofindividual", action.payload);
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.address = action.payload.address;
      state.phone = action.payload.phone;
      state.gender = action.payload.gender;
      state.dob = action.payload.dob;
      state.email = action.payload.email;
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { firststepformcompleted } =
  StepperhandleData.actions;

export default StepperhandleData.reducer;