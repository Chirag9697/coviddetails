import { Box, Steps, StepSeparator, Stepper, Step } from "@chakra-ui/react";
import "./App.css";
import Form from "./Pages/Form";
import FormB from "./Pages/FormB";
import FormC from "./Pages/FormC";
import StepA from "./Pages/StepA";
import StepB from "./Pages/StepB";
import StepC from "./Pages/StepC";
import { MainForm } from "./Pages/MainForm";
import setAction from "./Pages/action";
import SetAction from "./Pages/action";

function App() {
  return (
    <div>
      <MainForm />
    </div>
  );
}

export default App;
