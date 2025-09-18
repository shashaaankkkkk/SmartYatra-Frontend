import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [buses, setBuses] = useState([]);
  const [passwords, setPasswords] = useState({
    old: "",
    new: "",
    confirm: "",
  });
  const [message, setMessage] = useState("");

  const API_BASE = "https://backend.shaslolav.space/api/auth/";
  const token = import.meta.env.VITE_ACCESS_TOKEN; // store in .env as VITE_ACCESS_TOKEN

  // Fetch profile on mount
  useEffect(() => {
    axios
      .get(`${API_BASE}profile/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Profile fetch error:", err));
  }, []);

  // Mock: Load some bookings + buses
  useEffect(() => {
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
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_BASE}change-password/`,
        {
          old_password: passwords.old,
          new_password: passwords.new,
          new_password_confirm: passwords.confirm,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setMessage(res.data.message);
      setPasswords({ old: "", new: "", confirm: "" });
    } catch (err) {
      setMessage("Password change failed. Check inputs.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="bg-white shadow p-6 rounded-2xl flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            🚌 Bus Booking Dashboard
          </h1>
          {profile && (
            <div className="text-right">
              <p className="font-semibold">
                {profile.first_name} {profile.last_name}
              </p>
              <p className="text-sm text-gray-500">{profile.email}</p>
              <p className="text-xs text-blue-600 uppercase">{profile.role}</p>
            </div>
          )}
        </header>

        {/* Profile Section */}
        {profile && (
          <section className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">👤 My Profile</h2>
            <div className="grid grid-cols-2 gap-4">
              <p>
                <span className="font-medium">Name:</span> {profile.first_name}{" "}
                {profile.last_name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {profile.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {profile.phone_number}
              </p>
              <p>
                <span className="font-medium">Role:</span> {profile.role}
              </p>
            </div>
          </section>
        )}

        {/* My Bookings */}
        <section className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">📅 My Bookings</h2>
          {bookings.length ? (
            <ul className="space-y-3">
              {bookings.map((b) => (
                <li
                  key={b.id}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                >
                  <span>
                    {b.route} — {b.date}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${b.status === "Confirmed" ? "bg-green-200 text-green-700" : "bg-yellow-200 text-yellow-700"}`}
                  >
                    {b.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings yet.</p>
          )}
        </section>

        {/* Available Buses */}
        <section className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">🚌 Available Buses</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {buses.map((bus) => (
              <div
                key={bus.id}
                className="border rounded-xl p-4 bg-gray-50 hover:shadow"
              >
                <p className="font-semibold">{bus.route}</p>
                <p className="text-sm text-gray-600">Time: {bus.time}</p>
                <p className="text-sm text-gray-600">Seats: {bus.seats}</p>
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Change Password */}
        <section className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">🔑 Change Password</h2>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <input
              type="password"
              placeholder="Old Password"
              value={passwords.old}
              onChange={(e) =>
                setPasswords({ ...passwords, old: e.target.value })
              }
              className="w-full border rounded-lg p-2"
            />
            <input
              type="password"
              placeholder="New Password"
              value={passwords.new}
              onChange={(e) =>
                setPasswords({ ...passwords, new: e.target.value })
              }
              className="w-full border rounded-lg p-2"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={passwords.confirm}
              onChange={(e) =>
                setPasswords({ ...passwords, confirm: e.target.value })
              }
              className="w-full border rounded-lg p-2"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Update Password
            </button>
          </form>
          {message && <p className="mt-3 text-sm text-red-600">{message}</p>}
        </section>
      </div>
    </div>
  );
}
