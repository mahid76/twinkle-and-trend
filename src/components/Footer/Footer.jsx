// import React from "react";
// import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
// import { FaHeart, FaPhone, FaEnvelope, FaMapMarker } from "react-icons/fa";
// import Container from "../layout/Container";

// const Footer = () => {
//   return (
//     <footer className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
//       <Container>
//         {/* Main Footer Content */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          
//           {/* Company Info */}
//           <div>
//             <h3 className="text-xl font-primary font-bold mb-4">Twinkle and Trend</h3>
//             <p className="text-gray-300 text-sm mb-4">
//               আপনার বিশ্বস্ত অনলাইন শপিং পার্টনার। সেরা পণ্য, সেরা দাম।
//             </p>
//             <div className="flex space-x-4">
//               <a href="#" className="text-gray-300 hover:text-white">
//                 <FaFacebook className="w-5 h-5" />
//               </a>
//               <a href="#" className="text-gray-300 hover:text-white">
//                 <FaTwitter className="w-5 h-5" />
//               </a>
//               <a href="#" className="text-gray-300 hover:text-white">
//                 <FaInstagram className="w-5 h-5" />
//               </a>
//               <a href="#" className="text-gray-300 hover:text-white">
//                 <FaYoutube className="w-5 h-5" />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               <li>
//                 <a href="#" className="text-gray-300 hover:text-white text-sm">
//                   Home
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-300 hover:text-white text-sm">
//                   Shop
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-300 hover:text-white text-sm">
//                   About Us
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-300 hover:text-white text-sm">
//                   Contact
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-300 hover:text-white text-sm">
//                   Blog
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Customer Service */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Customer Service</h3>
//             <ul className="space-y-2">
//               <li>
//                 <a href="#" className="text-gray-300 hover:text-white text-sm">
//                   Track Order
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-300 hover:text-white text-sm">
//                   Returns
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-300 hover:text-white text-sm">
//                   Shipping Info
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-300 hover:text-white text-sm">
//                   FAQ
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-300 hover:text-white text-sm">
//                   Privacy Policy
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Newsletter */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Newsletter</h3>
//             <p className="text-gray-300 text-sm mb-4">
//               আমাদের সাথে থাকতে সাবস্ক্রাইব করুন
//             </p>
//             <div className="flex">
//               <input
//                 type="email"
//                 placeholder="Your email..."
//                 className="px-3 py-2 text-black bg-amber-50 rounded-l-md outline-none w-full"
//               />
//               <button className="bg-teal-500 px-4 py-2 rounded-r-md hover:bg-teal-600">
//                 Subscribe
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Contact Info */}
//         <div className="border-t border-gray-700 mt-8 pt-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="flex items-center space-x-3">
//               <FaPhone className="text-teal-500" />
//               <span className="text-gray-300 text-sm">+880 1234 567890</span>
//             </div>
//             <div className="flex items-center space-x-3">
//               <FaEnvelope className="text-teal-500" />
//               <span className="text-gray-300 text-sm">support@mybrand.com</span>
//             </div>
//             <div className="flex items-center space-x-3">
//               <FaMapMarker className="text-teal-500" />
//               <span className="text-gray-300 text-sm">Dhaka, Bangladesh</span>
//             </div>
//           </div>
//         </div>

//         {/* Payment Methods */}
//         {/* <div className="border-t border-gray-700 mt-8 pt-8">
//           <h3 className="text-lg font-bold mb-4">Payment Methods</h3>
//           <div className="flex space-x-4">
//             <div className="bg-white px-4 py-2 rounded-md">
//               <span className="text-gray-800 text-sm font-medium">Visa</span>
//             </div>
//             <div className="bg-white px-4 py-2 rounded-md">
//               <span className="text-gray-800 text-sm font-medium">MasterCard</span>
//             </div>
//             <div className="bg-white px-4 py-2 rounded-md">
//               <span className="text-gray-800 text-sm font-medium">PayPal</span>
//             </div>
//             <div className="bg-white px-4 py-2 rounded-md">
//               <span className="text-gray-800 text-sm font-medium">bKash</span>
//             </div>
//           </div>
//         </div> */}

//         {/* Copyright */}
//         <div className="border-t border-gray-700 mt-8 pt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <p className="text-gray-400 text-sm">
//               © 2026 Twinkle and Trend. All rights reserved.
//             </p>
//             <div className="flex items-center space-x-2 mt-4 md:mt-0">
//               <FaHeart className="text-red-500" />
//               <span className="text-gray-400 text-sm">Made by Poblaaa</span>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </footer>
//   );
// };

// export default Footer;



// src/components/layout/Footer.jsx

// src/components/layout/Footer.jsx

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#E771A3] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">

          {/* Brand - Full width on mobile */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h2 className="text-2xl font-bold mb-3">
              Twinkle & Trend
            </h2>

            <p className="text-sm text-pink-100 leading-relaxed">
              Discover trendy fashion, toys, electronics and more.
              Bringing style and happiness to your everyday shopping.
            </p>

            {/* Social */}
            <div className="flex gap-4 mt-5">
              <a href="#" className="hover:text-pink-200 transition">
                <i className="ri-facebook-fill text-xl"></i>
              </a>

              <a href="#" className="hover:text-pink-200 transition">
                <i className="ri-instagram-line text-xl"></i>
              </a>

              <a href="#" className="hover:text-pink-200 transition">
                <i className="ri-twitter-x-line text-xl"></i>
              </a>

              <a href="#" className="hover:text-pink-200 transition">
                <i className="ri-youtube-line text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links & Customer Service - Side by side on mobile */}
          <div className="grid grid-cols-2 gap-4 sm:col-span-2 lg:col-span-2">
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">
                Quick Links
              </h3>

              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li>
                  <Link to="/" className="hover:text-pink-200 transition">
                    Home
                  </Link>
                </li>

                <li>
                  <Link to="/products" className="hover:text-pink-200 transition">
                    Products
                  </Link>
                </li>

                <li>
                  <Link to="/about" className="hover:text-pink-200 transition">
                    About Us
                  </Link>
                </li>

                <li>
                  <Link to="/contact" className="hover:text-pink-200 transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">
                Customer Service
              </h3>

              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li>
                  <Link to="/faq" className="hover:text-pink-200 transition">
                    FAQ
                  </Link>
                </li>

                <li>
                  <Link to="/shipping" className="hover:text-pink-200 transition">
                    Shipping Policy
                  </Link>
                </li>

                <li>
                  <Link to="/returns" className="hover:text-pink-200 transition">
                    Returns & Refunds
                  </Link>
                </li>

                <li>
                  <Link to="/privacy" className="hover:text-pink-200 transition">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter - Full width on mobile */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">
              Subscribe
            </h3>

            <p className="text-xs sm:text-sm text-pink-100 mb-3 sm:mb-4">
              Get updates about new products and offers.
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 bg-[#F8E7EF] text-sm rounded-md sm:rounded-l-md sm:rounded-r-none text-gray-800 focus:outline-none"
              />

              <button className="bg-white text-[#E771A3] px-4 py-2 text-sm rounded-md sm:rounded-r-md sm:rounded-l-none font-medium hover:bg-pink-100 transition">
                Join
              </button>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-pink-300 mt-8 md:mt-10 pt-6 text-center text-xs sm:text-sm text-pink-100">

          <p>
            © {new Date().getFullYear()} Twinkle & Trend. All rights reserved.
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;