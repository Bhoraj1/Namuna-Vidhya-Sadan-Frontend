import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";

const navItems = [
  { key: "HOME", path: "/" },
  { key: "ABOUT US", path: "/about" },
  { key: "OUR TEAM", path: "/team" },
  {
    key: "ACADEMICS",
    children: [
      { key: "Events", path: "/academics/events" },
      { key: "Achievements", path: "/academics/achievements" },
      { key: "Question Bank", path: "/academics/question-bank" },
    ],
  },
  { key: "GALLERY", path: "/gallery" },
  { key: "BLOG", path: "/blog" },
  { key: "NOTICE", path: "/notice" },
  { key: "VACANCY", path: "/vacancy" },
  { key: "CONTACT", path: "/contact" },
];

const quickItems = [
  { key: "HOME", path: "/" },
  { key: "GALLERY", path: "/gallery" },
  { key: "NOTICE", path: "/notice" },
  { key: "CONTACT", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const isParentActive = (children) =>
    children?.some((sub) => location.pathname === sub.path);

  return (
    <>
      {/* ── DESKTOP ── */}
      <div className="hidden lg:block sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-center gap-x-8 px-10 py-4">
          {navItems.map((item) => (
            <div key={item.key} className="group relative">
              {item.children ? (
                <>
                  <button
                    className={`flex items-center gap-0.5 text-[15px] font-medium transition-colors duration-150 ${
                      isParentActive(item.children)
                        ? "text-green-600"
                        : "text-slate-600 hover:text-green-600"
                    }`}
                  >
                    {item.key}
                    <HiChevronDown className="text-sm" />
                  </button>

                  <ul className="absolute left-0 top-5 min-w-[200px] bg-white shadow-lg z-50 max-h-0 overflow-hidden group-hover:max-h-[500px] group-hover:pb-3 group-hover:pt-4 px-5 transition-all duration-300 opacity-0 group-hover:opacity-100">
                    {item.children.map((sub) => (
                      <li
                        key={sub.key}
                        className="border-b border-gray-200 py-2 last:border-0"
                      >
                        <Link
                          to={sub.path}
                          className={`block text-[14px] font-medium transition-colors duration-150 ${
                            location.pathname === sub.path
                              ? "text-green-600"
                              : "text-gray-600 hover:text-green-600"
                          }`}
                        >
                          {sub.key}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`block text-[15px] font-medium transition-colors duration-150 ${
                    isActive(item.path)
                      ? "text-green-600"
                      : "text-slate-600 hover:text-green-600"
                  }`}
                >
                  {item.key}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── MOBILE: sticky bar ── */}
      <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center px-4 h-12 gap-2">
          {/* 4 quick links evenly spaced */}
          <div className="flex items-center justify-between flex-1">
            {quickItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`text-xs font-medium transition-colors ${
                  isActive(item.path) ? "text-green-600" : "text-slate-600"
                }`}
              >
                {item.key}
              </Link>
            ))}
          </div>
          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="shrink-0 ml-3 text-gray-600 hover:text-green-600 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <HiX size={22} /> : <HiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* ── MOBILE: drawer ── */}
      {open && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/40 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="lg:hidden fixed top-0 left-0 h-full w-[300px] bg-white shadow-md z-50 flex flex-col overflow-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <span className="text-sm font-semibold text-gray-700">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-green-600"
              >
                <HiX size={20} />
              </button>
            </div>

            <ul className="p-6 space-y-3">
              {navItems.map((item) => (
                <li
                  key={item.key}
                  className="border-b border-gray-200 pb-3 last:border-0"
                >
                  {item.children ? (
                    <>
                      <button
                        onClick={() =>
                          setMobileDropdown(
                            mobileDropdown === item.key ? null : item.key,
                          )
                        }
                        className={`w-full flex justify-between items-center text-[15px] font-medium transition-colors ${
                          isParentActive(item.children)
                            ? "text-green-600"
                            : "text-slate-600"
                        }`}
                      >
                        {item.key}
                        <HiChevronDown
                          className={`text-sm transition-transform duration-200 ${
                            mobileDropdown === item.key ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {mobileDropdown === item.key && (
                        <ul className="mt-2 ml-3 space-y-2">
                          {item.children.map((sub) => (
                            <li key={sub.key}>
                              <Link
                                to={sub.path}
                                onClick={() => {
                                  setOpen(false);
                                  setMobileDropdown(null);
                                }}
                                className={`block text-[14px] font-medium transition-colors ${
                                  location.pathname === sub.path
                                    ? "text-green-600"
                                    : "text-gray-500 hover:text-green-600"
                                }`}
                              >
                                {sub.key}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={`block text-[15px] font-medium transition-colors ${
                        isActive(item.path)
                          ? "text-green-600"
                          : "text-slate-600 hover:text-green-600"
                      }`}
                    >
                      {item.key}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
