import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();
  const hoverTimeout = useRef(null);


  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/contact", label: "Contact" },
  ];

  const services = [
    { path: "/registration", label: "Registration" },
    { path: "/quizcreation", label: "Quiz Creation" },
    { path: "/teachercontrol", label: "Teacher Control" },
    { path: "/report", label: "Report Generation" },
    { path: "/settings", label: "Settings" },
  ];

  const isActiveLink = (path) => location.pathname === path;

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white/90 backdrop-blur-lg border-b border-gray-200/60 text-gray-800 px-6 py-4 flex justify-between items-center fixed top-0 w-full z-50 shadow-sm">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">Q</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:from-indigo-700 group-hover:to-purple-700 transition-all duration-300">
            QuizQuest-3
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                isActiveLink(item.path)
                  ? "text-indigo-600 bg-indigo-50 font-semibold"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Services Dropdown */}
          <div
  className="relative group"
  onMouseEnter={() => {
    clearTimeout(hoverTimeout.current);
    setIsServicesOpen(true);
  }}
  onMouseLeave={() => {
    hoverTimeout.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 200); // adds a 200ms delay
  }}
>

            <button
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center ${
                isServicesOpen
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
              }`}
            >
              Services
              <svg
                className={`ml-2 w-4 h-4 transition-transform duration-300 ${
                  isServicesOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isServicesOpen && (
              <div
  className={`absolute left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg w-56 py-2 z-50 transform transition-all duration-200 ease-out ${
    isServicesOpen
      ? "opacity-100 translate-y-0 visible"
      : "opacity-0 -translate-y-2 invisible"
  }`}
>

                {services.map((srv) => (
                  <Link
                    key={srv.path}
                    to={srv.path}
                    className="block px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
                  >
                    {srv.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            to="/registration"
            className="px-6 py-2 border-2 border-indigo-600 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-300 hover:shadow-lg"
          >
            Sign Up
          </Link>
          <Link
            to="/dashboard"
            className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Dashboard
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <div className="w-6 h-6 flex flex-col justify-center space-y-1">
            <span
              className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </div>
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      <div
        className={`fixed top-16 left-0 w-full bg-white/95 backdrop-blur-lg border-b border-gray-200/60 shadow-lg z-40 transition-all duration-300 md:hidden ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-6 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                isActiveLink(item.path)
                  ? "text-indigo-600 bg-indigo-50 font-semibold border-l-4 border-indigo-600"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Services Collapsible for Mobile */}
          <div>
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="w-full text-left px-4 py-3 rounded-xl font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 flex justify-between items-center"
            >
              Services
              <svg
                className={`ml-2 w-4 h-4 transition-transform duration-300 ${
                  isServicesOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isServicesOpen && (
              <div className="pl-6 space-y-2">
                {services.map((srv) => (
                  <Link
                    key={srv.path}
                    to={srv.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 rounded-lg"
                  >
                    {srv.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}

export default Navbar;
