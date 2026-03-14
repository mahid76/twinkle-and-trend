// src/components/Navbar/DesktopMenu.jsx
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { categories } from "./Categories";
import { useCart } from "../../context/CartContext";

const DesktopMenu = ({ onLinkClick }) => {
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef(null);
	const { cartCount } = useCart();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setOpen(false);
			}
		};
		if (open) document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [open]);

	return (
		<ul className="hidden md:flex font-secondary space-x-1 text-sm items-center text-[#1F2937]">
			<Link to="/" onClick={onLinkClick} className="px-6 py-3 hover:text-[#E771A3]">Home</Link>
			<Link to="/products" onClick={onLinkClick} className="px-6 py-3 hover:text-[#E771A3]">Product</Link>

			<li ref={dropdownRef} className="relative group">
				<button onClick={() => setOpen(!open)} className="px-6 py-3 hover:text-[#E771A3] flex items-center gap-1">
					Categories
					<svg className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
					</svg>
				</button>
				<ul className={`absolute top-12 left-0 bg-[#FFF7FB] text-black w-48 rounded-md border border-[#F7B3D3] shadow-lg transition-all duration-200 ${open ? "opacity-100 visible" : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"}`}>
					{categories.map((cat) => (
						<Link key={cat.slug} to={`/products?category=${cat.slug}`} onClick={() => { setOpen(false); onLinkClick?.(); }} className="block px-4 py-3 hover:bg-[#FCE4EC]">
							{cat.name}
						</Link>
					))}
				</ul>
			</li>

			<Link to="/offers" onClick={onLinkClick} className="px-6 py-3 hover:text-[#E771A3]">Offers</Link>
			<Link to="/ContactUs" onClick={onLinkClick} className="px-6 py-3 hover:text-[#E771A3]">Contact Us</Link>

			{/* ✅ Cart Icon */}
			<Link to="/cart" className="relative px-3 py-3 hover:text-[#E771A3] transition-colors" onClick={onLinkClick}>
				<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
				</svg>
				{cartCount > 0 && (
					<span className="absolute top-1 right-1 bg-[#E771A3] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
						{cartCount > 9 ? "9+" : cartCount}
					</span>
				)}
			</Link>
		</ul>
	);
};

export default DesktopMenu;