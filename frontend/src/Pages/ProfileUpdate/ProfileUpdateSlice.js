import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  address: "",
  phone: "",
  gender: "",
  dob: "",

  
 
};

export const ProfileUpdateSlice = createSlice({
  name: "profileupdatehandler",
  initialState,
  reducers: {
   
    updateProfile:(state,action)=>{
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.address = action.payload.address;
      state.phone = action.payload.phone;
      state.gender = action.payload.gender;
      state.dob = action.payload.dob;
      
      
    }
   
  
  },
});

// Action creators are generated for each case reducer function
export const {updateProfile} = ProfileUpdateSlice.actions;

export default ProfileUpdateSlice.reducer;
