import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthenticatedLayout from "./route/route";
import Dashboard from "./components/Dashboard";
import BusChatbot from "./components/Chatbot";
import Bus from "./pages/Bus";
import Ticket from "./components/Ticket";
import Setting from "./pages/Setting";
import Help from "./pages/Help";

/**
 * isAuthenticated()
 * Simple check for presence of token
 */
function isAuthenticated() {
  return !!(
    localStorage.getItem("access_token") ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("access_token")
  );
}

/**
 * ProtectedRoute
 * Redirects to login if not authenticated
 */
function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes - no navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes - with navbar layout */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route
          path="/"
          element={
            <Navigate
              to={isAuthenticated() ? "/dashboard" : "/login"}
              replace
            />
          }
        />
      </Routes>
    </Router>
  );
}
