import "./App.css";
import Display from "./components/display/display";
import { Route, Routes } from "react-router-dom";
import { Signin } from "./features/googlesigninemail/Signin";
import Nav from "./components/nav";
import CreatePost from "./Pages/createPost";
function App() {
  return (
    <div>
      <Nav/>
      <Routes>
        <Route path="/display" element={<Display />} />
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/createpost" element={<CreatePost />} />
      </Routes>
    </div>
  );
}

export default App;
