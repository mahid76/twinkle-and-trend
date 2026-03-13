import { Link } from "react-router-dom";

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
						<div className="flex gap-4 mt-5">
							<a href="#" className="hover:text-[#385686] transition">
								<i className="ri-facebook-fill text-xl"></i>
							</a>

							<a href="#" className="hover:text-[#385686] transition">
								<i className="ri-instagram-line text-xl"></i>
							</a>

							<a href="#" className="hover:text-[#385686] transition">
								<i className="ri-twitter-x-line text-xl"></i>
							</a>

							<a href="#" className="hover:text-[#385686] transition">
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
							Subscribe
						</h3>

						<p className="text-xs sm:text-sm text-[#2c3e50] mb-3 sm:mb-4">
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
