// src/components/Navbar/MobileMenu.jsx
import { Link } from "react-router-dom";
import { categories } from "./Categories";
import { useCart } from "../../context/CartContext";

const MobileMenu = ({
	isMobile = false,
	mobileMenuOpen,
	setMobileMenuOpen,
	mobileDropdownOpen,
	setMobileDropdownOpen,
	toggleSearchModal,
	handleLinkClick,
}) => {
	const { cartCount } = useCart();

	if (isMobile) {
		return (
			<div className="md:hidden flex items-center gap-2">
				{/* Search Icon */}
				<button
					onClick={toggleSearchModal}
					className="p-2 hover:bg-[#FCE4EC] rounded-full transition-all duration-300 transform hover:scale-110"
				>
					<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
				</button>

				{/* ✅ Cart Icon */}
				<Link to="/cart" className="relative p-2 hover:bg-[#FCE4EC] rounded-full transition-all duration-300">
					<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
					</svg>
					{cartCount > 0 && (
						<span className="absolute top-0 right-0 bg-[#E771A3] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
							{cartCount > 9 ? "9+" : cartCount}
						</span>
					)}
				</Link>

				{/* Menu Button */}
				<button
					onClick={() => {
						setMobileMenuOpen(!mobileMenuOpen);
						setMobileDropdownOpen(false);
					}}
					className="ml-2"
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
		);
	}

	return (
		<>
			{mobileMenuOpen && (
				<div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileMenuOpen(false)} />
			)}
			<div className={`md:hidden fixed top-0 left-0 right-0 z-50 bg-[#f8dce9] border-b border-[#FAD0E4] transition-all duration-300 ${mobileMenuOpen ? "translate-y-0" : "-translate-y-full"}`}>
				<div className="p-4">
					<ul className="flex flex-col space-y-2">
						<Link to="/" onClick={handleLinkClick} className="px-4 py-3 hover:text-[#E771A3] hover:bg-[#FCE4EC] rounded-lg transition-colors">Home</Link>
						<Link to="/products" onClick={handleLinkClick} className="px-4 py-3 hover:text-[#E771A3] hover:bg-[#FCE4EC] rounded-lg transition-colors">Product</Link>
						<li>
							<button onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)} className="w-full text-left px-4 py-3 flex justify-between items-center hover:text-[#E771A3] hover:bg-[#FCE4EC] rounded-lg transition-colors">
								<span>Categories</span>
								<svg className={`w-4 h-4 transition-transform ${mobileDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
								</svg>
							</button>
							{mobileDropdownOpen && (
								<ul className="ml-4 mt-2 space-y-2 bg-[#FFF7FB] rounded-lg p-2 border border-[#F7B3D3]">
									{categories.map((cat) => (
										<Link key={cat.slug} to={`/products?category=${cat.slug}`} onClick={handleLinkClick} className="px-4 py-3 hover:bg-[#FCE4EC] text-black block rounded-lg transition-colors">
											{cat.name}
										</Link>
									))}
								</ul>
							)}
						</li>
						<Link to="/offers" onClick={handleLinkClick} className="px-4 py-3 hover:text-[#E771A3] hover:bg-[#FCE4EC] rounded-lg transition-colors">Offers</Link>
						<Link to="/ContactUs" onClick={handleLinkClick} className="px-4 py-3 hover:text-[#E771A3] hover:bg-[#FCE4EC] rounded-lg transition-colors">Contact Us</Link>
					</ul>
				</div>
			</div>
		</>
	);
};

export default MobileMenu;