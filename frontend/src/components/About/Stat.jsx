import React from "react";
import { motion } from "framer-motion";
import stats from "../../data/aboutData.js";

const Stat = () => {
  return (
    <section className=" py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08 }}
              className="flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 mx-auto bg-white rounded-full shadow-md hover:shadow-xl transition-all duration-300"
            >
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-900">
                {stat.number}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stat;
