import React, { useState } from "react";
import logo from '../../assets/logo.png'

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full relative z-50  bg-[#353535] from-gray-800 to-gray-700 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2">

        {/* Logo */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-auto mr-4"
          />
        </div>

        {/* Menu */}
        <ul className="flex space-x-6 text-sm items-center">

          <li className="hover:text-gray-300 px-6 py-3 cursor-pointer">Home</li>
          <li className="hover:text-gray-300 px-6 py-3 cursor-pointer">Offers</li>

          {/* Categories Dropdown */}
          <li className="relative ">
            <button
              onClick={() => setOpen(!open)}
              className="px-6 py-3 hover:text-gray-300  cursor-pointer"
            >
              Categories
            </button>

            {open && (
              <ul className="absolute top-12 left-5 bg-white text-black w-40 rounded-md shadow-lg">
                <li className="px-4 py-2  hover:bg-gray-100 rounded-md cursor-pointer">
                  Electronics
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
                  Fashion
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
                  Books
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
                  Home & Kitchen
                </li>
              </ul>
            )}
          </li>

          <li className="hover:text-gray-300 cursor-pointer">Contact Us</li>
        </ul>

        {/* Search */}
        <div className="flex">
          <input
            type="text"
            placeholder="Search here..."
            className="px-3 py-1 text-black bg-amber-50 rounded-l-md outline-none"
          />
          <button className="bg-teal-500 px-4 py-1 rounded-r-md hover:bg-teal-600">
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;