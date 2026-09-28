import {
  FaMapMarkerAlt,
  FaWifi,
  FaBed,
  FaUtensils,
  FaStar,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function DestinationCard({
  image,
  title,
  location,
  rating,
  price,
}) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="relative w-[300px] h-[460px] overflow-hidden rounded-[30px] shadow-2xl cursor-pointer"
    >
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

      {/* Rating */}
      <div className="absolute top-5 left-5 flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-sm">
        <FaStar className="text-yellow-400" />
        <span>{rating}</span>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 w-full p-6 text-white">

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-200">
          <FaMapMarkerAlt />
          <span>{location}</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold mt-2">
          {title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-300 mt-3 leading-6">
          Experience breathtaking views, luxurious stays and unforgettable
          moments with AI-planned travel.
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mt-5">

          <span className="bg-white/20 backdrop-blur-lg px-3 py-2 rounded-full text-xs flex items-center gap-2">
            <FaWifi />
            WiFi
          </span>

          <span className="bg-white/20 backdrop-blur-lg px-3 py-2 rounded-full text-xs flex items-center gap-2">
            <FaUtensils />
            Food
          </span>

          <span className="bg-white/20 backdrop-blur-lg px-3 py-2 rounded-full text-xs flex items-center gap-2">
            <FaBed />
            Stay
          </span>

        </div>

        {/* Price */}
        <div className="mt-6">
          <p className="text-gray-300 text-sm">
            Starting From
          </p>

          <h3 className="text-2xl font-bold">
            {price}
          </h3>
        </div>

      </div>
    </motion.div>
  );
}