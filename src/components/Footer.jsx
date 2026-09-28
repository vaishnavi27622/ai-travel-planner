import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-white mt-20">
      <div className="max-w-7xl mx-auto px-8 py-12">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Logo */}
          <div>
            <h2 className="text-3xl font-bold text-cyan-400">
              AI Travel Planner
            </h2>

            <p className="mt-4 text-gray-400 leading-7">
              Plan smarter trips using Artificial Intelligence.
              Generate personalized travel itineraries powered
              by Phi-3 Mini.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-cyan-400 cursor-pointer">
                Home
              </li>

              <li className="hover:text-cyan-400 cursor-pointer">
                Planner
              </li>

              <li className="hover:text-cyan-400 cursor-pointer">
                Destinations
              </li>

              <li className="hover:text-cyan-400 cursor-pointer">
                About
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Connect
            </h3>

            <div className="flex gap-5 text-3xl">

              <FaGithub className="hover:text-cyan-400 cursor-pointer transition" />

              <FaLinkedin className="hover:text-cyan-400 cursor-pointer transition" />

              <FaInstagram className="hover:text-cyan-400 cursor-pointer transition" />

            </div>

            <p className="text-gray-400 mt-6">
              Email:
              <br />
              support@aitravelplanner.com
            </p>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-gray-500">
          © 2026 AI Travel Planner. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}