// src/components/Navbar/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

	const dropdownRef = useRef(null);
	const searchRef = useRef(null);
	const { pathname, search } = useLocation();

	// Close mobile menu when route changes
	useEffect(() => {
		setMobileMenuOpen(false);
		setMobileDropdownOpen(false);
	}, [pathname]);

	// Close desktop dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setOpen(false);
			}
			if (searchRef.current && !searchRef.current.contains(event.target)) {
				setShowSuggestions(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Search with Debounce
	useEffect(() => {
		const timer = setTimeout(() => {
			if (searchQuery.trim().length > 0) {
				const filtered = products.filter((product) =>
					product.name.toLowerCase().includes(searchQuery.toLowerCase())
				);
				setSearchResults(filtered.slice(0, 5));
				setShowSuggestions(true);
			} else {
				setSearchResults([]);
				setShowSuggestions(false);
			}
		}, 300);

		return () => clearTimeout(timer);
	}, [searchQuery]);

	// Handle Search Submit
	const handleSearch = (e) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
		}
	};

	// Handle Product Click from Suggestions
	const handleProductClick = (productId) => {
		window.location.href = `/products/${productId}`;
	};

	// Category Links
	const categories = [
		{ name: "Fashion", slug: "fashion" },
		{ name: "Toys", slug: "toys" },
		{ name: "Home & Kitchen", slug: "home-kitchen" },
		{ name: "Religious", slug: "religious" },
		{ name: "Electronics", slug: "electronics" },
		{ name: "Sports", slug: "sports" },
	];

	return (
		<nav className="w-full relative z-50 bg-gradient-to-r from-gray-800 to-gray-700 text-white">
			<Container>
				<div className="flex items-center justify-between py-2">
					{/* Logo */}
					<Link to="/">
						<div className="flex items-center">
							<img src={logo} alt="Logo" className="h-10 w-auto mr-4" />
							<span className="text-lg font-primary font-bold hidden md:block">
								Twinkle and Trend
							</span>
						</div>
					</Link>

					{/* Desktop Menu */}
					<ul className="hidden font-secondary md:flex space-x-6 text-sm items-center">
						<Link to="/" className="hover:text-gray-300 px-6 py-3">
							Home
						</Link>

						<Link to="/products" className="hover:text-gray-300 px-6 py-3">
							Product
						</Link>

						{/* Categories Dropdown */}
						<li className="relative group" ref={dropdownRef}>
							<button
								onClick={() => setOpen(!open)}
								className="px-6 py-3 hover:text-gray-300 flex items-center gap-1"
							>
								Categories
								<svg
									className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
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
								className={`absolute top-12 left-0 bg-white text-black w-48 rounded-md shadow-lg transition-all duration-200 ${
									open
										? "opacity-100 visible"
										: "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
								}`}
							>
								{categories.map((category) => (
									<Link
										key={category.slug}
										to={`/products?category=${category.slug}`}
										className="px-4 py-3 hover:bg-gray-100 text-sm block"
									>
										{category.name}
									</Link>
								))}
							</ul>
						</li>

						<Link to="/ContactUs" className="hover:text-gray-300">
							Contact Us
						</Link>
					</ul>

					{/* Desktop Search */}
					<div className="hidden md:flex items-center w-64" ref={searchRef}>
						<form onSubmit={handleSearch} className="relative flex w-full">
							<input
								type="text"
								placeholder="Search here..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
								className="px-3 py-1 text-black bg-amber-50 rounded-l-md outline-none w-full"
							/>
							{showSuggestions && searchResults.length > 0 && (
								<div className="absolute top-full left-0 right-0 bg-white text-black rounded-md shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
									{searchResults.map((product) => (
										<button
											key={product.id}
											type="button"
											onClick={() => handleProductClick(product.id)}
											className="w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-3"
										>
											<img
												src={product.image}
												alt={product.name}
												className="w-10 h-10 object-cover rounded"
											/>
											<div>
												<p className="text-sm font-medium text-gray-800">
													{product.name}
												</p>
												<p className="text-xs text-teal-500">৳{product.price}</p>
											</div>
										</button>
									))}
								</div>
							)}
							{showSuggestions && searchResults.length === 0 && searchQuery.trim() && (
								<div className="absolute top-full left-0 right-0 bg-white text-black rounded-md shadow-lg mt-1 p-4">
									<p className="text-sm text-gray-500">No products found</p>
								</div>
							)}
							<button
								type="submit"
								className="bg-teal-500 px-4 py-1 rounded-r-md hover:bg-teal-600"
							>
								Search
							</button>
						</form>
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={() => {
							setMobileMenuOpen(!mobileMenuOpen);
							setMobileDropdownOpen(false);
						}}
						className="md:hidden"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
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
			</Container>

			{/* Mobile Menu */}
			{mobileMenuOpen && (
				<div className="md:hidden bg-gray-800 border-t border-gray-700">
					<Container>
						<ul className="flex flex-col space-y-2 p-4">
							<Link to="/" className="px-4 py-3 hover:text-gray-300">
								Home
							</Link>

							<Link to="/products" className="px-4 py-3 hover:text-gray-300">
								Product
							</Link>

							{/* Mobile Categories with Icon */}
							<li>
								<button
									onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
									className="w-full text-left px-4 py-3 flex justify-between items-center hover:text-gray-300"
								>
									<div className="flex items-center gap-2">
										
										<span>Categories</span>
									</div>
									<svg
										className={`w-4 h-4 transition-transform ${mobileDropdownOpen ? "rotate-180" : ""}`}
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

								{mobileDropdownOpen && (
									<ul className="ml-4 mt-2 space-y-2 bg-white rounded-md p-2">
										{categories.map((category) => (
											<Link
												key={category.slug}
												to={`/products?category=${category.slug}`}
												className="px-4 py-3 hover:bg-gray-100 text-black block"
											>
												{category.name}
											</Link>
										))}
									</ul>
								)}
							</li>

							<Link to="/ContactUs" className="px-4 py-3 hover:text-gray-300">
								Contact Us
							</Link>
						</ul>

						{/* Mobile Search */}
						<div className="px-4 pb-4">
							<form onSubmit={handleSearch} className="flex items-center" ref={searchRef}>
								<input
									type="text"
									placeholder="Search here..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
									className="px-3 py-2 text-black bg-amber-50 rounded-l-md outline-none w-full"
								/>
								{showSuggestions && searchResults.length > 0 && (
									<div className="absolute top-full left-0 right-0 bg-white text-black rounded-md shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
										{searchResults.map((product) => (
											<button
												key={product.id}
												type="button"
												onClick={() => handleProductClick(product.id)}
												className="w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-3"
											>
												<img
													src={product.image}
													alt={product.name}
													className="w-10 h-10 object-cover rounded"
												/>
												<div>
													<p className="text-sm font-medium text-gray-800">
														{product.name}
													</p>
													<p className="text-xs text-teal-500">৳{product.price}</p>
												</div>
											</button>
										))}
									</div>
								)}
								{showSuggestions && searchResults.length === 0 && searchQuery.trim() && (
									<div className="absolute top-full left-0 right-0 bg-white text-black rounded-md shadow-lg mt-1 p-4">
										<p className="text-sm text-gray-500">No products found</p>
									</div>
								)}
								<button type="submit" className="bg-teal-500 px-4 py-2 rounded-r-md hover:bg-teal-600">
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
										/>
									</svg>
								</button>
							</form>
						</div>
					</Container>
				</div>
			)}
		</nav>
	);
};

export default Navbar;