
import './App.css';
import Display from './components/display/display';
import { Route, Routes } from 'react-router-dom';
import { Signin } from "./features/googlesigninemail/Signin";
import { useState } from 'react';
import Typewriter from "typewriter-effect";
import Nav from './components/nav';
function App() {

  return (
    <div>
    <Nav/>
    <Routes>
      <Route path="/display" element={<Display />} />
      <Route path="/signin" element={<Signin/>}></Route>
    </Routes>
    </div>
  
  );
}

export default App;
