import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import BusChatbot from "../components/Chatbot";
import Bus from "../pages/Bus";
import Ticket from "../components/Ticket";
import Setting from "../pages/Setting";
import Help from "../pages/Help";

/**
 * AuthenticatedLayout
 * This component wraps all authenticated routes with the navbar
 * Only the main content area changes based on the route
 */
export default function AuthenticatedLayout() {
  return (
    <div className="min-h-screen pb-20">
      {" "}
      {/* pb-20 to account for fixed bottom navbar */}
      {/* Main content area */}
      <main className="flex-1">
        <Routes>
          {/* Default authenticated route */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bus" element={<Bus />} />
          <Route path="/tickets" element={<Ticket />} />
          <Route path="/hub" element={<BusChatbot />} />
          <Route path="/trip" element={<Setting />} />
          <Route path="/help" element={<Help />} />
          <Route path="/chatbot" element={<BusChatbot />} />
          <Route path="/setting" element={<Setting />} />

          {/* Catch all - redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
      {/* Fixed bottom navbar */}
      <Navbar />
    </div>
  );
}
