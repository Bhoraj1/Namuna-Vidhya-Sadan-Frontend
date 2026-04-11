import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { FaFacebook, FaTiktok } from "react-icons/fa";
import logo from "../../assets/img/namunalogo.png";

const contactLinks = [
  { href: "mailto:namuna2063@gmail.com", icon: Mail, label: "namuna2063@gmail.com" },
  { href: "tel:081414036", icon: Phone, label: "081-414 036" },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/p/Namuna-Vidhya-Sadan-EM-Secondary-School-100057264595833/",
    icon: FaFacebook,
    name: "Facebook",
  },
  {
    href: "https://www.tiktok.com/@namunavidhyasadan2063?lang=en-GB",
    icon: FaTiktok,
    name: "TikTok",
  },
];

const Header = () => (
  <header className="border-b border-gray-300 bg-white min-h-[70px] tracking-wide relative z-50">
    <div className="flex items-center relative py-2 px-4 sm:px-10 min-h-[70px]">

      {/* Logo — left */}
      <Link to="/" className="flex items-center gap-3 shrink-0">
        <img src={logo} alt="logo" className="w-12 h-12 rounded-full object-cover" />
        <div className="hidden sm:block">
          <h1 className="text-lg font-extrabold leading-tight">
            <span className="text-primary-color">NAMUNA</span>{" "}
            <span className="text-secondary-color">VIDHYA</span>{" "}
            <span className="text-gray-700">SADAN</span>
          </h1>
          <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-500">Excellence in Education</p>
        </div>
      </Link>

      {/* Mobile center: school name */}
      <div className="sm:hidden flex-1 text-center">
        <h1 className="text-sm font-extrabold leading-tight">
          <span className="text-primary-color">NAMUNA</span>{" "}
          <span className="text-secondary-color">VIDHYA</span>{" "}
          <span className="text-gray-700">SADAN</span>
        </h1>
      </div>

      {/* Right: contact + social */}
      <div className="lg:absolute lg:right-10 flex items-center ml-auto sm:ml-auto gap-5">
        {contactLinks.map(({ href, icon: Icon, label }) => (
          <a key={href} href={href} className="hidden lg:flex items-center gap-1.5 text-gray-600 hover:text-green-600 transition-colors text-sm">
            <Icon size={15} />
            <span>{label}</span>
          </a>
        ))}
        <div className="hidden lg:block w-px h-6 bg-gray-300" />
        {socialLinks.map(({ href, icon: Icon, name }) => (
          <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600 transition-colors">
            <Icon size={20} />
          </a>
        ))}
      </div>
    </div>
  </header>
);

export default Header;
