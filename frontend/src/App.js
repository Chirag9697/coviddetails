
import './App.css';
import Display from './components/display/display';
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/display" element={<Display />} />
      
    </Routes>
  );
}

export default App;
