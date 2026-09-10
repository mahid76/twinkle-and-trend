import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { categories } from "./Categories";

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
	const { wishlistCount } = useWishlist();

	if (isMobile) {
		return (
			<div className="lg:hidden flex items-center md:gap-1">
				<button
					onClick={toggleSearchModal}
					aria-label="পণ্য খুঁজুন"
					className="p-2 hover:bg-[#FCE4EC] rounded-full transition-all"
				>
					<svg
						className="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</button>

				<Link
					to="/wishlist"
					aria-label={
						wishlistCount > 0
							? `Wishlist — ${wishlistCount}টি পণ্য`
							: "Wishlist"
					}
					className="relative p-2 hover:bg-[#FCE4EC] rounded-full transition-all"
				>
					<svg
						className="w-5 h-5"
						fill={wishlistCount > 0 ? "#C2185B" : "none"}
						stroke="#C2185B"
						strokeWidth={2}
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						/>
					</svg>
					{wishlistCount > 0 && (
						<span
							aria-hidden="true"
							className="absolute -top-0.5 -right-0.5 bg-[#BE3F7A] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
						>
							{wishlistCount > 9 ? "9+" : wishlistCount}
						</span>
					)}
				</Link>

				<Link
					to="/cart"
					aria-label={cartCount > 0 ? `Cart — ${cartCount}টি পণ্য` : "Cart"}
					className="relative p-2 hover:bg-[#FCE4EC] rounded-full transition-all"
				>
					<svg
						className="w-5 h-5"
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
						/>
					</svg>
					{cartCount > 0 && (
						<span
							aria-hidden="true"
							className="absolute -top-0.5 -right-0.5 bg-[#BE3F7A] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
						>
							{cartCount > 9 ? "9+" : cartCount}
						</span>
					)}
				</Link>

				<button
					onClick={() => {
						setMobileMenuOpen(!mobileMenuOpen);
						setMobileDropdownOpen(false);
					}}
					aria-label={mobileMenuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
					aria-expanded={mobileMenuOpen}
					className="p-2"
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						{mobileMenuOpen ? (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						) : (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16M4 18h16"
							/>
						)}
					</svg>
				</button>
			</div>
		);
	}

	return (
		<>
			{mobileMenuOpen && (
				<div
					className="fixed inset-0 z-40 bg-black/50 lg:hidden"
					onClick={() => setMobileMenuOpen(false)}
				/>
			)}
			<div
				className={`lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#FAD0E4] shadow-xl transition-all duration-300 ${mobileMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
			>
				<div className="p-4 max-h-[90vh] overflow-y-auto">
					<ul className="flex flex-col space-y-1" role="list">
						<li>
							<Link
								to="/"
								onClick={handleLinkClick}
								className="block px-4 py-3 hover:text-[#BE3F7A] hover:bg-[#FCE4EC] rounded-xl transition-colors font-medium"
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								to="/products"
								onClick={handleLinkClick}
								className="block px-4 py-3 hover:text-[#BE3F7A] hover:bg-[#FCE4EC] rounded-xl transition-colors font-medium"
							>
								Product
							</Link>
						</li>
						<li>
							<button
								onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
								aria-expanded={mobileDropdownOpen}
								className="w-full text-left px-4 py-3 flex justify-between items-center hover:text-[#BE3F7A] hover:bg-[#FCE4EC] rounded-xl transition-colors font-medium"
							>
								<span>Categories</span>
								<svg
									className={`w-4 h-4 transition-transform ${mobileDropdownOpen ? "rotate-180" : ""}`}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>
							{mobileDropdownOpen && (
								<ul className="ml-4 mt-1 space-y-1 bg-[#FFF7FB] rounded-xl p-2 border border-[#FAD0E4]">
									{categories.map((cat) => (
										<li key={cat.slug}>
											<Link
												to={`/products?category=${cat.slug}`}
												onClick={handleLinkClick}
												className="block px-4 py-2.5 hover:bg-[#FCE4EC] text-gray-700 rounded-lg transition-colors text-sm"
											>
												{cat.name}
											</Link>
										</li>
									))}
								</ul>
							)}
						</li>
						<li>
							<Link
								to="/offers"
								onClick={handleLinkClick}
								className="block px-4 py-3 hover:text-[#BE3F7A] hover:bg-[#FCE4EC] rounded-xl transition-colors font-medium"
							>
								Offers
							</Link>
						</li>
						<li>
							<Link
								to="/ContactUs"
								onClick={handleLinkClick}
								className="block px-4 py-3 hover:text-[#BE3F7A] hover:bg-[#FCE4EC] rounded-xl transition-colors font-medium"
							>
								Contact Us
							</Link>
						</li>

						<li>
							<div className="flex gap-2 pt-1">
								<Link
									to="/wishlist"
									onClick={handleLinkClick}
									aria-label={
										wishlistCount > 0
											? `Wishlist — ${wishlistCount}টি পণ্য`
											: "Wishlist"
									}
									className="flex-1 flex items-center justify-center gap-2 px-4 py-3 hover:text-[#BE3F7A] hover:bg-[#FCE4EC] rounded-xl transition-colors text-sm font-medium border border-[#FAD0E4]"
								>
									<svg
										className="w-4 h-4"
										fill={wishlistCount > 0 ? "#C2185B" : "none"}
										stroke="#C2185B"
										strokeWidth={2}
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
										/>
									</svg>
									<span>Wishlist</span>
									{wishlistCount > 0 && (
										<span
											aria-hidden="true"
											className="bg-[#BE3F7A] text-white text-[9px] px-1.5 py-0.5 rounded-full"
										>
											{wishlistCount}
										</span>
									)}
								</Link>
								<Link
									to="/cart"
									onClick={handleLinkClick}
									aria-label={
										cartCount > 0 ? `Cart — ${cartCount}টি পণ্য` : "Cart"
									}
									className="flex-1 flex items-center justify-center gap-2 px-4 py-3 hover:text-[#BE3F7A] hover:bg-[#FCE4EC] rounded-xl transition-colors text-sm font-medium border border-[#FAD0E4]"
								>
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										strokeWidth={2}
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
										/>
									</svg>
									<span>Cart</span>
									{cartCount > 0 && (
										<span
											aria-hidden="true"
											className="bg-[#BE3F7A] text-white text-[9px] px-1.5 py-0.5 rounded-full"
										>
											{cartCount}
										</span>
									)}
								</Link>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default MobileMenu;
