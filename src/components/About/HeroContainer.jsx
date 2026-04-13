import React from "react";
import { Link } from "react-router-dom";

const HeroContainer = ({ title, subtitle, bgImage, className = "" }) => {
  return (
    <div
      className={`relative h-[55vh] min-h-[360px] overflow-hidden bg-slate-900 ${className}`}
    >
      {/* Background image */}
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}

      {/* Overlay — same as HeroSlider */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/20" />

      {/* Content — left aligned like HeroSlider */}
      <div className="absolute inset-0 flex items-center px-6 sm:px-12 lg:px-24">
        <div className="max-w-2xl">
          {/* School name tag */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-yellow-400" />
            <span className="text-yellow-400 text-xs font-semibold uppercase tracking-[0.2em]">
              Namuna Vidhya Sadan
            </span>
          </div>

          {/* Page title */}
          <h1
            className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4 capitalize"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-white/70 text-base mb-8 leading-relaxed max-w-lg capitalize">
              {subtitle}
            </p>
          )}

          {/* Breadcrumb buttons — HeroSlider style */}
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
  );
};

export default HeroContainer;
