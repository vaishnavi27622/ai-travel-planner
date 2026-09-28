import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import heroImage from "../assets/images/hero.jpg";

export default function Hero() {
  return (
    <section
      className="relative h-[85vh] bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(15,23,42,.45), rgba(15,23,42,.75)), url(${heroImage})`,
      }}
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-center text-center px-8">

        <motion.div
  initial={{ opacity: 0, x: -60 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className="max-w-3xl flex flex-col items-center"
>
        
          <p className="uppercase tracking-[4px] text-cyan-300 mb-4">
            AI Powered Travel Planner
          </p>

          <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
            Plan Your
            <br />
            Dream Destination
            <br />
            With AI
          </h1>

          

          <div className="flex gap-5 mt-10">

           <NavLink
  to="/planner"
  className="
    bg-cyan-500
    hover:bg-cyan-400
    text-white
    font-semibold
    px-10
    py-5
    rounded-full
    shadow-lg
    transition-all
    duration-300
    hover:scale-105
  "
>
  Let's Go
</NavLink>

            <a
              href="#destinations"
              className="border border-white/30 backdrop-blur-lg bg-white/10 px-8 py-4 rounded-full text-white hover:bg-white/20 transition"
            >
              Explore
            </a>

          </div>

        </motion.div>

      </div>
    </section>
  );
}