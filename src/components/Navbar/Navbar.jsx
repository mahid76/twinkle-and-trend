import React, { useState, useRef, useEffect } from "react";
import logo from '../../assets/logo.png'

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Click Outside Handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full relative z-50 bg-gradient-to-r from-gray-800 to-gray-700 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2 px-4">

        {/* Logo */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-auto mr-4"
          />
          <span className="text-lg font-bold hidden md:block">Twinkle and Trend</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-sm items-center">
          <li className="hover:text-gray-300 px-6 py-3 cursor-pointer">Home</li>
          <li className="hover:text-gray-300 px-6 py-3 cursor-pointer">Offers</li>

          {/* Categories Dropdown - Desktop */}
          <li className="relative group" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="px-6 py-3 hover:text-gray-300 cursor-pointer flex items-center gap-1"
            >
              Categories
              <svg className={`w-4 h-4 transform transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <ul className={`absolute top-12 left-0 bg-white text-gray-800 w-48 rounded-md shadow-lg transition-all duration-200 z-50 ${
              open ? 'opacity-100 visible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'
            }`}>
              <li className="px-4 py-3 hover:bg-gray-100 rounded-md cursor-pointer text-sm font-medium">
                Electronics
              </li>
              <li className="px-4 py-3 hover:bg-gray-100 rounded-md cursor-pointer text-sm font-medium">
                Fashion
              </li>
              <li className="px-4 py-3 hover:bg-gray-100 rounded-md cursor-pointer text-sm font-medium">
                Books
              </li>
              <li className="px-4 py-3 hover:bg-gray-100 rounded-md cursor-pointer text-sm font-medium">
                Home & Kitchen
              </li>
            </ul>
          </li>

          <li className="hover:text-gray-300 cursor-pointer">Contact Us</li>
        </ul>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center">
          <input
            type="text"
            placeholder="Search here..."
            className="px-3 py-1 text-black bg-amber-50 rounded-l-md outline-none w-48 focus:w-64 transition-all duration-300"
          />
          <button className="bg-teal-500 px-4 py-1 rounded-r-md hover:bg-teal-600">
            Search
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <ul className="flex flex-col space-y-2 p-4">
            <li className="hover:text-gray-300 px-4 py-3 cursor-pointer">Home</li>
            <li className="hover:text-gray-300 px-4 py-3 cursor-pointer">Offers</li>

            {/* Mobile Categories Dropdown */}
            <li>
              <button
                onClick={() => setOpen(!open)}
                className="w-full text-left px-4 py-3 hover:text-gray-300 cursor-pointer flex justify-between items-center"
              >
                <span className="font-medium">Categories</span>
                <svg className={`w-4 h-4 transform transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {open && (
                <ul className="ml-4 mt-2 space-y-2 bg-white rounded-md shadow-lg p-2">
                  <li className="px-4 py-3 hover:bg-gray-100 rounded-md cursor-pointer text-sm font-medium text-gray-800">
                    Electronics
                  </li>
                  <li className="px-4 py-3 hover:bg-gray-100 rounded-md cursor-pointer text-sm font-medium text-gray-800">
                    Fashion
                  </li>
                  <li className="px-4 py-3 hover:bg-gray-100 rounded-md cursor-pointer text-sm font-medium text-gray-800">
                    Books
                  </li>
                  <li className="px-4 py-3 hover:bg-gray-100 rounded-md cursor-pointer text-sm font-medium text-gray-800">
                    Home & Kitchen
                  </li>
                </ul>
              )}
            </li>

            <li className="hover:text-gray-300 px-4 py-3 cursor-pointer">Contact Us</li>
          </ul>

          {/* Mobile Search Bar */}
          <div className="px-4 py-3 border-t border-gray-700">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search here..."
                className="px-3 py-2 text-black bg-amber-50 rounded-l-md outline-none w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button className="bg-teal-500 px-4 py-2 rounded-r-md hover:bg-teal-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;