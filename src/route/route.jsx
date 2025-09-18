import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../components/Login";
import Register from "../components/Register";
import Dashboard from "../components/Dashboard";
import BusChatbot from "../components/Chatbot";
import Ticket from "../components/Ticket";

/**
 * isAuthenticated()
 * Simple check for presence of token. Adjust to your real auth-check if you have an /auth/verify endpoint.
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
 * Use this to wrap routes that require an authenticated user.
 */
function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

/**
 * AppRoutes
 * Centralized routing. Keep App.jsx tiny and import this.
 */
export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected / passenger routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <BusChatbot />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ticket"
          element={
            <ProtectedRoute>
              <Ticket />
            </ProtectedRoute>
          }
        />

        {/* Catch-all -> auth redirect */}
        <Route
          path="*"
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
