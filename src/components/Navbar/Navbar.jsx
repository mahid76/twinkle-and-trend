import React from "react";
import Containar from "../layout/Container";

const Navbar = () => {
  return (
    <nav className="bg-[#1e2328] text-white py-2">
      <Containar>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        
        <div className="text-xl font-bold tracking-wider">
          Twincle
        </div>

        
        <ul className="hidden md:flex items-center gap-10 text-sm text-gray-300">
          <li className="hover:text-white px-8 py-4 cursor-pointer">Products</li>
          <li className="hover:text-white px-8 py-4 cursor-pointer">Services</li>
          <li className="hover:text-white px-8 py-4 cursor-pointer">About</li>
        </ul>

        
        <button className="bg-[#FF69B4] cursor-pointer hover:bg-[#FF10F0] px-5 py-2 rounded-full text-sm font-medium transition">
          Contact
        </button>

      </div>
      </Containar>
    </nav>
  );
};

export default Navbar;