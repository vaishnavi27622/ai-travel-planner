import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Planner from "../pages/Planner";
import Destinations from "../pages/Destinations";
import About from "../pages/About";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/planner" element={<Planner />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}