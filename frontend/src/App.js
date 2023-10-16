
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import ProfileUpdate from './Pages/ProfileUpdate/ProfileUpdate';
import MyProfile from "./Pages/Profileset/MyProfile";
import { MainFormUpdate } from './Pages/Update/MainFormUpdate';
import { MainForm } from './Pages/familyform/MainForm';
import Display from './components/display/display';
import Nav from './components/navbar/nav';
import { Signin } from "./features/googlesigninemail/Signin";
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
