// Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  UserCheck,
  Key,
  Bus,
  Calendar,
  CheckCircle,
  Clock,
  RefreshCw,
} from "lucide-react";

export default function Dashboard() {
  // --- state ---
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [buses, setBuses] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [message, setMessage] = useState(null);
  const [passwords, setPasswords] = useState({ old: "", new: "", confirm: "" });
  const [changingPwd, setChangingPwd] = useState(false);
  const [showBookModal, setShowBookModal] = useState(null); // bus object when booking
  const [error, setError] = useState(null);

  // env fallback: prefer VITE_ACCESS_TOKEN, else localStorage 'access'
  const API_BASE = "https://backend.shaslolav.space/api/auth/";
  const token =
    import.meta.env.VITE_ACCESS_TOKEN || localStorage.getItem("access");

  // --- helpers ---
  const authHeaders = () => ({ Authorization: token ? `Bearer ${token}` : "" });

  // fetch profile
  useEffect(() => {
    let mounted = true;
    setLoadingProfile(true);
    axios
      .get(`${API_BASE}profile/`, { headers: authHeaders() })
      .then((res) => {
        if (!mounted) return;
        setProfile(res.data);
        setLoadingProfile(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setError("Failed to load profile. Check token or network.");
        setLoadingProfile(false);
        console.error("Profile error:", err);
      });

    // Mock bookings + buses (replace with real endpoints)
    setBookings([
      {
        id: 1,
        route: "Delhi → Jaipur",
        date: "2025-09-20",
        status: "Confirmed",
      },
      {
        id: 2,
        route: "Noida → Lucknow",
        date: "2025-09-25",
        status: "Pending",
      },
    ]);
    setBuses([
      { id: 101, route: "Delhi → Chandigarh", time: "08:00 AM", seats: 12 },
      { id: 102, route: "Agra → Kanpur", time: "01:00 PM", seats: 5 },
    ]);

    return () => {
      mounted = false;
    };
  }, []);

  // Password change handler with validation
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!passwords.old || !passwords.new || !passwords.confirm) {
      setError("Fill all password fields.");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      setError("New password and confirm do not match.");
      return;
    }
    setChangingPwd(true);
    try {
      const res = await axios.post(
        `${API_BASE}change-password/`,
        {
          old_password: passwords.old,
          new_password: passwords.new,
          new_password_confirm: passwords.confirm,
        },
        { headers: authHeaders() },
      );
      setMessage(res.data?.message || "Password updated.");
      setPasswords({ old: "", new: "", confirm: "" });
    } catch (err) {
      // surface server message if available
      const srv = err?.response?.data?.detail || err?.response?.data?.message;
      setError(srv || "Password change failed. Check inputs.");
      console.error("Change password error:", err);
    } finally {
      setChangingPwd(false);
    }
  };

  // lightweight booking flow (mock) - replace with real POST when endpoint exists
  const confirmBooking = async (bus) => {
    setMessage(null);
    setError(null);
    // optimistic UI
    setBookings((prev) => [
      ...prev,
      {
        id: Date.now(),
        route: bus.route,
        date: new Date().toISOString().split("T")[0],
        status: "Confirmed",
      },
    ]);
    setShowBookModal(null);
    setMessage("Booking confirmed (mock). Replace with real API call.");
  };

  // small UI building blocks
  const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-gray-100">
        <Icon size={18} />
      </div>
      <div className="flex-1">
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-sm font-medium text-gray-800">{value || "—"}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.header
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between mb-4"
        >
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              Bus Dashboard
            </h1>
            <p className="text-xs text-gray-500">Manage bookings & profile</p>
          </div>

          <div className="text-right">
            <button
              title="Refresh profile"
              onClick={() => window.location.reload()}
              className="p-2 rounded-lg bg-gray-100"
              aria-label="Refresh"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </motion.header>

        {/* Profile card */}
        <AnimatePresence>
          <motion.section
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-2xl shadow p-4 mb-4"
            aria-live="polite"
          >
            {loadingProfile ? (
              <div className="space-y-3">
                <div className="h-8 bg-gray-100 rounded w-2/3 animate-pulse" />
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-10 bg-gray-100 rounded animate-pulse" />
                  <div className="h-10 bg-gray-100 rounded animate-pulse" />
                </div>
              </div>
            ) : profile ? (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                    {(
                      (profile.first_name || "U")[0] +
                      (profile.last_name || "")[0]
                    ).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">
                      {profile.first_name} {profile.last_name}
                    </div>
                    <div className="text-xs text-gray-500">
                      Role:{" "}
                      <span className="uppercase font-medium text-indigo-600">
                        {profile.role}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3">
                  <InfoRow icon={User} label="User ID" value={profile.id} />
                  <InfoRow icon={Mail} label="Email" value={profile.email} />
                  <InfoRow
                    icon={Phone}
                    label="Phone"
                    value={profile.phone_number}
                  />
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(profile.email);
                      setMessage("Email copied to clipboard.");
                      setTimeout(() => setMessage(null), 2000);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border text-sm"
                  >
                    <Mail size={16} /> Copy Email
                  </button>

                  <button
                    onClick={() => {
                      localStorage.removeItem("access");
                      window.location.reload();
                    }}
                    className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="text-sm text-red-600">
                {error || "No profile available."}
              </div>
            )}
          </motion.section>
        </AnimatePresence>

        {/* My Bookings */}
        <motion.section
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow p-4 mb-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-800">My Bookings</h2>
            <div className="text-xs text-gray-500">
              {bookings.length} recent
            </div>
          </div>

          {bookings.length ? (
            <ul className="space-y-2">
              {bookings.map((b) => (
                <li
                  key={b.id}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-white border">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-800">
                        {b.route}
                      </div>
                      <div className="text-xs text-gray-500">{b.date}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {b.status === "Confirmed" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                        <CheckCircle size={14} /> Confirmed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                        <Clock size={14} /> {b.status}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-sm text-gray-500">No bookings yet.</div>
          )}
        </motion.section>

        {/* Available Buses */}
        <motion.section
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow p-4 mb-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-800">
              Available Buses
            </h2>
            <div className="text-xs text-gray-500">Select & book</div>
          </div>

          <div className="space-y-3">
            {buses.map((bus) => (
              <motion.div
                key={bus.id}
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between p-3 rounded-lg border"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-gray-100">
                    <Bus size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{bus.route}</div>
                    <div className="text-xs text-gray-500">
                      {bus.time} • {bus.seats} seats
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => setShowBookModal(bus)}
                    className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-sm"
                  >
                    Book
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Change Password */}
        <motion.section
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow p-4 mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-800">
              Change Password
            </h2>
            <div className="text-xs text-gray-500">Secure your account</div>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-3">
            <div>
              <label className="sr-only">Old password</label>
              <div className="flex items-center gap-2">
                <Key size={18} />
                <input
                  type="password"
                  placeholder="Old password"
                  value={passwords.old}
                  onChange={(e) =>
                    setPasswords({ ...passwords, old: e.target.value })
                  }
                  className="flex-1 border rounded-lg p-2 text-sm"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div>
              <label className="sr-only">New password</label>
              <div className="flex items-center gap-2">
                <Key size={18} />
                <input
                  type="password"
                  placeholder="New password"
                  value={passwords.new}
                  onChange={(e) =>
                    setPasswords({ ...passwords, new: e.target.value })
                  }
                  className="flex-1 border rounded-lg p-2 text-sm"
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div>
              <label className="sr-only">Confirm new password</label>
              <div className="flex items-center gap-2">
                <Key size={18} />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords({ ...passwords, confirm: e.target.value })
                  }
                  className="flex-1 border rounded-lg p-2 text-sm"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={changingPwd}
                className="flex-1 px-3 py-2 rounded-lg bg-green-600 text-white text-sm disabled:opacity-60"
              >
                {changingPwd ? "Updating..." : "Update Password"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPasswords({ old: "", new: "", confirm: "" });
                  setMessage(null);
                  setError(null);
                }}
                className="px-3 py-2 rounded-lg border text-sm"
              >
                Reset
              </button>
            </div>

            {(message || error) && (
              <div className="text-sm mt-1">
                {message && <div className="text-green-700">{message}</div>}
                {error && <div className="text-red-600">{error}</div>}
              </div>
            )}
          </form>
        </motion.section>

        {/* Small footer */}
        <div className="text-center text-xs text-gray-400 mb-6">
          Built for mobile-first use — clean, fast, and minimal.
        </div>
      </div>

      {/* Booking modal (AnimatePresence) */}
      <AnimatePresence>
        {showBookModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-end justify-center"
            aria-modal="true"
            role="dialog"
          >
            <div
              onClick={() => setShowBookModal(null)}
              className="absolute inset-0 bg-black/40"
            />
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
              className="relative z-50 w-full max-w-md bg-white rounded-t-2xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-semibold">{showBookModal.route}</div>
                  <div className="text-xs text-gray-500">
                    {showBookModal.time} • {showBookModal.seats} seats
                  </div>
                </div>
                <button onClick={() => setShowBookModal(null)} className="p-2">
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-gray-700">
                  Confirm booking for this bus?
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => confirmBooking(showBookModal)}
                    className="flex-1 px-3 py-2 rounded-lg bg-indigo-600 text-white"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setShowBookModal(null)}
                    className="px-3 py-2 rounded-lg border"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
