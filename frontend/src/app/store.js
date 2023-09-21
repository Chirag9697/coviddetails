import { configureStore } from '@reduxjs/toolkit'
import googlesigninreducer from '../features/googlesigninemail/GooglesigninSlice'
export const store = configureStore({
  reducer: {
    signin:googlesigninreducer
  },
})

