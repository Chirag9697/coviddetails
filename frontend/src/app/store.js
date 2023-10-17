import { configureStore } from '@reduxjs/toolkit'
import stepperhandlerreducer from '../features/stepperHandling/stepperHandleSlice';
import stepperformdatahandling from '../features/stepperHandling/stepperHandleData'
import ProfileUpdateSlice from '../Pages/profileUpdate/profileUpdateSlice';
export const store = configureStore({
  reducer: {

    stepperhandling:stepperhandlerreducer,
    stepperformhander:stepperformdatahandling,
    profileupdate: ProfileUpdateSlice,

  },
})

