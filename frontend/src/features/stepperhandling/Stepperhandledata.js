import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullname: "",
  group: "",
  address: "",
  phone: "",
  gender: "",
  dob: "",
  email: "",
  covidstatus: "",
 
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
      state.fullname = action.payload.fullname;
      state.group = action.payload.group;
      state.address = action.payload.address;
      state.phone = action.payload.phone;
      state.gender = action.payload.gender;
      state.dob = action.payload.dob;
      state.email = action.payload.email;
    },
    updateformcompleted:(state,action)=>{
      state.fullname = action.payload.fullName;
      state.group = action.payload.groupName;
      state.address = action.payload.address;
      state.phone = action.payload.phone;
      state.gender = action.payload.gender;
      state.dob = action.payload.dob;
      state.email = action.payload.email;
      state.covidstatus = action.payload.covidStatus;
      state.vaccineStatus = action.payload.vaccineStatus;
      
    }
  
  },
});

// Action creators are generated for each case reducer function
export const { firststepformcompleted, secondstepformcompleted, updateformcompleted} =
  StepperhandleData.actions;

export default StepperhandleData.reducer;
