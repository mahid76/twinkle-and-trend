import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { categories } from "./Categories";

const DesktopMenu = ({ onLinkClick }) => {
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef(null);
	const hoverTimeout = useRef(null);
	const { cartCount } = useCart();
	const { wishlistCount } = useWishlist();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleMouseEnter = () => {
		clearTimeout(hoverTimeout.current);
		hoverTimeout.current = setTimeout(() => setOpen(true), 100);
	};

	const handleMouseLeave = () => {
		clearTimeout(hoverTimeout.current);
		hoverTimeout.current = setTimeout(() => setOpen(false), 200);
	};

	useEffect(() => () => clearTimeout(hoverTimeout.current), []);

	return (
		<ul className="hidden lg:flex font-secondary space-x-1 text-sm items-center text-[#1F2937]">
			<li>
				<Link
					to="/"
					onClick={onLinkClick}
					className="px-4 py-3 hover:text-[#C2185B] transition-colors"
				>
					Home
				</Link>
			</li>
			<li>
				<Link
					to="/products"
					onClick={onLinkClick}
					className="px-4 py-3 hover:text-[#C2185B] transition-colors"
				>
					Product
				</Link>
			</li>

			<li
				ref={dropdownRef}
				className="relative"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<button
					onClick={() => setOpen(true)}
					aria-expanded={open}
					aria-haspopup="true"
					className="px-4 py-3 hover:text-[#C2185B] flex items-center gap-1 transition-colors"
				>
					Categories
					<svg
						className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</button>

				<ul
					role="menu"
					className={`absolute top-full left-0 bg-white text-black w-52 rounded-xl border border-[#FAD0E4] shadow-xl transition-all duration-200 overflow-hidden z-50 ${
						open
							? "opacity-100 visible translate-y-0"
							: "opacity-0 invisible -translate-y-1"
					}`}
				>
					{categories.map((cat) => (
						<Link
							key={cat.slug}
							to={`/products?category=${cat.slug}`}
							role="menuitem"
							onClick={() => {
								setOpen(false);
								onLinkClick?.();
							}}
							className="block px-4 py-3 hover:bg-[#FCE4EC] hover:text-[#C2185B] transition-colors text-sm"
						>
							{cat.name}
						</Link>
					))}
				</ul>
			</li>

			<li>
				<Link
					to="/offers"
					onClick={onLinkClick}
					className="px-4 py-3 hover:text-[#C2185B] transition-colors"
				>
					Offers
				</Link>
			</li>
			<li>
				<Link
					to="/ContactUs"
					onClick={onLinkClick}
					className="px-4 py-3 hover:text-[#C2185B] transition-colors"
				>
					Contact Us
				</Link>
			</li>

			<li className="relative">
				<Link
					to="/wishlist"
					onClick={onLinkClick}
					aria-label={`Wishlist — ${wishlistCount} items`}
					className="relative flex p-2.5 hover:text-[#C2185B] hover:bg-[#FCE4EC] rounded-full transition-all"
				>
					<svg
						className="w-5 h-5"
						fill={wishlistCount > 0 ? "#E771A3" : "none"}
						stroke="#E771A3"
						strokeWidth={2}
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						/>
					</svg>
					{wishlistCount > 0 && (
						<span className="absolute -top-0.5 -right-0.5 bg-[#E771A3] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
							{wishlistCount > 9 ? "9+" : wishlistCount}
						</span>
					)}
				</Link>
			</li>

			<li className="relative">
				<Link
					to="/cart"
					onClick={onLinkClick}
					aria-label={`Cart — ${cartCount} items`}
					className="relative flex p-2.5 hover:text-[#E771A3] hover:bg-[#FCE4EC] rounded-full transition-all"
				>
					<svg
						className="w-5 h-5"
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
						/>
					</svg>
					{cartCount > 0 && (
						<span className="absolute -top-0.5 -right-0.5 bg-[#E771A3] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
							{cartCount > 9 ? "9+" : cartCount}
						</span>
					)}
				</Link>
			</li>
		</ul>
	);
};

export default DesktopMenu;
