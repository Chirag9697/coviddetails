<<<<<<< HEAD
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
      {/* <StepA />
      <br />
      <Form /> */}
      <StepC />
      <FormC />
    </div>
=======
import logo from './logo.svg';
import './App.css';
import { Signin } from './features/googlesigninemail/Signin';
function App() {
  return (
    <>
      <Signin/>
      {/* helo */}
    </>
>>>>>>> d31e05c1aaf974c087ecba3f6a703f7656d0154a
  );
}

export default App;
