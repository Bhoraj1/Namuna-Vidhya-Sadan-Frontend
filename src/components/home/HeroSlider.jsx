import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useGetSlidesQuery } from "../../redux/features/SiteSlice.js";
import { Link } from "react-router-dom";
import ErrorMessage from "../shared/ErrorMessage";
import { HomeSkeleton } from "../skeleton/HomeSkeleton.jsx";
import { SCHOOL_NAME, heroSlides } from "../../data/siteData.js";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSlider = () => {
  const { data: _slidesData, isLoading, error } = useGetSlidesQuery();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  if (isLoading) return <HomeSkeleton />;
  if (error)
    return <ErrorMessage message={error?.data?.message || "Failed to load slides."} />;

  const handleSlideChange = (swiper) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(swiper.realIndex);
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <section id="home" className="relative h-[85vh] min-h-[520px] overflow-hidden bg-slate-900">

      {/* Background Swiper */}
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        speed={1200}
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: false }}
        navigation={{ nextEl: ".hero-next", prevEl: ".hero-prev" }}
        onSlideChange={handleSlideChange}
        loop={true}
        className="h-full w-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[8000ms]"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              {/* Dark gradient overlay — stronger on left for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/20" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Content — left aligned */}
      <div className="absolute inset-0 z-20 flex items-center px-6 sm:px-12 lg:px-24">
        <div className="max-w-2xl">

          {/* School name tag */}
          <div
            className={`flex items-center gap-3 mb-5 transition-all duration-700 ${
              !isTransitioning ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="w-8 h-px bg-yellow-400" />
            <span className="text-yellow-400 text-xs font-semibold uppercase tracking-[0.2em]">
              {SCHOOL_NAME}
            </span>
          </div>

          {/* Title */}
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-6 transition-all duration-700 delay-100 ${
              !isTransitioning ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {heroSlides[activeIndex]?.title}
          </h1>

          {/* Subtitle */}
          <p
            className={`text-white/70 text-base sm:text-lg mb-10 leading-relaxed max-w-lg transition-all duration-700 delay-200 ${
              !isTransitioning ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Nurturing young minds with quality education, strong values, and a vision for a brighter future.
          </p>

          {/* Buttons */}
          <div
            className={`flex flex-wrap items-center gap-4 transition-all duration-700 delay-300 ${
              !isTransitioning ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <Link
              to="/about"
              className="px-7 py-3 bg-yellow-400 text-gray-900 text-sm font-semibold tracking-wide hover:bg-yellow-300 transition-colors duration-200"
            >
              Discover More
            </Link>
            <Link
              to="/gallery"
              className="px-7 py-3 border border-white/60 text-white text-sm font-semibold tracking-wide hover:bg-white hover:text-gray-900 transition-colors duration-200"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </div>

      {/* Nav arrows — bottom right */}
      <div className="absolute bottom-6 right-6 z-30 hidden sm:flex items-center gap-2">
        <button className="hero-prev w-10 h-10 flex items-center justify-center border border-white/30 text-white hover:bg-white hover:text-gray-900 transition-colors duration-200">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="hero-next w-10 h-10 flex items-center justify-center border border-white/30 text-white hover:bg-white hover:text-gray-900 transition-colors duration-200">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Vertical slide dots — right side */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-2">
        {heroSlides.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-1.5 h-6 bg-yellow-400" : "w-1.5 h-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>

    </section>
  );
};

export default HeroSlider;
