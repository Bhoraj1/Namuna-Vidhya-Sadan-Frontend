import React from "react";
import {
  FaFlask,
  FaDesktop,
  FaBookOpen,
  FaFootballBall,
  FaTheaterMasks,
} from "react-icons/fa";
import assembly from "../../assets/img/assembly.jpg";
import computerlab from "../../assets/img/computerlab.webp";
import ground from "../../assets/img/ground.jpg";
import library from "../../assets/img/library.webp";
import sciencelab from "../../assets/img/home/sciencelab.png";

const Facilities = () => {
  const facilities = [
    {
      icon: <FaFlask className="text-3xl" />,
      title: "Science Laboratory",
      image: sciencelab,
      description:
        "Well-equipped physics, chemistry, and biology labs for hands-on learning",
    },
    {
      icon: <FaDesktop className="text-3xl" />,
      title: "Computer Lab",
      description: "Modern computers with internet access for digital literacy",
      image: computerlab,
    },
    {
      icon: <FaBookOpen className="text-3xl" />,
      title: "Library",
      description:
        "Extensive collection of books, journals, and digital resources",
      image: library,
    },
    {
      icon: <FaFootballBall className="text-3xl" />,
      title: "Sports Ground",
      description:
        "Large playground for football, volleyball, and other sports activities",
      image: ground,
    },
    {
      icon: <FaTheaterMasks className="text-3xl" />,
      title: "Assembly Hall",
      description: "Spacious hall for cultural programs, meetings, and events",
      image: assembly,
    },
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 ">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-third-color mb-3 sm:mb-4">
            Our Facilities
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            Explore our modern facilities designed to provide the best learning
            environment for our students
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {facilities.map((facility, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-sm transform hover:-translate-x-1 transition-all duration-10 group"
            >
              <div className="h-40 sm:h-48 bg-gray-100">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="text-secondary-color text-xl sm:text-2xl md:text-3xl">{facility.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                    {facility.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {facility.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
