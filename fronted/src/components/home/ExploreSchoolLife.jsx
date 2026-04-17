import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import tour from "../../assets/img/home/tour.jpg";
import student from "../../assets/img/home/student.jpg";
import home14 from "../../assets/img/home/home14.jpg";
import home5 from "../../assets/img/home/home5.jpg";
import sciencelab from "../../assets/img/home/sciencelab.png";
import mahabir from "../../assets/img/home/mahabir.jpg";
import Button from "../ButtonComponent.jsx";

const ExploreSchoolLife = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // School life data with random images
  const schoolLifeData = [
    {
      id: 1,
      title: "summer tour",
      image: tour,
    },
    {
      id: 2,
      title: "our students farewell ",
      image: student,
    },
    {
      id: 3,
      title: "Science Laboratory",
      image: sciencelab,
    },
    {
      id: 4,
      title: "winning vollyball in mayor cup",
      image: home14,
    },
    {
      id: 5,
      title: "Cultural Programs",
      image: home5,
    },
    {
      id: 6,
      title: "mahabir pun at nvs",
      image: mahabir,
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % schoolLifeData.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + schoolLifeData.length) % schoolLifeData.length,
    );
  };

  const getPrevIndex = () => {
    return (currentIndex - 1 + schoolLifeData.length) % schoolLifeData.length;
  };

  const getNextIndex = () => {
    return (currentIndex + 1) % schoolLifeData.length;
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 xl:py-20 2xl:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 2xl:px-10">
        {/* Section Title */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 xl:mb-16 2xl:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-third-color mb-2 sm:mb-4">
            Explore Our School Life
          </h2>
        </div>

        {/* Main Slider Layout */}
        <div className="relative flex items-center justify-center h-64 sm:h-80 md:h-96 lg:h-125 xl:h-140 2xl:h-160">
          {/* Left Image */}
          <div className="hidden lg:block relative w-64 h-full">
            <img
              src={schoolLifeData[getPrevIndex()].image}
              alt={schoolLifeData[getPrevIndex()].title}
              className="w-full h-full object-cover rounded-l-2xl opacity-60"
            />
            <div className="absolute inset-0 bg-black/20 rounded-l-2xl"></div>
          </div>

          {/* Main Center Image */}
          <div className="relative flex-1 max-w-4xl h-full mx-2 sm:mx-4 lg:mx-0">
            <img
              src={schoolLifeData[currentIndex].image}
              alt={schoolLifeData[currentIndex].title}
              className="w-full h-full object-cover rounded-xl sm:rounded-2xl lg:rounded-none shadow-xl sm:shadow-2xl"
            />

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-3 sm:p-4 md:p-6 lg:p-8 rounded-b-xl sm:rounded-b-2xl lg:rounded-none">
              <h3 className="text-base sm:text-lg md:text-xl lg:text-3xl font-bold text-white text-center">
                {schoolLifeData[currentIndex].title.toUpperCase()}
              </h3>
            </div>

            {/* Navigation Arrows */}
            <Button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 sm:p-3 lg:p-4 backdrop-blur-sm"
              style={{
                clipPath:
                  "polygon(0 0, 70% 0, 100% 50%, 70% 100%, 0 100%, 30% 50%)",
              }}
              icon={
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
              }
            />

            <Button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 sm:p-3 lg:p-4 backdrop-blur-sm"
              style={{
                clipPath:
                  "polygon(30% 0, 100% 0, 70% 50%, 100% 100%, 30% 100%, 0 50%)",
              }}
              icon={
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
              }
            />
          </div>

          {/* Right Image */}
          <div className="hidden lg:block relative w-64 h-full">
            <img
              src={schoolLifeData[getNextIndex()].image}
              alt={schoolLifeData[getNextIndex()].title}
              className="w-full h-full object-cover rounded-r-2xl opacity-60"
            />
            <div className="absolute inset-0 bg-black/20 rounded-r-2xl"></div>
          </div>
        </div>

        {/* Mobile Navigation Dots */}
        <div className="flex justify-center mt-4 sm:mt-6 space-x-2 lg:hidden">
          {schoolLifeData.map((_, index) => (
            <Button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
                index === currentIndex ? "bg-third-color scale-125" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreSchoolLife;
