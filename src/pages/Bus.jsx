import { FaSearch, FaBell } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function Bus() {
  const source = [28.6139, 77.209]; // Delhi
  const destination = [28.4595, 77.0266]; // Gurgaon
  const route = [source, destination];

  // Custom marker (bus pin)
  const busIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61088.png",
    iconSize: [30, 30],
  });

  return (
    <div className="relative h-screen w-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-700 via-blue-600 to-cyan-500 p-4 shadow-md z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">SmartYatra</h1>
          <Link to="/Setting">
            <FiSettings className="text-white cursor-pointer" size={22} />
          </Link>
        </div>

        {/* Search */}
        <div className="relative mt-3">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
          <input
            type="text"
            placeholder="Search route or stop"
            className="w-full pl-10 pr-10 py-2 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <FaBell className="text-white cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="relative flex-1">
        <MapContainer
          center={source}
          zoom={11}
          className="h-full w-full"
          style={{ height: "100%", width: "100%" }}
        >
          {/* OSM tiles (replace with Mapbox if needed) */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          <Marker position={source} icon={busIcon}>
            <Popup>Source: Delhi</Popup>
          </Marker>

          <Marker position={destination} icon={busIcon}>
            <Popup>Destination: Gurgaon</Popup>
          </Marker>

          <Polyline positions={route} color="#2563eb" weight={5} />
        </MapContainer>
      </div>

      {/* Bottom Booking Card */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-white shadow-lg rounded-xl p-4 z-20">
        <h2 className="text-lg font-semibold">Your Trip</h2>
        <p className="text-gray-600 text-sm">Delhi → Gurgaon</p>
        <div className="flex justify-between items-center mt-3">
          <span className="font-bold text-blue-600 text-lg">₹45</span>
          <button className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition">
            Book Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

export default Bus;
