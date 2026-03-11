// src/components/Navbar/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo.png";
import Container from "../layout/Container";
import { products } from "../../data/products";
import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import SearchModal from "./SearchModal";
import { categories } from "./Categories";

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [showSearchModal, setShowSearchModal] = useState(false);

	const navigate = useNavigate();
	const dropdownRef = useRef(null);
	const searchRef = useRef(null);
	const inputRef = useRef(null);
	const { pathname } = useLocation();

	// ✅ Close Menus on Route Change
	useEffect(() => {
		setMobileMenuOpen(false);
		setMobileDropdownOpen(false);
		setOpen(false);
	}, [pathname]);

	// ✅ Close when clicking outside
	useEffect(() => {
		const handler = (e) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setOpen(false);
			}
			if (searchRef.current && !searchRef.current.contains(e.target)) {
				setShowSuggestions(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	// Escape closes modal
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === "Escape") {
				setShowSearchModal(false);
				setSearchQuery("");
			}
		};
		if (showSearchModal) {
			document.addEventListener("keydown", handleEscape);
		}
		return () => document.removeEventListener("keydown", handleEscape);
	}, [showSearchModal]);

	// Debounce Search
	useEffect(() => {
		const timer = setTimeout(() => {
			if (searchQuery.trim()) {
				const filtered = products.filter((p) =>
					p.name.toLowerCase().includes(searchQuery.toLowerCase())
				);
				setSearchResults(filtered.slice(0, 6));
				setShowSuggestions(true);
			} else {
				setSearchResults([]);
				setShowSuggestions(false);
			}
		}, 300);
		return () => clearTimeout(timer);
	}, [searchQuery]);

	// Search Submit
	const handleSearch = (e) => {
		e.preventDefault();
		if (!searchQuery.trim()) return;
		navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
		setShowSuggestions(false);
		setShowSearchModal(false);
	};

	// Product Click
	const handleProductClick = (id) => {
		setShowSuggestions(false);
		setShowSearchModal(false);
		navigate(`/products/${id}`);
	};

	// Toggle Search Modal
	const toggleSearchModal = () => {
		setShowSearchModal(!showSearchModal);
		if (!showSearchModal && inputRef.current) {
			setTimeout(() => inputRef.current?.focus(), 100);
		}
	};

	// ✅ Close all menus on click
	const handleLinkClick = () => {
		setMobileMenuOpen(false);
		setMobileDropdownOpen(false);
		setOpen(false);
	};

	return (
		<nav className="w-full relative z-50 bg-white from-[#FAD0E4] via-[#F7B3D3] to-[#FAD0E4] text-black shadow-md">
			<Container>
				<div className="flex items-center justify-between py-2">
					<Logo onClick={handleLinkClick} />
					<DesktopMenu onLinkClick={handleLinkClick} />
					<SearchBar
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						showSuggestions={showSuggestions}
						searchResults={searchResults}
						handleSearch={handleSearch}
						handleProductClick={handleProductClick}
						searchRef={searchRef}
					/>
					<MobileMenu
						isMobile={true}
						mobileMenuOpen={mobileMenuOpen}
						setMobileMenuOpen={setMobileMenuOpen}
						mobileDropdownOpen={mobileDropdownOpen}
						setMobileDropdownOpen={setMobileDropdownOpen}
						toggleSearchModal={toggleSearchModal}
						handleLinkClick={handleLinkClick}
					/>
				</div>
			</Container>

			{/* Mobile Menu (Full Screen) */}
			<MobileMenu
				isMobile={false}
				mobileMenuOpen={mobileMenuOpen}
				setMobileMenuOpen={setMobileMenuOpen}
				mobileDropdownOpen={mobileDropdownOpen}
				setMobileDropdownOpen={setMobileDropdownOpen}
				handleLinkClick={handleLinkClick}
			/>

			<SearchModal
				showSearchModal={showSearchModal}
				setShowSearchModal={setShowSearchModal}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				showSuggestions={showSuggestions}
				searchResults={searchResults}
				handleSearch={handleSearch}
				handleProductClick={handleProductClick}
				inputRef={inputRef}
				searchRef={searchRef}
			/>
		</nav>
	);
};

export default Navbar;