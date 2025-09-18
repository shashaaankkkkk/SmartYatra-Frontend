import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bus,
  List as ListIcon,
  PlusCircle,
  MapPin,
  Clock,
  AlertTriangle,
  // ReloadCw,
} from "lucide-react";

const BASE_URL = "https://backend.shaslolav.space/api/ticketing";

function getToken() {
  // Check multiple common storage keys (no auth flow here per request).
  return (
    localStorage.getItem("access_token") ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("access_token") ||
    window.__ACCESS_TOKEN__ ||
    null
  );
}

async function apiFetch(
  path,
  { method = "GET", body = null, token = null } = {},
) {
  const headers = {
    "Content-Type": "application/json",
  };
  if (!token) token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  const contentType = res.headers.get("content-type") || "";
  let data = null;
  if (contentType.includes("application/json")) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  if (!res.ok) {
    const err = new Error(
      data?.detail || data?.message || `HTTP ${res.status}`,
    );
    err.status = res.status;
    err.payload = data;
    throw err;
  }
  return data;
}

export default function Ticket() {
  const token = useMemo(getToken, []);
  const [tab, setTab] = useState("book"); // 'book' or 'list'
  const [routes, setRoutes] = useState([]);
  const [routesLoading, setRoutesLoading] = useState(false);
  const [routesError, setRoutesError] = useState(null);

  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [bookingError, setBookingError] = useState(null);

  const [tickets, setTickets] = useState([]);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [ticketsError, setTicketsError] = useState(null);

  useEffect(() => {
    // On mount fetch routes and tickets
    fetchRoutes();
    fetchTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchRoutes() {
    setRoutesLoading(true);
    setRoutesError(null);
    try {
      // Attempt to GET /routes/ (not documented for GET but often present).
      const data = await apiFetch("/routes/", { token });
      // Expect data to be list of routes, possibly containing "stops"
      setRoutes(Array.isArray(data) ? data : []);
      if (Array.isArray(data) && data.length > 0 && !selectedRouteId) {
        setSelectedRouteId(data[0].id);
      }
    } catch (err) {
      // If /routes/ not available, try listing stops (may not be helpful for booking directly)
      if (err.status === 403 || err.status === 404) {
        try {
          const stops = await apiFetch("/stops/", { token });
          // If stops exist but we don't have routes, present a simple fallback where each stop becomes a "route"
          const fallbackRoutes = Array.isArray(stops)
            ? stops.map((s) => ({
                id: s.id,
                name: s.name,
                description: `Stop: ${s.name}`,
                stops: [s],
              }))
            : [];
          setRoutes(fallbackRoutes);
          if (fallbackRoutes.length > 0)
            setSelectedRouteId(fallbackRoutes[0].id);
          setRoutesError(
            "Routes listing is restricted. Showing stops as fallback.",
          );
        } catch (err2) {
          setRoutesError(
            "Unable to fetch routes or stops. The ticket booking route list is unavailable.",
          );
          setRoutes([]);
        }
      } else {
        setRoutesError(err.message || "Failed to fetch routes.");
      }
    } finally {
      setRoutesLoading(false);
    }
  }

  async function fetchTickets() {
    setTicketsLoading(true);
    setTicketsError(null);
    try {
      const data = await apiFetch("/tickets/", { token });
      // Expect array of tickets
      setTickets(Array.isArray(data) ? data : []);
    } catch (err) {
      setTicketsError(err.message || "Failed to fetch tickets.");
      setTickets([]);
    } finally {
      setTicketsLoading(false);
    }
  }

  async function handleBookTicket(e) {
    e.preventDefault();
    setBookingError(null);
    setBookingSuccess(null);

    if (!selectedRouteId) {
      setBookingError("Select a route before booking.");
      return;
    }
    setBookingLoading(true);
    try {
      const payload = { route: selectedRouteId };
      const data = await apiFetch("/tickets/", {
        method: "POST",
        body: payload,
        token,
      });
      setBookingSuccess(data);
      // refresh tickets list
      await fetchTickets();
      // keep success visible briefly
      setTimeout(() => setBookingSuccess(null), 4000);
    } catch (err) {
      setBookingError(
        err.payload?.detail ||
          err.message ||
          "Failed to book ticket. Check network or token.",
      );
    } finally {
      setBookingLoading(false);
    }
  }

  function routeById(id) {
    return routes.find((r) => r.id === id) || null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4 sm:p-6">
      <div className="w-full max-w-xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <Bus className="w-6 h-6 text-slate-700" />
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-tight">
                Book & View Tickets
              </h1>
              <p className="text-xs text-slate-500">
                Passenger portal — quick & mobile-first
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                fetchRoutes();
                fetchTickets();
              }}
              title="Refresh"
              className="bg-white p-2 rounded-lg shadow-sm"
            >
              {/* <ReloadCw className="w-5 h-5" /> */}
            </button>
            <button
              onClick={() => setTab((t) => (t === "book" ? "list" : "book"))}
              className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-lg shadow-sm"
            >
              {tab === "book" ? (
                <>
                  <ListIcon className="w-4 h-4" /> My Tickets
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" /> Book
                </>
              )}
            </button>
          </div>
        </header>

        {/* tabs */}
        <nav className="flex bg-white rounded-xl shadow-sm overflow-hidden mb-4">
          <button
            onClick={() => setTab("book")}
            className={`flex-1 px-4 py-3 text-center text-sm font-medium ${
              tab === "book" ? "bg-indigo-600 text-white" : "text-slate-600"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <PlusCircle className="w-4 h-4" />
              <span>Book</span>
            </div>
          </button>
          <button
            onClick={() => setTab("list")}
            className={`flex-1 px-4 py-3 text-center text-sm font-medium ${
              tab === "list" ? "bg-indigo-600 text-white" : "text-slate-600"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <ListIcon className="w-4 h-4" />
              <span>My Tickets</span>
            </div>
          </button>
        </nav>

        <main>
          <AnimatePresence exitBeforeEnter>
            {tab === "book" ? (
              <motion.section
                key="book"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="bg-white rounded-xl p-4 shadow-sm"
              >
                {/* route loader / error */}
                {routesLoading ? (
                  <div className="text-sm text-slate-500 py-6 text-center">
                    Loading routes…
                  </div>
                ) : routesError ? (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-md flex gap-3 items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-700 mt-1" />
                    <div className="text-sm text-yellow-800">{routesError}</div>
                  </div>
                ) : routes.length === 0 ? (
                  <div className="text-slate-500 text-sm py-6 text-center">
                    No routes available at the moment.
                  </div>
                ) : (
                  <form onSubmit={handleBookTicket} className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-slate-600">
                        Select Route
                      </label>
                      <div className="mt-2 relative">
                        <select
                          className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                          value={selectedRouteId ?? ""}
                          onChange={(e) =>
                            setSelectedRouteId(Number(e.target.value))
                          }
                        >
                          {routes.map((r) => (
                            <option key={r.id} value={r.id}>
                              {r.name || `Route ${r.id}`}{" "}
                              {r.description ? `— ${r.description}` : ""}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* show selected route details */}
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            <div>
                              <div className="text-sm font-semibold text-slate-700">
                                {routeById(selectedRouteId)?.name || "—"}
                              </div>
                              <div className="text-xs text-slate-500">
                                {routeById(selectedRouteId)?.description || ""}
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 text-xs text-slate-600">
                            <div className="font-medium mb-1">Stops</div>
                            {routeById(selectedRouteId)?.stops?.length ? (
                              <ol className="list-decimal ml-5 space-y-1">
                                {routeById(selectedRouteId).stops.map((s) => (
                                  <li key={s.id}>
                                    <div className="flex items-center gap-2">
                                      <span className="truncate">{s.name}</span>
                                      {s.code ? (
                                        <span className="text-[10px] bg-white px-2 py-0.5 rounded text-slate-400 ml-2">
                                          {s.code}
                                        </span>
                                      ) : null}
                                    </div>
                                  </li>
                                ))}
                              </ol>
                            ) : (
                              <div className="text-xs text-slate-400">
                                No stop data available.
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="w-24 flex-shrink-0 text-right">
                          <div className="text-xs text-slate-500">
                            Est. travel
                          </div>
                          <div className="text-sm font-semibold text-slate-700 mt-2">
                            N/A
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* booking actions */}
                    <div className="flex gap-3 items-center">
                      <button
                        type="submit"
                        disabled={bookingLoading}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-indigo-600 text-white font-medium disabled:opacity-60"
                      >
                        {bookingLoading ? "Booking…" : "Book Ticket"}
                        <PlusCircle className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          fetchRoutes();
                        }}
                        className="px-3 py-3 rounded-lg border border-slate-200 bg-white"
                        title="Reload routes"
                      >
                        {/* <ReloadCw className="w-5 h-5" /> */}
                      </button>
                    </div>

                    {/* booking feedback */}
                    <div>
                      <AnimatePresence>
                        {bookingSuccess && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            className="bg-emerald-50 border-l-4 border-emerald-400 p-3 rounded-md text-sm text-emerald-800"
                          >
                            Ticket booked — ID{" "}
                            <span className="font-semibold">
                              {bookingSuccess.id}
                            </span>
                            {" — "}Status: {bookingSuccess.status}
                          </motion.div>
                        )}
                        {bookingError && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            className="bg-red-50 border-l-4 border-red-400 p-3 rounded-md text-sm text-red-800"
                          >
                            {bookingError}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </form>
                )}
              </motion.section>
            ) : (
              <motion.section
                key="list"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-slate-600">Your Tickets</div>
                  <div className="text-xs text-slate-400">
                    {tickets.length} total
                  </div>
                </div>

                {ticketsLoading ? (
                  <div className="text-sm text-slate-500 py-6 text-center">
                    Loading tickets…
                  </div>
                ) : ticketsError ? (
                  <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-md text-sm text-red-800">
                    {ticketsError}
                  </div>
                ) : tickets.length === 0 ? (
                  <div className="text-center text-slate-500 py-8">
                    <div className="text-sm mb-2">You have no tickets yet.</div>
                    <button
                      onClick={() => setTab("book")}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm"
                    >
                      <PlusCircle className="w-4 h-4" /> Book your first ticket
                    </button>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {tickets.map((t) => {
                      const route = routeById(t.route);
                      return (
                        <motion.li
                          key={t.id}
                          initial={{ opacity: 0, scale: 0.995 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <div className="p-3 rounded-lg border border-slate-100 bg-white flex items-start gap-3">
                            <div className="flex-shrink-0">
                              <div className="bg-indigo-50 rounded-lg p-2">
                                <Bus className="w-6 h-6 text-indigo-600" />
                              </div>
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center justify-between gap-3">
                                <div>
                                  <div className="text-sm font-semibold text-slate-800">
                                    {route?.name || `Route ${t.route}`}
                                  </div>
                                  <div className="text-xs text-slate-500">
                                    {route?.description || "Passenger ticket"}
                                  </div>
                                </div>

                                <div className="text-right">
                                  <div className="text-xs text-slate-400">
                                    Status
                                  </div>
                                  <div
                                    className={`text-sm font-medium mt-1 ${
                                      t.status === "active"
                                        ? "text-emerald-600"
                                        : t.status === "validated"
                                          ? "text-sky-600"
                                          : "text-slate-600"
                                    }`}
                                  >
                                    {t.status}
                                  </div>
                                </div>
                              </div>

                              <div className="mt-3 text-xs text-slate-500 flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>
                                    {new Date(t.created_at).toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>Route ID: {t.route}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.li>
                      );
                    })}
                  </ul>
                )}
              </motion.section>
            )}
          </AnimatePresence>
        </main>

        {/* footer small notes */}
        <footer className="mt-5 text-center text-xs text-slate-400">
          <div>
            All bookings follow backend rules. If something fails, check your
            token or contact support.
          </div>
        </footer>
      </div>
    </div>
  );
}
