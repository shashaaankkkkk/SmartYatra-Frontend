import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import BusChatbot from "./components/Chatbot.jsx";
import Bus from "./pages/Bus";
import Navbar from "./components/navbar";
import Setting from "./pages/Setting";
import Help from "./pages/Help";

export default function App() {
  return (
    <Router>
      
      <Routes>
        {/* Default redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth screens */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chatbot" element={<BusChatbot />} />
        <Route path="/Bus" element={<Bus />} />
        <Route path="/Setting" element={<Setting/>} />
        <Route path="/Help" element={<Help/>} />
        
      </Routes>
      <Navbar/>
      
    </Router>
  );
}
