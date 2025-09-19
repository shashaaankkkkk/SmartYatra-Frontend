import { Link, useLocation } from "react-router-dom";
import { FaBus, FaUser, FaTicketAlt, FaQuestionCircle } from "react-icons/fa";
import { MdOutlineAltRoute } from "react-icons/md";
import { TbMessageChatbot } from "react-icons/tb";

function Navbar() {
  const location = useLocation();

  const navItems = [
    { to: "/bus", icon: <FaBus size={22} />, label: "Bus" },
    { to: "/tickets", icon: <FaTicketAlt size={22} />, label: "Tickets" },
    { to: "/hub", icon: <TbMessageChatbot size={22} />, label: "Chatbot" },
    { to: "/dashboard", icon: <FaUser size={22} />, label: "Dashboard" },
    { to: "/help", icon: <FaQuestionCircle size={22} />, label: "Help" },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-blue-600 text-white flex justify-around py-3 z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center transition-all duration-200 ${
              isActive
                ? "text-cyan-300 font-semibold transform scale-110"
                : "text-white hover:text-cyan-100"
            }`}
          >
            {item.icon}
            <span className="text-sm mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default Navbar;
