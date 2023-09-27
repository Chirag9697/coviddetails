import { configureStore } from '@reduxjs/toolkit'
import googlesigninreducer from '../features/googlesigninemail/GooglesigninSlice'
import stepperhandlerreducer from '../features/stepperhandling/StepperhandleSlice';
import stepperdatahandling from '../features/stepperhandling/StepperDataHandle'
export const store = configureStore({
  reducer: {
    signin:googlesigninreducer,
    stepperhandling:stepperhandlerreducer,
    stepperdatahandling:stepperdatahandling,
  },
})

