import logo from "./logo.svg";
import "./App.css";
import { Signin } from "./features/googlesigninemail/Signin";
function App() {
  return (
    <>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"100vh"}}>
        <Signin />
      </div>
    </>
  );
}

export default App;
