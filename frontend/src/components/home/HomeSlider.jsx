import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { slides as homeslider } from "../../data/heroSliderData.js";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSlider = () => {
  const slides = homeslider;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSlideChange = (swiper) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(swiper.realIndex);
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <section
      id="home"
      className="relative h-[85vh] min-h-130 overflow-hidden bg-slate-900"
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        speed={1200}
        autoplay={{ delay: 5000 }}
        navigation={{ nextEl: ".hero-next", prevEl: ".hero-prev" }}
        onSlideChange={handleSlideChange}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-8000"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/40 to-black/20" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center px-6 sm:px-12 lg:px-24">
        <div className="max-w-2xl">
          <div
            className={`flex items-center gap-3 mb-5 transition-all duration-700 ${
              !isTransitioning
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="w-8 h-px bg-yellow-400" />
            <span className="text-yellow-400 text-xs font-semibold uppercase tracking-[0.2em]">
              Namuna Vidhya Sadan
            </span>
          </div>

          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-700 ${
              !isTransitioning
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            {slides[activeIndex]?.title}
          </h1>

          <p className="text-white/70 text-lg mb-10">
            {slides[activeIndex]?.subtitle}
          </p>

          <div className="flex gap-4">
            <Link to="/about" className="px-7 py-3 bg-yellow-400 text-gray-900">
              Discover More
            </Link>
            <Link to="/gallery" className="px-7 py-3 border text-white">
              View Gallery
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
