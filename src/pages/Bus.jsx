import { FaSearch, FaBell } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";

function Bus() {
  return (
    <div className="relative w-full bg-gradient-to-r from-cyan-700 via-blue-600 to-cyan-500 p-4 rounded-b-2xl shadow-md">
      <div className="flex justify-between">

      <div className="flex mb-5">
        <h1 className="text-white text-2xl font-bold">SmartYatra</h1>
      </div>
      <Link to="/Setting">
      <FiSettings className="text-white cursor-pointer " size={22} />
      </Link>
      </div>

      
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
        <input
          type="text"
          placeholder="Search 500+ Route"
          className="w-full pl-10 pr-10 py-2 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex space-x-3">
          
          <FaBell className="text-white cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default Bus;