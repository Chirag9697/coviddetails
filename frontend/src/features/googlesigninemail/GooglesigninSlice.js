import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

export const GooglesigninSlice = createSlice({
  name: 'googlesignin',
  initialState,
  reducers: { 
    setemailid: (state, action) => {
      state.value = action.payload
    },
    removeemailid:(state)=>{
        state.value='';
    }
  },
})

// Action creators are generated for each case reducer function
export const { setemailid,removeemailid } = GooglesigninSlice.actions

export default GooglesigninSlice.reducer