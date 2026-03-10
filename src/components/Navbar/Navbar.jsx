// src/components/Navbar/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo.png";
import Container from "../layout/Container";
import { products } from "../../data/products";

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

	/* Close Menus on Route Change */
	useEffect(() => {
		setMobileMenuOpen(false);
		setMobileDropdownOpen(false);
		setOpen(false);
	}, [pathname]);

	/* Close when clicking outside */
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

	/* Escape closes modal */
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

	/* Debounce Search */
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

	/* Search Submit */
	const handleSearch = (e) => {
		e.preventDefault();
		if (!searchQuery.trim()) return;
		navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
		setShowSuggestions(false);
		setShowSearchModal(false);
	};

	/* Product Click */
	const handleProductClick = (id) => {
		setShowSuggestions(false);
		setShowSearchModal(false);
		navigate(`/products/${id}`);
	};

	/* Toggle Search Modal */
	const toggleSearchModal = () => {
		setShowSearchModal(!showSearchModal);
		if (!showSearchModal && inputRef.current) {
			setTimeout(() => inputRef.current?.focus(), 100);
		}
	};

	/* Close mobile on click */
	const handleLinkClick = () => {
		setMobileMenuOpen(false);
		setMobileDropdownOpen(false);
		setOpen(false);
	};

	/* Categories */
	const categories = [
		{ name: "Fashion", slug: "fashion" },
		{ name: "Toys", slug: "toys" },
		{ name: "Home & Kitchen", slug: "home-kitchen" },
		{ name: "Religious", slug: "religious" },
		{ name: "Electronics", slug: "electronics" },
		{ name: "Sports", slug: "sports" },
	];

	return (
		<nav className="w-full relative z-50 bg-white from-[#FAD0E4] via-[#F7B3D3] to-[#FAD0E4] text-black shadow-md">
			<Container>
				<div className="flex items-center justify-between py-2">

					{/* Logo */}
					<Link to="/" onClick={handleLinkClick}>
						<div className="flex items-center">
							<img src={logo} alt="Logo" className="h-10 mr-4" />
							<span className="text-lg font-primary font-bold">
								Twinkle and Trend
							</span>
						</div>
					</Link>

					{/* Desktop Menu */}
					<ul className="hidden md:flex font-secondary space-x-1 text-sm items-center text-[#1F2937]">

						<Link to="/" className="px-6 py-3 hover:text-[#E771A3]">Home</Link>

						<Link to="/products" className="px-6 py-3 hover:text-[#E771A3]">Product</Link>

						{/* Categories */}
						<li ref={dropdownRef} className="relative group">
							<button
								onClick={() => setOpen(!open)}
								className="px-6 py-3 hover:text-[#E771A3] flex items-center gap-1"
							>
								Categories
								<svg
									className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
								</svg>
							</button>

							<ul
								className={`absolute top-12 left-0 bg-[#FFF7FB] text-black w-48 rounded-md border border-[#F7B3D3] shadow-lg transition-all duration-200 ${
									open ? "opacity-100 visible" : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
								}`}
							>
								{categories.map((cat) => (
									<Link
										key={cat.slug}
										to={`/products?category=${cat.slug}`}
										className="block px-4 py-3 hover:bg-[#FCE4EC]"
									>
										{cat.name}
									</Link>
								))}
							</ul>
						</li>

						<Link to="/offers" className="px-6 py-3 hover:text-[#E771A3]">Offers</Link>

						<Link to="/ContactUs" className="px-6 py-3 hover:text-[#E771A3]">
							Contact Us
						</Link>

					</ul>

					{/* Desktop Search */}
					<div className="hidden md:flex items-center w-64 relative" ref={searchRef}>
						<form onSubmit={handleSearch} className="relative flex w-full">

							<input
								type="text"
								placeholder="Search here..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								onFocus={() => searchQuery && setShowSuggestions(true)}
								className="px-3 py-1 text-black bg-[#f8e7ef] rounded-l-md outline-none w-full"
							/>

							{/* Suggestions */}
							{showSuggestions && (
								<div className="absolute top-full left-0 right-0 bg-white text-black rounded-md shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">

									{searchResults.length > 0 ? (
										searchResults.map((p) => (
											<button
												key={p.id}
												type="button"
												onClick={() => handleProductClick(p.id)}
												className="w-full px-4 py-3 flex gap-3 items-center hover:bg-[#fae7ed] text-left"
											>
												<img src={p.image} className="w-10 h-10 object-cover rounded" />
												<div>
													<p className="text-sm font-medium">{p.name}</p>
													<p className="text-xs text-[#E771A3]">৳{p.price}</p>
												</div>
											</button>
										))
									) : (
										<div className="p-3 text-gray-500">No products found</div>
									)}
								</div>
							)}

							<button
								type="submit"
								className="bg-[#ec7dac] cursor-pointer px-4 py-1 rounded-r-md hover:bg-[#d15f93] text-white"
							>
								Search
							</button>
						</form>
					</div>

					{/* Mobile Search + Menu Button */}
					<div className="md:hidden flex items-center gap-2">

						{/* Search icon */}
						<button
							onClick={toggleSearchModal}
							className="p-2 hover:bg-[#FCE4EC] rounded-full transition-all duration-300 transform hover:scale-110"
						>
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
						</button>

						{/* Menu button */}
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
				</div>
			</Container>

			{/* Mobile Menu */}
			{mobileMenuOpen && (
				<div className="md:hidden bg-[#F7B3D3] border-t border-[#FAD0E4]">
					<Container>
						<ul className="flex flex-col space-y-2 p-4">

							<Link to="/" onClick={handleLinkClick} className="px-4 py-3 hover:text-[#E771A3]">
								Home
							</Link>

							<Link to="/products" onClick={handleLinkClick} className="px-4 py-3 hover:text-[#E771A3]">
								Product
							</Link>

							{/* Mobile categories */}
							<li>
								<button
									onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
									className="w-full text-left px-4 py-3 flex justify-between items-center hover:text-[#E771A3]"
								>
									<span>Categories</span>
									<svg
										className={`w-4 h-4 transition-transform ${mobileDropdownOpen ? "rotate-180" : ""}`}
										fill="none" stroke="currentColor" viewBox="0 0 24 24"
									>
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
									</svg>
								</button>

								{mobileDropdownOpen && (
									<ul className="ml-4 mt-2 space-y-2 bg-[#FFF7FB] rounded-md p-2 border border-[#F7B3D3]">
										{categories.map((cat) => (
											<Link
												key={cat.slug}
												to={`/products?category=${cat.slug}`}
												onClick={handleLinkClick}
												className="px-4 py-3 hover:bg-[#FCE4EC] text-black block"
											>
												{cat.name}
											</Link>
										))}
									</ul>
								)}
							</li>

								<Link to="/offers" onClick={handleLinkClick} className="px-4 py-3 hover:text-[#E771A3]">
								Offers
							</Link>

							<Link to="/ContactUs" onClick={handleLinkClick} className="px-4 py-3 hover:text-[#E771A3]">
								Contact Us
							</Link>
						</ul>
					</Container>
				</div>
			)}

			{/* Search Modal */}
			<AnimatePresence>
				{showSearchModal && (
					<>
						{/* Backdrop */}
						<motion.div
							className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setShowSearchModal(false)}
						/>

						{/* Modal */}
						<motion.div
							ref={searchRef}
							className="fixed top-4 left-0 right-0 z-[70] mx-4 max-w-lg"
							initial={{ opacity: 0, y: -40 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -40 }}
						>
							<div className="relative bg-[#FFF7FB] rounded-lg shadow-2xl border border-[#F7B3D3]">

								{/* Close */}
								<button
									onClick={() => setShowSearchModal(false)}
									className="absolute top-4 right-4 text-gray-500 hover:text-black"
								>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>

								{/* Form */}
								<form onSubmit={handleSearch} className="flex items-center gap-2 p-4">
									<input
										ref={inputRef}
										type="text"
										placeholder="Search products..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										onFocus={() => searchQuery && setShowSuggestions(true)}
										className="flex-1 px-4 py-3 text-black bg-[#FFE6F1] rounded-lg outline-none focus:ring-2 focus:ring-[#E771A3]"
									/>

									<button
										type="submit"
										className="bg-[#E771A3] text-white px-6 py-3 rounded-lg hover:bg-[#d15f93]"
									>
										Search
									</button>
								</form>

								{/* Suggestions */}
								{showSuggestions && (
									<div className="max-h-80 overflow-y-auto border-t border-[#FAD0E4]">
										{searchResults.length > 0 ? (
											searchResults.map((p) => (
												<button
													key={p.id}
													type="button"
													onClick={() => handleProductClick(p.id)}
													className="w-full px-4 py-3 flex gap-3 hover:bg-[#FCE4EC] text-left"
												>
													<img src={p.image} className="w-12 h-12 object-cover rounded" />
													<div className="flex-1">
														<p className="text-sm font-medium text-gray-800">{p.name}</p>
														<p className="text-xs text-[#E771A3]">৳{p.price}</p>
													</div>
												</button>
											))
										) : (
											<div className="p-4 text-gray-500 text-center">No products found</div>
										)}
									</div>
								)}
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</nav>
	);
};

export default Navbar;