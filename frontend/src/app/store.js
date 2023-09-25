import { configureStore } from '@reduxjs/toolkit'
import googlesigninreducer from '../features/googlesigninemail/GooglesigninSlice'
import stepperhandlerreducer from '../features/stepperhandling/StepperhandleSlice';
import stepperformdatahandling from '../features/stepperhandling/Stepperhandledata'
export const store = configureStore({
  reducer: {
    signin:googlesigninreducer,
    stepperhandling:stepperhandlerreducer,
    stepperformhander:stepperformdatahandling,

  },
})

