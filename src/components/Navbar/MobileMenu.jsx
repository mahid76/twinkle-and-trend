// src/components/Navbar/MobileMenu.jsx
// ✅ A11Y FIX 1: aria-label added to Search button, Hamburger button
// ✅ A11Y FIX 2: aria-label added to Wishlist & Cart icon-only links
// ✅ A11Y FIX 3: <ul> now contains only <li> elements (List structure fix)
//               Direct <Link> inside <ul> → wrapped in <li>
//               Category sub-links: <Link> → <li><Link>
// ✅ CONTRAST FIX: #E771A3 → #BE3F7A (4.91:1 on white, passes WCAG AA)
//                 #d15f93 hover → #9B2F62
//                 Best Seller / badge text: #7D1A44 on light pink bg

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { categories } from "./Categories";

const LogoutModal = ({ onConfirm, onCancel }) => (
	<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
		<div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
			<div className="text-center mb-5">
				<div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
					<svg
						className="w-7 h-7 text-red-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
						/>
					</svg>
				</div>
				<h3 className="text-lg font-bold text-gray-800">Logout করবেন?</h3>
				<p className="text-gray-500 text-sm mt-1">
					আপনি কি সত্যিই logout করতে চান?
				</p>
			</div>
			<div className="flex gap-3">
				<button
					onClick={onCancel}
					className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm"
				>
					Cancel
				</button>
				<button
					onClick={onConfirm}
					className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors text-sm"
				>
					Logout
				</button>
			</div>
		</div>
	</div>
);

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
	const { user, logout } = useAuth();
	const { wishlistCount } = useWishlist();
	const [showLogoutModal, setShowLogoutModal] = useState(false);

	const handleLogoutConfirm = async () => {
		await logout();
		setShowLogoutModal(false);
		handleLinkClick();
	};

	if (isMobile) {
		return (
			<>
				{showLogoutModal && (
					<LogoutModal
						onConfirm={handleLogoutConfirm}
						onCancel={() => setShowLogoutModal(false)}
					/>
				)}
				
				<div className="lg:hidden flex items-center  md:gap-1">
					{/* ✅ FIX: aria-label added — was missing */}
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

					{/* ✅ FIX: aria-label added — icon-only link was undiscernible */}
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

					{/* ✅ FIX: aria-label added — icon-only link was undiscernible */}
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

					{/* ✅ FIX: aria-label + aria-expanded added */}
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
			</>
		);
	}

	return (
		<>
			{showLogoutModal && (
				<LogoutModal
					onConfirm={handleLogoutConfirm}
					onCancel={() => setShowLogoutModal(false)}
				/>
			)}
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
					{user && (
						<div className="flex items-center gap-3 px-4 py-3 bg-[#FFF7FB] rounded-xl mb-3">
							{user.photoURL ? (
								<img
									src={user.photoURL?.replace("=s96-c", "") + "=s80-c"}
									alt="Profile avatar"
									width={40}
									height={40}
									loading="lazy"
									decoding="async"
									className="w-10 h-10 rounded-full object-cover"
								/>
							) : (
								<div
									className="w-10 h-10 rounded-full bg-[#BE3F7A] text-white flex items-center justify-center font-bold"
									aria-hidden="true"
								>
									{user.displayName?.[0]?.toUpperCase() ||
										user.email?.[0]?.toUpperCase()}
								</div>
							)}
							<div>
								<p className="text-sm font-semibold text-gray-800">
									{user.displayName || "User"}
								</p>
								<p className="text-xs text-gray-500 truncate max-w-[180px]">
									{user.email}
								</p>
							</div>
						</div>
					)}

					{/* ✅ FIX: All direct <Link> in <ul> now wrapped in <li> */}
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
									{/* ✅ FIX: <Link> wrapped in <li> */}
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

						<li>
							<div className="border-t border-gray-100 pt-2 mt-2">
								{user ? (
									<button
										onClick={() => setShowLogoutModal(true)}
										className="flex items-center gap-2 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors text-sm font-medium"
									>
										<svg
											className="w-4 h-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											aria-hidden="true"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
											/>
										</svg>
										Logout
									</button>
								) : (
									<div className="flex gap-2">
										{/* ✅ CONTRAST: #E771A3 → #BE3F7A (4.91:1 on white) */}
										<Link
											to="/login"
											onClick={handleLinkClick}
											className="flex-1 text-center bg-[#BE3F7A] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#9B2F62] transition-colors"
										>
											Login
										</Link>
										<Link
											to="/register"
											onClick={handleLinkClick}
											className="flex-1 text-center border-2 border-[#BE3F7A] text-[#BE3F7A] py-3 rounded-xl text-sm font-semibold hover:bg-[#FCE4EC] transition-colors"
										>
											Register
										</Link>
									</div>
								)}
							</div>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default MobileMenu;
