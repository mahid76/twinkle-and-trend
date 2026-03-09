// src/components/Navbar/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import Container from "../layout/Container";

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

	const dropdownRef = useRef(null);
	const { pathname } = useLocation();

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
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

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
								<Link to="/">
									<li className="px-4 py-3 hover:bg-gray-100 text-sm">
										Electronics
									</li>
								</Link>

								<Link to="/">
									<li className="px-4 py-3 hover:bg-gray-100 text-sm">
										Fashion
									</li>
								</Link>

								<Link to="/">
									<li className="px-4 py-3 hover:bg-gray-100 text-sm">Books</li>
								</Link>

								<Link to="/">
									<li className="px-4 py-3 hover:bg-gray-100 text-sm">
										Home & Kitchen
									</li>
								</Link>
							</ul>
						</li>

						<Link to="/ContactUs" className="hover:text-gray-300">
							Contact Us
						</Link>
					</ul>

					{/* Desktop Search */}
					<div className="hidden md:flex items-center w-64">
						<input
							type="text"
							placeholder="Search here..."
							className="px-3 py-1 text-black bg-amber-50 rounded-l-md outline-none w-full"
						/>
						<button className="bg-teal-500 px-4 py-1 rounded-r-md hover:bg-teal-600">
							Search
						</button>
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

							{/* Mobile Dropdown */}
							<li>
								<button
									onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
									className="w-full text-left px-4 py-3 flex justify-between items-center"
								>
									Categories
								</button>

								{mobileDropdownOpen && (
									<ul className="ml-4 mt-2 space-y-2 bg-white rounded-md p-2">
										<Link to="/">
											<li className="px-4 py-3 hover:bg-gray-100 text-black">
												Electronics
											</li>
										</Link>

										<Link to="/">
											<li className="px-4 py-3 hover:bg-gray-100 text-black">
												Fashion
											</li>
										</Link>
										<Link to="/">
											<li className="px-4 py-3 hover:bg-gray-100 text-black">
												Books
											</li>
										</Link>
										<Link to="/">
											<li className="px-4 py-3 hover:bg-gray-100 text-black">
												Home & Kitchen
											</li>
										</Link>
									</ul>
								)}
							</li>

							<Link to="/ContactUs" className="px-4 py-3 hover:text-gray-300">
								Contact Us
							</Link>
						</ul>

						{/* Mobile Search */}
						<div className="px-4 pb-4">
							<div className="flex items-center">
								<input
									type="text"
									placeholder="Search here..."
									className="px-3 py-2 text-black bg-amber-50 rounded-l-md outline-none w-full"
								/>
								<button className="bg-teal-500 px-4 py-2 rounded-r-md hover:bg-teal-600">
									Search
								</button>
							</div>
						</div>
					</Container>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
