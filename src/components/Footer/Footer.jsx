import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";


const Footer = () => {
	return (
		<footer className="bg-[#d0e5f3] text-[#0f1a2a] ">
			<div className="max-w-7xl mx-auto px-4 p-10">
				{/* Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
					{/* Brand - Full width on mobile */}
					<div className="col-span-1 sm:col-span-2 lg:col-span-1">
						<h2 className="text-2xl font-bold mb-3">Twinkle & Trend</h2>

						<p className="text-sm text-[#2c3e50] leading-relaxed">
							Discover trendy fashion, toys, electronics and more. Bringing
							style and happiness to your everyday shopping.
						</p>

						{/* Social */}
						<div className="flex gap-3 md:gap-4 mt-5">
							<a href="#" className="hover:text-[#385686] transition">
								<FaFacebook className="text-2xl" />
							</a>

							<a href="#" className="hover:text-[#385686] transition">
								<FaInstagram className="text-2xl" />
							</a>

							{/* <a href="#" className="hover:text-[#385686] transition">
								<i className="ri-twitter-x-line text-xl"></i>
							</a> */}

							{/* <a href="#" className="hover:text-[#385686] transition">
								<FaYoutube className="text-2xl" />
							</a> */}
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
									<Link to="/" className="hover:text-[#385686] transition">
										Home
									</Link>
								</li>

								<li>
									<Link
										to="/products"
										className="hover:text-[#385686] transition"
									>
										Products
									</Link>
								</li>

								<li>
									<Link to="/about" className="hover:text-[#385686] transition">
										About Us
									</Link>
								</li>

								<li>
									<Link
										to="/ContactUs"
										className="hover:text-[#385686] transition"
									>
										Contact Us
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
									<Link to="/faq" className="hover:text-[#385686] transition">
										FAQ
									</Link>
								</li>

								<li>
									<Link
										to="/shipping"
										className="hover:text-[#385686] transition"
									>
										Shipping Policy
									</Link>
								</li>

								<li>
									<Link
										to="/returns"
										className="hover:text-[#385686] transition"
									>
										Returns & Refunds
									</Link>
								</li>

								<li>
									<Link
										to="/privacy"
										className="hover:text-[#385686] transition"
									>
										Privacy Policy
									</Link>
								</li>
							</ul>
						</div>
					</div>

					{/* Newsletter - Full width on mobile */}
					<div className="col-span-1 sm:col-span-2 lg:col-span-1">
						<h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">
							Follow Us
						</h3>

						<p className="text-xs sm:text-sm text-[#2c3e50] mb-3 sm:mb-4">
							Get updates about new products and offers.
						</p>

						<button
									className="bg-blue-600 text-white py-1  md:px-2 md:py-1 rounded-md hover:bg-blue-700 w-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-lg font-medium md:flex items-center justify-center gap-1 md:gap-2"
								>
									{/* <svg
										className="w-6 h-6"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
									</svg> */}
									Follow Us
								</button>
					</div>
				</div>

				{/* Divider */}
				<div className="border-t border-[#385686] mt-8 md:mt-10 pt-6 text-center text-xs sm:text-sm text-[#385686">
					<p>
						© {new Date().getFullYear()} Twinkle & Trend. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
