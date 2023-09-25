import { StepSeparator } from "@chakra-ui/react";
import "./App.css";
import Form from "./Pages/Form";
import FormB from "./Pages/FormB";
import FormC from "./Pages/FormC";
import StepA from "./Pages/StepA";
import StepB from "./Pages/StepB";
import StepC from "./Pages/StepC";

function App() {
  return (
    <div className="App">
      <StepSeparator>
        <StepA />
        <br />
        <Form />
        {/* <StepB />
        <FormB /> */}
      </StepSeparator>
    </div>
  );
}

export default App;
