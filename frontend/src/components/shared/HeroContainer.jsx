import React from "react";
import { Link } from "react-router-dom";

const HeroContainer = ({ title, subtitle, bgImage, className = "" }) => {
  return (
    <div className="relative">
      <div
        className={`relative  min-h-[70vh]  overflow-hidden bg-slate-900 ${className}`}
      >
        {bgImage && (
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
        )}
        <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/40 to-black/20" />

        <div className="absolute inset-0 flex items-center px-6 sm:px-12 lg:px-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-yellow-400" />
              <span className="text-yellow-400 text-xs font-semibold uppercase tracking-[0.2em]">
                Namuna Vidhya Sadan
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4 capitalize"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {title}
            </h1>

            {subtitle && (
              <p className="text-white/70 text-base mb-8 leading-relaxed max-w-lg capitalize">
                {subtitle}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/"
                className="px-7 py-3 bg-yellow-400 text-gray-900 text-sm font-semibold tracking-wide hover:bg-yellow-300 transition-colors duration-200"
              >
                Home
              </Link>
              <span className="px-7 py-3 border border-white/60 text-white text-sm font-semibold tracking-wide capitalize">
                {title}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className=" z-20 flex flex-col bg-white py-4 justify-center items-center w-full">
        {/* Sano Decorative Line */}
        <div className="flex items-center gap-4 w-full max-w-lg px-6">
          <div className="flex-1 h-0.5 bg-yellow-300" /> {/* Left Line */}
          <div className="flex flex-col items-center">
            {/* Dots Design */}
            <div className="flex gap-1 mb-2">
              <div className="w-1 h-1 bg-yellow-500 rounded-full" />
              <div className="w-1 h-1 bg-green-500 rounded-full" />
              <div className="w-1 h-1 bg-blue-500 rounded-full" />
            </div>

            {/* School Name */}
            <span className="text-yellow-500 text-xs md:text-sm tracking-[0.4em] uppercase font-black text-center">
              Namuna Vidhya Sadan School
            </span>
          </div>
          <div className="flex-1 h-0.5 bg-yellow-300" /> {/* Right Line */}
        </div>
      </div>
    </div>
  );
};

export default HeroContainer;
