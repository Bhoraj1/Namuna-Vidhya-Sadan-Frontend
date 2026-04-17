import { Link } from "react-router-dom";
import bgImg from "../../assets/img/scphoto.jpg";
import { motion } from "framer-motion";
import Button from "../ButtonComponent.jsx";

const AboutComponents = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          {/* Left Side - About Intro */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left order-2 lg:order-1"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-third-color">
              About Us
            </h2>

            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
              Namuna Bidhya Sadan, located in Kohalpur, is a leading educational
              institution dedicated to academic excellence and holistic
              development. Since its establishment in 2062 B.S., the school has
              been committed to nurturing young minds through quality education,
              modern teaching methodologies, and a disciplined learning
              environment. With experienced faculty, well-equipped facilities,
              and a strong focus on both academic and extracurricular
              activities, Namuna Bidhya Sadan prepares students to become
              confident, responsible, and capable individuals ready to face
              future challenges.
            </p>

            <Button
              to="/about"
              size="md"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-third-color hover:bg-third-color/80 text-white  font-medium text-sm sm:text-base transition-colors duration-300"
            >
              Read More
            </Button>
          </motion.div>

          {/* Right Side - Photo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative order-1 lg:order-2 w-full flex justify-center items-center"
          >
            <div className="relative w-full max-w-sm lg:max-w-full mx-auto rounded-xl overflow-hidden shadow-lg">
              {/* Image */}
              <img
                src={bgImg}
                alt="Namuna Bidhya Sadan"
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30" />

              {/* Text */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center px-2">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                  Namuna Bidhya Sadan
                </h3>
                <p className="text-xs sm:text-sm opacity-80">
                  Established 2062 B.S.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutComponents;
