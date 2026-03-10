// src/components/Navbar/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Container from "../layout/Container";
import { products } from "../../data/products";

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

	// Search states
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(false);

	const navigate = useNavigate();
	const dropdownRef = useRef(null);
	const searchRef = useRef(null);
	const { pathname } = useLocation();

	/* -------------------------------
	   Auto Close Menus On Route Change
	   ------------------------------- */
	useEffect(() => {
		setMobileMenuOpen(false);
		setMobileDropdownOpen(false);
		setOpen(false);
	}, [pathname]);


	/* -------------------------------
	   Close Dropdowns When Clicking Outside
	   ------------------------------- */
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


	/* -------------------------------
	   Search Suggestion Logic (Debounce)
	   ------------------------------- */
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


	/* -------------------------------
	   Search Submit Handler (Search Button / Enter)
	   ------------------------------- */
	const handleSearch = (e) => {
		e.preventDefault();
		if (!searchQuery.trim()) return;

		navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
		setShowSuggestions(false);
	};


	/* -------------------------------
	   Suggestion Product Click
	   ------------------------------- */
	const handleProductClick = (id) => {
		setShowSuggestions(false);
		navigate(`/products/${id}`);
	};


	/* -------------------------------
	   Common handler for Link click (Mobile)
	   ------------------------------- */
	const handleLinkClick = () => {
		setMobileMenuOpen(false);
		setMobileDropdownOpen(false);
		setOpen(false);
	};


	/* -------------------------------
	   Categories List
	   ------------------------------- */
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

					{/* --------- LOGO ---------- */}
					<Link to="/" onClick={handleLinkClick}>
						<div className="flex items-center">
							<img src={logo} alt="Logo" className="h-10 mr-4" />
							<span className="text-lg font-primary font-bold hidden md:block">
								Twinkle and Trend
							</span>
						</div>
					</Link>

					{/* --------- DESKTOP MENU ---------- */}
					<ul className="hidden md:flex font-secondary space-x-6 text-sm items-center">

						<Link to="/" className="hover:text-gray-300 px-6 py-3">
							Home
						</Link>

						<Link to="/products" className="hover:text-gray-300 px-6 py-3">
							Product
						</Link>

						{/* Categories Dropdown */}
						<li ref={dropdownRef} className="relative group">
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
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
								</svg>
							</button>

							<ul
								className={`absolute top-12 left-0 bg-white text-black w-48 rounded-md shadow-lg transition-all duration-200 ${
									open ? "opacity-100 visible" : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
								}`}
							>
								{categories.map((cat) => (
									<Link key={cat.slug} to={`/products?category=${cat.slug}`} className="block px-4 py-3 hover:bg-gray-100">
										{cat.name}
									</Link>
								))}
							</ul>
						</li>

						<Link to="/ContactUs" className="hover:text-gray-300 px-6 py-3">
							Contact Us
						</Link>
					</ul>


					{/* --------- DESKTOP SEARCH ---------- */}
					<div className="hidden md:flex items-center w-64 relative" ref={searchRef}>
						<form onSubmit={handleSearch} className="relative flex w-full">

							<input
								type="text"
								placeholder="Search here..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								onFocus={() => searchQuery && setShowSuggestions(true)}
								className="px-3 py-1 text-black bg-amber-50 rounded-l-md outline-none w-full"
							/>

							{/* Suggestions dropdown */}
							{showSuggestions && (
								<div className="absolute top-full left-0 right-0 bg-white text-black rounded-md shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">

									{searchResults.length > 0 ? (
										searchResults.map((p) => (
											<button
												key={p.id}
												type="button"
												onClick={() => handleProductClick(p.id)}
												className="w-full px-4 py-3 flex gap-3 items-center hover:bg-gray-100 text-left"
											>
												<img src={p.image} className="w-10 h-10 object-cover rounded" />
												<div>
													<p className="text-sm font-medium">{p.name}</p>
													<p className="text-xs text-teal-600">৳{p.price}</p>
												</div>
											</button>
										))
									) : (
										<div className="p-3 text-gray-500">No products found</div>
									)}
								</div>
							)}

							<button type="submit" className="bg-teal-500 px-4 py-1 rounded-r-md hover:bg-teal-600">
								Search
							</button>
						</form>
					</div>

					{/* --------- MOBILE MENU BUTTON ---------- */}
					<button
						onClick={() => {
							setMobileMenuOpen(!mobileMenuOpen);
							setMobileDropdownOpen(false);
						}}
						className="md:hidden"
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
			</Container>

			{/* --------- MOBILE MENU ---------- */}
			{mobileMenuOpen && (
				<div className="md:hidden bg-gray-800 border-t border-gray-700">
					<Container>
						<ul className="flex flex-col space-y-2 p-4">

							<Link to="/" onClick={handleLinkClick} className="px-4 py-3 hover:text-gray-300">
								Home
							</Link>

							<Link to="/products" onClick={handleLinkClick} className="px-4 py-3 hover:text-gray-300">
								Product
							</Link>

							{/* mobile categories */}
							<li>
								<button
									onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
									className="w-full text-left px-4 py-3 flex justify-between items-center hover:text-gray-300"
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
									<ul className="ml-4 mt-2 space-y-2 bg-white rounded-md p-2">
										{categories.map((cat) => (
											<Link
												key={cat.slug}
												to={`/products?category=${cat.slug}`}
												onClick={handleLinkClick}
												className="px-4 py-3 hover:bg-gray-100 text-black block"
											>
												{cat.name}
											</Link>
										))}
									</ul>
								)}
							</li>

							<Link to="/ContactUs" onClick={handleLinkClick} className="px-4 py-3 hover:text-gray-300">
								Contact Us
							</Link>
						</ul>

						{/* --------- MOBILE SEARCH ---------- */}
						<div className="px-4 pb-4" ref={searchRef}>
							<form onSubmit={handleSearch} className="relative flex w-full">

								<input
									type="text"
									placeholder="Search here..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									onFocus={() => searchQuery && setShowSuggestions(true)}
									className="px-3 py-2 text-black bg-amber-50 rounded-l-md w-full outline-none"
								/>

								{showSuggestions && (
									<div className="absolute top-full left-0 right-0 bg-white text-black rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto z-50">

										{searchResults.length > 0 ? (
											searchResults.map((p) => (
												<button
													key={p.id}
													type="button"
													onClick={() => handleProductClick(p.id)}
													className="w-full px-4 py-3 flex gap-3 hover:bg-gray-100"
												>
													<img src={p.image} className="w-10 h-10 object-cover rounded" />
													<p>{p.name}</p>
												</button>
											))
										) : (
											<div className="p-3 text-gray-500">No products found</div>
										)}
									</div>
								)}

								<button type="submit" className="bg-teal-500 px-4 py-2 rounded-r-md hover:bg-teal-600">
									Search
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