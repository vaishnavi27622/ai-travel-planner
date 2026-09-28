import { motion } from "framer-motion";
import DestinationCard from "./DestinationCard";

import goa from "../assets/images/goa.jpg";
import manali from "../assets/images/manali.jpg";
import jaipur from "../assets/images/jaipur.jpg";
import kerala from "../assets/images/kerala.jpg";

export default function DestinationSection() {
  const destinations = [
    {
      image: goa,
      title: "Goa",
      location: "Goa, India",
      rating: "4.8",
      price: "₹6,999",
    },
    {
      image: manali,
      title: "Manali",
      location: "Himachal Pradesh",
      rating: "4.9",
      price: "₹5,499",
    },
    {
      image: jaipur,
      title: "Jaipur",
      location: "Rajasthan",
      rating: "4.7",
      price: "₹4,999",
    },
    {
      image: kerala,
      title: "Kerala",
      location: "God's Own Country",
      rating: "4.9",
      price: "₹7,999",
    },
  ];

  return (
    <section
      id="destinations"
      className="relative -mt-32 z-20 px-6 pb-24"
    >
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center flex flex-col items-center mb-12"
        >
          <h2 className="text-5xl font-bold text-white">
            Recommended Destinations
          </h2>

          <p className="text-gray-300 mt-4 text-lg">
            Discover beautiful places selected for your next AI-powered journey.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {destinations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
            >
              <DestinationCard
                image={item.image}
                title={item.title}
                location={item.location}
                rating={item.rating}
                price={item.price}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}