import { Link, useLocation } from "react-router-dom";
import { FaBus, FaTicketAlt, FaQuestionCircle } from "react-icons/fa";
import { MdHub, MdOutlineAltRoute } from "react-icons/md";

function Navbar() {
  const location = useLocation(); // gives current path

  const navItems = [
    { to: "/", icon: <FaBus size={22} />, label: "Bus" },
    { to: "/tickets", icon: <FaTicketAlt size={22} />, label: "Tickets" },
    { to: "/hub", icon: <MdHub size={22} />, label: "Hub" },
    { to: "/trip", icon: <MdOutlineAltRoute size={22} />, label: "Trip Plan" },
    { to: "/help", icon: <FaQuestionCircle size={22} />, label: "Help" },
  ];

  return (
    <div className="fixed bottom-0 w-full bg-blue-600 text-white flex justify-around py-3">
      {navItems.map((item) => {
        const isActive = location.pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center ${
              isActive ? "text-cyan-300 font-semibold opacity-50 scale-120   " : "text-white"
            }`}
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default Navbar;