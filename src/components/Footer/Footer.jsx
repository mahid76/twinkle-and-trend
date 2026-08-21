// src/components/Footer/Footer.jsx
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="bg-[#d0e5f3] text-[#0f1a2a]">
			<div className="max-w-7xl mx-auto px-4 p-10">
				<div className="flex flex-col md:flex-row md:justify-between md:items-start lg:items-center gap-8 md:gap-10">
					{/* Brand */}
					<div className="flex-1 min-w-0">
						<h2 className="text-2xl font-bold mb-3">Twinkle & Trend</h2>
						<p className="text-sm text-[#2c3e50] leading-relaxed">
							Discover trendy fashion, toys, electronics and more. Bringing
							style and happiness to your everyday shopping.
						</p>
						{/* ✅ aria-label added — screen reader এর জন্য */}
						<div
							className="flex gap-3 md:gap-4 mt-5"
							role="list"
							aria-label="সোশ্যাল মিডিয়া"
						>
							<a
								href="https://www.facebook.com/profile.php?id=61574753113504"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Facebook এ আমাদের follow করুন"
								role="listitem"
								className="hover:text-[#385686] transition"
							>
								<FaFacebook className="text-2xl" aria-hidden="true" />
							</a>
							<a
								href="#"
								aria-label="Instagram এ আমাদের follow করুন"
								role="listitem"
								className="hover:text-[#385686] transition"
							>
								<FaInstagram className="text-2xl" aria-hidden="true" />
							</a>
						</div>
					</div>

					{/* Quick Links & Customer Service */}
					<div className="flex-1 min-w-0 lg:flex lg:justify-center">
						<div className="grid grid-cols-2 gap-4 md:gap-8">
							<nav aria-label="Quick Links">
								<h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">
									Quick Links
								</h3>
								<ul className="space-y-0 text-xs sm:text-sm">
									<li>
										<Link to="/" className="hover:text-[#385686] transition block py-2">
											Home
										</Link>
									</li>
									<li>
										<Link
											to="/products"
											className="hover:text-[#385686] transition block py-2"
										>
											Products
										</Link>
									</li>
									<li>
										<Link
											to="/ContactUs"
											className="hover:text-[#385686] transition block py-2"
										>
											Contact Us
										</Link>
									</li>
									<li>
										<Link
											to="/offers"
											className="hover:text-[#385686] transition block py-2"
										>
											Offers
										</Link>
									</li>
								</ul>
							</nav>

							{/* <nav aria-label="Customer Service">
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Customer Service</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li><Link to="/faq" className="hover:text-[#385686] transition">FAQ</Link></li>
                <li><Link to="/shipping" className="hover:text-[#385686] transition">Shipping Policy</Link></li>
                <li><Link to="/returns" className="hover:text-[#385686] transition">Returns & Refunds</Link></li>
                <li><Link to="/privacy" className="hover:text-[#385686] transition">Privacy Policy</Link></li>
              </ul>
            </nav> */}
						</div>
					</div>

					{/* Follow Us */}
					<div className="flex-1 min-w-0">
						<h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">
							Follow Us
						</h3>
						<p className="text-xs sm:text-sm text-[#2c3e50] mb-3 sm:mb-4">
							Get updates about new products and offers.
						</p>
						<a
							href="https://www.facebook.com/profile.php?id=61574753113504"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Facebook page এ যান"
							className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 w-full transition-colors text-sm md:text-base font-medium flex items-center justify-center gap-2"
						>
							<FaFacebook aria-hidden="true" />
							Follow Us on Facebook
						</a>
					</div>
				</div>

				<div className="border-t border-[#385686]/30 mt-8 md:mt-10 pt-6 text-center text-xs sm:text-sm text-[#385686]">
					<p>
						© {new Date().getFullYear()} Twinkle & Trend. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
