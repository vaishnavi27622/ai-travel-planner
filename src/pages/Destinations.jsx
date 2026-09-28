import React from "react";
import { motion } from "framer-motion";


const destinations = [
  {
    name: "Goa",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
    description:
      "Beautiful beaches, nightlife and relaxing coastal experiences."
  },

  {
    name: "Manali",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
    description:
      "Snow mountains, adventure activities and scenic landscapes."
  },

  


  {
    name: "Kerala",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
    description:
      "Backwaters, nature and peaceful travel experiences."
  },

  

];


export default function Destinations() {


  return (

    <div className="min-h-screen bg-black text-white px-6 pt-32 pb-20">


      {/* Heading */}

      <motion.div

        initial={{opacity:0, y:40}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.7}}

        className="text-center mb-12"

      >

        <h1 className="text-5xl font-bold">

          Explore Popular 
          
          <span className="text-cyan-400">
            {" "}Destinations 🌎
          </span>

        </h1>


        <p className="text-gray-300 mt-5 text-lg">

          Discover amazing places and plan your next adventure with AI.

        </p>


      </motion.div>





      {/* Cards */}

      <div className="
        max-w-7xl 
        mx-auto
        grid 
        md:grid-cols-3
        gap-8
      ">


      {
        destinations.map((place,index)=>(


          <motion.div

            key={index}

            initial={{opacity:0, y:50}}
            animate={{opacity:1, y:0}}

            transition={{
              duration:0.5,
              delay:index*0.1
            }}

            whileHover={{
              scale:1.05
            }}

            className="
            bg-white/10
            backdrop-blur-xl
            border border-white/20
            rounded-3xl
            overflow-hidden
            shadow-xl
            "

          >


            <img

              src={place.image}

              alt={place.name}

              className="
              w-full
              h-56
              object-cover
              "

            />



            <div className="p-6">


              <h2 className="
              text-2xl
              font-bold
              text-cyan-400
              ">

                {place.name}

              </h2>


              <p className="
              text-gray-300
              mt-3
              ">

                {place.description}

              </p>



            </div>


          </motion.div>


        ))
      }


      </div>


    </div>

  );

}