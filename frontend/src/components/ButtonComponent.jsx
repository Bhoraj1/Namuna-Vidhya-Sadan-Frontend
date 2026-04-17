import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  children,
  to,
  href,
  onClick,
  className = "",
  disabled = false,
  loading = false,
  size = "md",
  variant = "primary",
  type = "button",
  fullWidth = false,
  icon,
  iconPosition = "left",
  target,
  rel,
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-nonefocus:ring-offset-2 transform hover:scale-100 active:scale-100";

  const sizeStyles = {
    xs: "px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm  gap-1",
    sm: "px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm gap-1.5",
    md: "px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base g gap-2",
    lg: "px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base  gap-2",
    xl: "px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl  gap-3",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl focus:ring-blue-500",
    secondary:
      "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white shadow-lg hover:shadow-xl focus:ring-gray-500",
    success:
      "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl focus:ring-green-500",
    danger:
      "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl focus:ring-red-500",
    warning:
      "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl focus:ring-yellow-500",
    info: "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl focus:ring-cyan-500",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500 bg-transparent",
    hero: "relative bg-third-color hover:bg-third-color/90 text-white shadow-[0_0_15px_rgba(34,63,162,0.4)] hover:shadow-[0_0_22px_rgba(34,63,162,0.6)] focus:ring-third-color tracking-widest uppercase",
    heroOutline:
      "relative border border-third-color text-white hover:bg-third-color hover:text-white shadow-[0_0_10px_rgba(34,63,162,0.08)] hover:shadow-[0_0_16px_rgba(34,63,162,0.18)] focus:ring-third-color tracking-widest uppercase bg-transparent",
    ghost: "text-blue-600 hover:bg-blue-50 focus:ring-blue-500 bg-transparent",
    light:
      "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm hover:shadow focus:ring-gray-500",
  };

  const finalClass = `${baseStyle} ${sizeStyles[size]} ${className || variantStyles[variant]} ${
    fullWidth ? "w-full" : ""
  } ${
    loading
      ? "opacity-50 cursor-not-allowed pointer-events-none"
      : disabled
        ? "cursor-default pointer-events-none"
        : "cursor-pointer"
  }`;

  const renderContent = () => (
    <>
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {icon && iconPosition === "left" && !loading && <span>{icon}</span>}
      {children}
      {icon && iconPosition === "right" && !loading && <span>{icon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={finalClass} aria-disabled={disabled} {...props}>
        {renderContent()}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={finalClass}
        target={target}
        rel={rel}
        aria-disabled={disabled}
        {...props}
      >
        {renderContent()}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={finalClass}
      type={type}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
