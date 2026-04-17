import React from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebook,
  FaArrowUp,
} from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { BsTelephoneOutboundFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import logo from "../../assets/img/namunalogo.png";
import Button from "../ButtonComponent.jsx";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScroll, setShowScroll] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Data (Dynamic Structure)
  const footerData = {
    quickLinks: [
      { name: "Home", path: "/" },
      { name: "About Us", path: "/about" },
      { name: "Events", path: "/academics/events" },
      { name: "Gallery", path: "/gallery" },
      { name: "Notices", path: "/notice" },
    ],
    programs: [
      "+2 Science",
      "+2 Management",
      "Entrance Preparation",
      "Scholarship Program",
      "Career Counseling",
    ],
    socialLinks: [
      {
        icon: <FaFacebook />,
        link: "https://www.facebook.com/p/Namuna-Vidhya-Sadan-EM-Secondary-School-100057264595833",
      },
      {
        icon: <FaTiktok />,
        link: "https://www.tiktok.com/@namunavidhyasadan2063?lang=en-GB",
      },
    ],
    contact: {
      address: "Pipari, Kohalpur Municipality, Banke District, Nepal",
      phone: "081-414036",
      email: "namuna2063@gmail.com",
    },
  };

  return (
    <footer className="relative bg-slate-900 text-white overflow-hidden">
      {/* Simple Background Effects */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary-color/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary-color/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
        {/* About */}
        <div className="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 w-full">
            <div className="p-1">
              <Link to="/" onClick={scrollToTop}>
                <img
                  src={logo}
                  alt="Logo"
                  className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain rounded-full cursor-pointer hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold leading-tight">
              <span className="text-primary-color">NAMUNA</span>{" "}
              <span className="text-secondary-color">VIDHYA</span>{" "}
              <span className="text-white">SADAN</span>
            </h3>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed">
            Established in 2062 B.S., we provide quality education with modern
            teaching methods and holistic student development.
          </p>

          {/* Social Links */}
          <div className="flex gap-2">
            {footerData.socialLinks.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full transition-all duration-300 hover:scale-110"
              >
                <span className="text-base text-black">{item.icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-primary-color">
            Quick Links
          </h4>
          <ul className="space-y-2">
            {footerData.quickLinks.map((item, index) => (
              <li key={index}>
                <Link
                  onClick={scrollToTop}
                  to={item.path}
                  className="text-gray-300 hover:text-primary-color text-sm transition-colors duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Programs */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-primary-color">
            Programs
          </h4>
          <ul className="space-y-2">
            {footerData.programs.map((program, index) => (
              <li key={index}>
                <span className="text-gray-300 hover:text-primary-color text-sm transition-colors duration-300 cursor-pointer">
                  {program}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="sm:col-span-2 lg:col-span-1">
          <h4 className="text-lg font-bold mb-4 text-primary-color">Contact</h4>

          <div className="space-y-3">
            <div className="flex gap-2 items-start">
              <div className="p-1  rounded-full transition-all duration-300 hover:scale-110">
                <FaMapMarkerAlt className="text-white text-sm" />
              </div>
              <p className="text-gray-300 text-sm">
                {footerData.contact.address}
              </p>
            </div>

            <div className="flex gap-2 items-center">
              <div className="p-1 rounded-full transition-all duration-300 hover:scale-110">
                <BsTelephoneOutboundFill className="text-white text-sm" />
              </div>
              <a
                href="tel:081414036"
                className="text-gray-300 hover:text-primary-color text-sm transition-colors duration-300"
              >
                {footerData.contact.phone}
              </a>
            </div>

            <div className="flex gap-2 items-center">
              <div className="p-1   rounded-full transition-all duration-300 hover:scale-110">
                <FaEnvelope className="text-white text-sm" />
              </div>
              <a
                href={`mailto:${footerData.contact.email}`}
                className="text-gray-300 hover:text-primary-color text-sm transition-colors duration-300 break-all"
              >
                {footerData.contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/20 py-4 px-4 sm:px-6 lg:px-8 mx-4 sm:mx-6 lg:mx-10 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-3 sm:gap-0">
        {/* Left */}
        <div className="text-gray-400 text-sm">
          © {currentYear} Namuna Bidhya Sadan. All rights reserved.
        </div>

        {/* Right */}
        <div className="text-gray-400 text-sm mr-2">
          Powered by{" "}
          <a
            href="https://nextinfosys.com.np/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="font-semibold text-primary-color hover:text-secondary-color cursor-pointer transition-colors duration-300">
              Next Infosys Pvt. Ltd
            </span>
          </a>
        </div>
      </div>

      {/* Scroll Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 w-12 h-12 bg-third-color text-white rounded-full   transition-all duration-300 flex items-center justify-center   focus:ring-third-color "
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-base" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
