import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  first: true,
  second:false,
  third:false
}

export const StepperhandleSlice = createSlice({
  name: 'stepperhandling',
  initialState,
  reducers: { 
    firststepcompleted: (state) => {
      state.first = false;
      state.second=true;
    },
    secondstepcompleted:(state)=>{
        state.second=false;
        state.third=true;
    }
  },
})

// Action creators are generated for each case reducer function
export const { firststepcompleted,secondstepcompleted } = StepperhandleSlice.actions

export default StepperhandleSlice.reducer