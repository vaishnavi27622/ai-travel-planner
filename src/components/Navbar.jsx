import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-cyan-300 font-semibold"
      : "text-white hover:text-cyan-300 transition";

  return (
    <motion.nav
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="
sticky
top-0
z-50
w-full
bg-white/10
backdrop-blur-xl
border-b
border-white/20
px-8
py-3
flex
items-center
justify-between
shadow-xl
"
    >
      <NavLink
        to="/"
        className="text-xl font-bold text-white whitespace-nowrap"
      >
        AI Travel Planner
      </NavLink>

      <ul className="hidden md:flex items-center gap-8">
        <li>
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/planner" className={linkClass}>
            Planner
          </NavLink>
        </li>

        <li>
          <NavLink to="/destinations" className={linkClass}>
            Destinations
          </NavLink>
        </li>

        <li>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
        </li>
      </ul>

      <NavLink
        to="/planner"
        className="
          bg-cyan-500
          hover:bg-cyan-400
          text-white
          px-5
          py-2
          rounded-full
          font-semibold
          whitespace-nowrap
          transition
        "
      >
        Get Started
      </NavLink>
    </motion.nav>
  );
}