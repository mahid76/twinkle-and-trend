// src/components/Footer/Footer.jsx
// ✅ PERF FIX: react-icons/fa REMOVED — replaced with inline SVGs
//
// WHY THIS MATTERS:
// Footer is imported EAGERLY in MainRoute (not lazy).
// MainRoute is on the critical path of EVERY page load.
// react-icons/fa was pulled into the initial bundle via:
//   MainRoute → Footer → react-icons/fa (icons chunk)
//
// Even though vite.config.js puts it in a separate "icons" chunk,
// it's still fetched eagerly because Footer → MainRoute → router.
// Removing it saves the icons chunk from the initial network waterfall.
//
// SVGs below are the exact same icons (same paths), just inline.

import { Link } from "react-router-dom";

// ─── Inline SVG icons (replaces react-icons/fa) ─────────────────
const FacebookIcon = ({ className }) => (
	<svg
		className={className}
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-hidden="true"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
	</svg>
);

const InstagramIcon = ({ className }) => (
	<svg
		className={className}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
		<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
		<line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
	</svg>
);

const Footer = () => {
	return (
		<footer className="bg-[#d0e5f3] text-[#0f1a2a]">
			<div className="max-w-7xl mx-auto px-4 p-10">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">

					{/* Brand */}
					<div className="col-span-1 sm:col-span-2 lg:col-span-1">
						<h2 className="text-2xl font-bold mb-3">Twinkle & Trend</h2>
						<p className="text-sm text-[#2c3e50] leading-relaxed">
							Discover trendy fashion, toys, electronics and more. Bringing
							style and happiness to your everyday shopping.
						</p>
						<div className="flex gap-3 md:gap-4 mt-5" role="list" aria-label="সোশ্যাল মিডিয়া">
							<a
								href="https://www.facebook.com/profile.php?id=61574753113504"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Facebook এ আমাদের follow করুন"
								role="listitem"
								className="hover:text-[#385686] transition"
							>
								<FacebookIcon className="w-6 h-6" />
							</a>
							<a
								href="#"
								aria-label="Instagram এ আমাদের follow করুন"
								role="listitem"
								className="hover:text-[#385686] transition"
							>
								<InstagramIcon className="w-6 h-6" />
							</a>
						</div>
					</div>

					{/* Quick Links & Customer Service */}
					<div className="grid grid-cols-2 gap-4 sm:col-span-2 lg:col-span-2">
						<nav aria-label="Quick Links">
							<h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Quick Links</h3>
							<ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
								<li><Link to="/" className="hover:text-[#385686] transition">Home</Link></li>
								<li><Link to="/products" className="hover:text-[#385686] transition">Products</Link></li>
								<li><Link to="/ContactUs" className="hover:text-[#385686] transition">Contact Us</Link></li>
								<li><Link to="/offers" className="hover:text-[#385686] transition">Offers</Link></li>
							</ul>
						</nav>

						<nav aria-label="Customer Service">
							<h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Customer Service</h3>
							<ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
								<li><Link to="/faq" className="hover:text-[#385686] transition">FAQ</Link></li>
								<li><Link to="/shipping" className="hover:text-[#385686] transition">Shipping Policy</Link></li>
								<li><Link to="/returns" className="hover:text-[#385686] transition">Returns & Refunds</Link></li>
								<li><Link to="/privacy" className="hover:text-[#385686] transition">Privacy Policy</Link></li>
							</ul>
						</nav>
					</div>

					{/* Follow Us */}
					<div className="col-span-1 sm:col-span-2 lg:col-span-1">
						<h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Follow Us</h3>
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
							<FacebookIcon className="w-5 h-5" />
							Follow Us on Facebook
						</a>
					</div>
				</div>

				<div className="border-t border-[#385686]/30 mt-8 md:mt-10 pt-6 text-center text-xs sm:text-sm text-[#385686]">
					<p>© {new Date().getFullYear()} Twinkle & Trend. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
