import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstname: "",
  lastname: "",
  address: "",
  phone: "",
  gender: "",
  dob: "",
  email: "",
  firstname1: "",
  lastname1: "",
  address1: "",
  phone1: "",
  gender1: "",
  dob1: "",
  email1: "",
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
    secondstepformcompleted: (state, action) => {
      console.log("dataoffamilydetails", action.payload);
      state.firstname1 = action.payload.firstname1;
      state.lastname1 = action.payload.lastname1;
      state.address1 = action.payload.address1;
      state.phone1 = action.payload.phone1;
      state.gender1 = action.payload.gender1;
      state.dob1 = action.payload.dob1;
      state.email1 = action.payload.email1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { firststepformcompleted, secondstepformcompleted } =
  StepperhandleData.actions;

export default StepperhandleData.reducer;
