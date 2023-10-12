
import './App.css';
// import Display from './components/display/display';
import { Route, Routes } from 'react-router-dom';
import { Signin } from "./features/googlesigninemail/Signin";
import { useEffect, useState } from 'react';
import Typewriter from "typewriter-effect";
import { useNavigate } from 'react-router-dom';
// import Nav from './components/nav';
// import { MainForm } from './Pages/MainForm';
// import { MainFormUpdate } from './Pages/Update/MainFormUpdate';
// import Profile from "./Pages/Profile";
// import MyProfile from "./Pages/MyProfile";
// import ClusterMap from './Clustermap';
// import ProfileUpdate from './Pages/ProfileUpdate/ProfileUpdate';
// import { Mapdata } from './Pages/Mapdata';
import Nav from './components/navbar/Nav';
import Display from './components/display/display';
import { useMachine } from "@xstate/react";
import machine from './features/googlesigninemail/Signinmachine';
function App() {
const navigate = useNavigate()
  // Check if the user is logged in, if not, redirect to the /signin route
    
  const id = localStorage.getItem("userId")
  const [state, send] = useMachine(machine);
  console.log(state);
  return (
    <div>

    {state.matches("signedin")==true && <Nav/>}
    <Routes>
       
          <Route path="/signin" element={<Signin />} />
          <Route path="*" element={<Display/>}/>
          
         
      </Routes>
    </div>
  
  );
}

export default App;