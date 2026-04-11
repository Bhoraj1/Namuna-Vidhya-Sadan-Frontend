import React from "react";
import { BookOpen, Users, Microscope, Award, Globe, Heart } from "lucide-react";
import home2 from "../../assets/img/home/home2.jpg";
import home3 from "../../assets/img/home/home3.jpg";
import home4 from "../../assets/img/home/home4.jpg";
import home5 from "../../assets/img/home/home5.jpg";
import home6 from "../../assets/img/home/home6.jpg";

const features = [
  {
    icon: BookOpen,
    title: "Quality Education & Academic Excellence",
    description: "Comprehensive curriculum with innovative teaching methods and experienced faculty.",
  },
  {
    icon: Users,
    title: "Expert Teachers & Mentorship",
    description: "Dedicated teachers providing personalized attention and guidance to every student.",
  },
  {
    icon: Microscope,
    title: "Modern Labs & Advanced Facilities",
    description: "State-of-the-art labs, smart classrooms, and well-equipped libraries.",
  },
  {
    icon: Award,
    title: "Proven Track Record & Success",
    description: "15+ years of excellence with students accepted into prestigious institutions.",
  },
  {
    icon: Globe,
    title: "Global Perspective & Future Ready",
    description: "International standards, language programs, and critical thinking focus.",
  },
  {
    icon: Heart,
    title: "Holistic Development & Character Building",
    description: "Sports, arts, and community service for well-rounded student growth.",
  },
];

const schoolImages = [home2, home3, home4, home5, home6, home3];

const WhyChooseUs = () => {
  return (
    <section className="py-12 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left Side */}
          <div>
            {/* Heading */}
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-green-600">Why Choose Us</span>
              <h2 className="mt-2 text-3xl lg:text-4xl font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                Why <span className="text-third-color">N</span><span className="text-primary-color">V</span><span className="text-secondary-color">S</span>
              </h2>
              <div className="mt-3 w-12 h-0.5 bg-green-600" />
            </div>

            {/* Feature list */}
            <div className="space-y-6">
              {features.map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  {/* Icon */}
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-white border border-gray-100 shadow-sm flex items-center justify-center group-hover:bg-secondary-color group-hover:border-secondary-color transition-all duration-300">
                    <item.icon className="w-5 h-5 text-secondary-color group-hover:text-white transition-colors duration-300" />
                  </div>
                  {/* Text */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 group-hover:text-secondary-color transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-gray-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side — Image Grid */}
          <div className="relative mt-6 lg:mt-0">
            <div className="hidden sm:block absolute -top-6 -right-6 w-48 h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl -z-10 rotate-12 opacity-50" />
            <div className="hidden sm:block absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl -z-10 -rotate-12 opacity-50" />

            <div className="bg-white p-3 rounded-2xl shadow-md">
              <div className="grid grid-cols-3 gap-2 rounded-xl overflow-hidden">
                {schoolImages.map((image, index) => (
                  <div key={index} className="relative overflow-hidden h-32 sm:h-40 lg:h-44 rounded-lg group">
                    <img
                      src={image}
                      alt={`School life ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
