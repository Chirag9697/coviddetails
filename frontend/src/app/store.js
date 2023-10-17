import { configureStore } from '@reduxjs/toolkit'
import stepperhandlerreducer from '../features/stepperhandling/StepperhandleSlice';
import stepperformdatahandling from '../features/stepperhandling/Stepperhandledata'
import ProfileUpdateSlice from '../Pages/ProfileUpdate/ProfileUpdateSlice';
export const store = configureStore({
  reducer: {

    stepperhandling:stepperhandlerreducer,
    stepperformhander:stepperformdatahandling,
    profileupdate: ProfileUpdateSlice,

  },
})

