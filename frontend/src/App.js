
import './App.css';
import Display from './components/display/display';
import { Route, Routes } from 'react-router-dom';
import { Signin } from "./features/googlesigninemail/Signin";
import { useEffect, useState } from 'react';
import Typewriter from "typewriter-effect";
import { useNavigate } from 'react-router-dom';
import Nav from './components/nav';
import { MainForm } from './Pages/MainForm';
import { MainFormUpdate } from './Pages/Update/MainFormUpdate';
import Profile from "./Pages/Profile";
import MyProfile from "./Pages/MyProfile";
import ClusterMap from './Clustermap';
import ProfileUpdate from './Pages/ProfileUpdate/ProfileUpdate';
// import { Mapdata } from './Pages/Mapdata';
function App() {
const navigate = useNavigate()
const loggedin = localStorage.getItem("email")
console.log(loggedin);
  // Check if the user is logged in, if not, redirect to the /signin route
  useEffect(()=>{
    if (!loggedin) {
      navigate('/signin');
    }
  }, [loggedin])

  
  const id = localStorage.getItem("userId")

  return (
    <div>
    <Nav/>
    <Routes>
       
          <Route path="/form" element={<MainForm />} />
          
          <Route path="/update/:id" element={<MainFormUpdate />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Display />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/edit/:id" element={<ProfileUpdate />} />
         
      </Routes>
    </div>
  
  );
}

export default App;
