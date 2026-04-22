import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import HeroContainer from "../components/shared/HeroContainer";
import bgImg from "../assets/img/scphoto.jpg";
import { Data } from "../data/alldata.js";

const Contact = () => {
  const info = Data[0];
  return (
    <div className="w-full">
      {/* Hero Section */}
      <HeroContainer
        bgImage={bgImg}
        title="Contact Us"
        subtitle="Get in touch with us"
      />

      <section className="py-8 sm:py-12 md:py-16 px-2 sm:px-4 lg:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Top Section (Row wise) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-14 md:mb-16">
            {/* Contact Info */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                Contact Information
              </h3>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <FaMapMarkerAlt className="text-blue-600 mt-1 text-sm sm:text-base" />
                  <div>
                    <p className="font-medium text-sm sm:text-base">Address</p>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Pipari, Kohalpur Municipality <br />
                      Banke District, Nepal
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <FaPhoneAlt className="text-green-600 text-sm sm:text-base" />
                  <div>
                    <p className="font-medium text-sm sm:text-base">Phone</p>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      {info.contact.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <FaEnvelope className="text-purple-600 text-sm sm:text-base" />
                  <div>
                    <p className="font-medium text-sm sm:text-base">Email</p>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      {info.contact.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="bg-blue-100 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                  <FaClock className="text-blue-600 text-base sm:text-lg" />
                </div>
                <h3 className="text-lg sm:text-2xl font-semibold">
                  Office Hours
                </h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between p-2 sm:p-3 bg-gray-50 rounded text-sm sm:text-base">
                  <span>Sunday - Thursday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between p-2 sm:p-3 bg-gray-50 rounded text-sm sm:text-base">
                  <span>Friday</span>
                  <span>10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between p-2 sm:p-3 bg-red-50 rounded text-sm sm:text-base">
                  <span>Saturday</span>
                  <span className="text-red-600">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map - Full Width */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.8461678610047!2d81.7104415754855!3d28.211985975897036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39986ff879bd2e89%3A0x9cb027fc883c0989!2sNamuna%20Vidhya%20Sadan!5e0!3m2!1sen!2snp!4v1774322539650!5m2!1sen!2snp"
              width="100%"
              height="450"
              className="sm:h-125 md:h-137.5 lg:h-150 block"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
