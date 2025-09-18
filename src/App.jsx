import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/dashboard/Navbar";
import Bus from "./pages/Bus";
import PageContent from "./components/dashboard/PageContent";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth screens */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes - you'll want to add authentication logic here */}
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <PageContent />
            </>
          }
        />
        <Route path="/bus" element={<Bus />} />
      </Routes>
    </Router>
  );
}

