import React from "react";

const ContactCard = ({
  icon,
  title,
  children,
  gradient,
  bgColor,
  textColor,
}) => {
  return (
    <div className="group bg-white shadow-xl rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
      {/* Icon */}
      <div
        className={`bg-linear-to-br ${gradient} rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold mb-4 text-gray-800">{title}</h3>

      {/* SAME CONTENT (custom) */}
      {children}
    </div>
  );
};

export default ContactCard;
