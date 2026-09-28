import React from "react";
import { motion } from "framer-motion";


export default function About() {


  const features = [
    {
      title: "AI Trip Planning ✨",
      desc: "Generate personalized travel itineraries based on destination, budget and travel preferences."
    },

    {
      title: "Smart Recommendations 🌎",
      desc: "Discover popular destinations and get suggestions according to your interests."
    },

    {
      title: "Budget Friendly 💰",
      desc: "Plan trips according to your available budget and travel duration."
    },

    {
      title: "Personalized Experience 🚀",
      desc: "Create unique travel plans instead of following generic itineraries."
    }
  ];


  return (

    <div className="min-h-screen bg-black text-white px-6 pt-32 pb-20">


      {/* Header */}

      <motion.div

        initial={{opacity:0, y:40}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.7}}

        className="text-center mb-14"

      >

        <h1 className="text-5xl font-bold">

          About

          <span className="text-cyan-400">
            {" "}AI Travel Planner ✈️
          </span>

        </h1>


        <p className="text-gray-300 text-lg mt-5 max-w-3xl mx-auto">

          AI Travel Planner is an intelligent travel assistant that helps
          users create personalized trip plans quickly and easily.

        </p>


      </motion.div>





      {/* Project Description */}

      <motion.div

        initial={{opacity:0, scale:0.9}}
        animate={{opacity:1, scale:1}}

        className="
        max-w-5xl
        mx-auto
        bg-white/10
        backdrop-blur-xl
        border border-white/20
        rounded-3xl
        p-10
        "

      >

        <h2 className="
        text-3xl
        font-bold
        text-cyan-400
        mb-5
        ">

          Our Mission 🌍

        </h2>


        <p className="text-gray-200 leading-8">

          Our goal is to simplify travel planning using Artificial
          Intelligence. Instead of spending hours searching for places,
          users can provide their destination, number of days, budget and
          preferences to receive a customized itinerary.

        </p>


      </motion.div>







      {/* Features */}

      <section className="max-w-6xl mx-auto mt-16">


        <h2 className="
        text-3xl
        font-bold
        text-center
        mb-10
        ">

          Why Choose Us?

        </h2>




        <div className="
        grid
        md:grid-cols-2
        gap-8
        ">


        {
          features.map((feature,index)=>(


            <motion.div

              key={index}

              initial={{opacity:0, y:30}}
              animate={{opacity:1, y:0}}

              transition={{
                delay:index*0.1
              }}

              whileHover={{
                scale:1.05
              }}

              className="
              bg-white/10
              backdrop-blur-xl
              border border-white/20
              rounded-2xl
              p-7
              "

            >


              <h3 className="
              text-xl
              font-bold
              text-cyan-400
              mb-3
              ">

                {feature.title}

              </h3>


              <p className="text-gray-300">

                {feature.desc}

              </p>


            </motion.div>


          ))
        }


        </div>


      </section>






      {/* Technology Stack */}

      <motion.div

        initial={{opacity:0}}
        animate={{opacity:1}}

        className="
        max-w-5xl
        mx-auto
        mt-16
        bg-white/10
        backdrop-blur-xl
        border border-white/20
        rounded-3xl
        p-8
        text-center
        "

      >

        <h2 className="
        text-3xl
        font-bold
        text-cyan-400
        mb-5
        ">

          Technology Stack 💻

        </h2>


        <div className="
        flex
        flex-wrap
        justify-center
        gap-4
        ">


          {
            [
              "React.js",
              "JavaScript",
              "phi3 : mini",
              "AI / Machine Learning",
              "API Integration"
            ].map((tech,index)=>(


              <span

                key={index}

                className="
                px-5
                py-2
                rounded-full
                bg-white/10
                border border-white/20
                "

              >

                {tech}

              </span>


            ))
          }


        </div>


      </motion.div>




    </div>

  );

}