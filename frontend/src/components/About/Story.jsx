import React from "react";
import home3 from "../../assets/img/home/home3.jpg";
import student1 from "../../assets/img/home/home4.jpg";
import home12 from "../../assets/img/home/home12.jpg";

const storyItems = [
  {
    year: "2063 B.S.",
    title: "Foundation & Vision",
    text: "Namuna Vidya Sadan was established in Kohalpur with the main objective of providing quality education to the children of this region.",
  },
  {
    year: "Growth",
    title: "Growth & Progress",
    text: "Through years of dedicated effort, Namuna Vidya Sadan has become one of the most respected educational institutions in Kohalpur and the surrounding areas.",
  },
  {
    year: "Today",
    title: "Commitment & Future",
    text: "The school remains committed to its founding principles — nurturing knowledge, integrity, and responsibility while preparing students for a bright future.",
  },
];

const images = [
  { src: home3, alt: "Students in lab" },
  { src: student1, alt: "Learning Environment" },
  { src: home12, alt: "Dance program" },
];

const Story = () => {
  return (
    <section className="py-12 lg:py-20 ">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section heading */}
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-green-600">
            About Us
          </span>
          <h2
            className="mt-2 text-3xl lg:text-4xl font-bold text-gray-800"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Story
          </h2>
          <div className="mt-3 w-12 h-0.5 bg-green-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-13 top-0 bottom-0 w-px bg-gray-200" />

            <div className="space-y-10">
              {storyItems.map((item, i) => (
                <div key={i} className="flex gap-6">
                  {/* Year badge */}
                  <div className="shrink-0 w-18 flex flex-col items-center pt-1">
                    <div className="w-3 h-3 rounded-full bg-green-600 ring-4 ring-green-100 z-10" />
                    <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-green-600 text-center leading-tight">
                      {item.year}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="pb-2">
                    <h3 className="text-base font-semibold text-gray-800 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Images */}
          <div className="grid grid-cols-1 gap-3">
            {images.map((img, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-xl shadow-sm group"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                <p className="absolute bottom-3 left-4 text-white text-xs font-medium capitalize">
                  {img.alt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
