// src/pages/Products/Products.jsx
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Container from "../../components/layout/Container";
import { getDiscountPercentage, products } from "../../data/products";

const Products = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [sortBy, setSortBy] = useState("default");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 12;

	// ✅ Category Mapping (Slug to Name)
	const categoryMap = {
		fashion: "Fashion",
		toys: "Toys",
		"home-kitchen": "Home & Kitchen",
		religious: "Religious",
		electronics: "Electronics",
		sports: "Sports",
	};

	// ✅ Reverse Mapping (Name to Slug)
	const reverseCategoryMap = Object.fromEntries(
		Object.entries(categoryMap).map(([key, value]) => [value, key]),
	);

	// ✅ Get Unique Categories (from products data - slugs)
	const categories = ["All", ...new Set(products.map((p) => p.category))];

	// Initialize from URL params
	useEffect(() => {
		const categoryParam = searchParams.get("category");
		const searchParam = searchParams.get("search");

		if (categoryParam) {
			// ✅ Map slug to category name for display
			const categoryName = categoryMap[categoryParam];
			if (categoryName) {
				setSelectedCategory(categoryName);
			}
		}

		if (searchParam) {
			setSearchTerm(searchParam);
		}
	}, [searchParams]);

	// ✅ Filter Products
	const filteredProducts = products.filter((product) => {
		const matchesSearch = product.name
			.toLowerCase()
			.includes(searchTerm.toLowerCase());

		// ✅ Check if category matches (slug comparison)
		const matchesCategory =
			selectedCategory === "" ||
			product.category === reverseCategoryMap[selectedCategory];

		return matchesSearch && matchesCategory;
	});

	// Sort Products
	const sortedProducts = [...filteredProducts].sort((a, b) => {
		if (sortBy === "price-low") return a.price - b.price;
		if (sortBy === "price-high") return b.price - a.price;
		if (sortBy === "rating") return b.rating - a.rating;
		return 0;
	});

	// Pagination Logic
	const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentProducts = sortedProducts.slice(startIndex, endIndex);

	// Reset to page 1 when filters change
	const handleFilterChange = () => {
		setCurrentPage(1);
	};

	// Handle Page Change
	const handlePageChange = (page) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	// Get Page Numbers to Display
	const getPageNumbers = () => {
		const pages = [];
		const maxVisiblePages = 5;

		if (totalPages <= maxVisiblePages) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			if (currentPage <= 3) {
				for (let i = 1; i <= 4; i++) pages.push(i);
				pages.push("...");
				pages.push(totalPages);
			} else if (currentPage >= totalPages - 2) {
				pages.push(1);
				pages.push("...");
				for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
			} else {
				pages.push(1);
				pages.push("...");
				for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
				pages.push("...");
				pages.push(totalPages);
			}
		}
		return pages;
	};

	return (
		<Container>
			<div className="py-8">
				{/* Page Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl font-primary font-bold text-gray-800 mb-2">
						Shop All Products
					</h1>
					<p className="text-gray-600">
						{sortedProducts.length} products found
					</p>
				</div>

				{/* Search & Filter Bar */}
				<div className="bg-white rounded-lg shadow-lg p-6 mb-8">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{/* Search Input */}
						<div className="relative">
							<input
								type="text"
								placeholder="Search products..."
								value={searchTerm}
								onChange={(e) => {
									setSearchTerm(e.target.value);
									handleFilterChange();
								}}
								className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E771A3]"
							/>
							<svg
								className="absolute right-3 top-3 w-5 h-5 text-gray-400"
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
						</div>

						{/* Category Filter */}
						<select
							value={selectedCategory}
							onChange={(e) => {
								setSelectedCategory(e.target.value);
								handleFilterChange();
							}}
							className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E771A3]"
						>
							<option value="">All Categories</option>
							{categories
								.filter((c) => c !== "All")
								.map((category) => (
									<option
										key={category}
										value={categoryMap[category] || category}
									>
										{categoryMap[category] || category}
									</option>
								))}
						</select>

						{/* Sort By */}
						<select
							value={sortBy}
							onChange={(e) => {
								setSortBy(e.target.value);
								handleFilterChange();
							}}
							className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E771A3]"
						>
							<option value="default">Sort By: Default</option>
							<option value="price-low">Price: Low to High</option>
							<option value="price-high">Price: High to Low</option>
							<option value="rating">Rating: High to Low</option>
						</select>
					</div>
				</div>

				{/* Category Pills */}
				<div className="flex flex-wrap gap-2 mb-8">
					{categories.map((category) => (
						<button
							key={category}
							onClick={() => {
								setSelectedCategory(
									category === "All" ? "" : categoryMap[category],
								);
								handleFilterChange();
							}}
							className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
								(category === "All" && selectedCategory === "") ||
								selectedCategory === categoryMap[category]
									? "bg-[#E771A3] text-white"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
						>
							{categoryMap[category] || category}
						</button>
					))}
				</div>

				{/* Products Grid */}
				{currentProducts.length > 0 ? (
					<>
						<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{currentProducts.map((product) => {
								// Check if product has offer
								const hasOffer =
									product.offerPrice && product.offerPrice < product.price;
								const discount = hasOffer
									? getDiscountPercentage(product.price, product.offerPrice)
									: 0;

								return (
									<Link
										key={product.id}
										to={`/products/${product.id}`}
										className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
									>
										{/* Product Image */}
										<div className="relative overflow-hidden ">
											<div
												className="relative"
												onContextMenu={(e) => e.preventDefault()}
											>
												<img
													src={product.image}
													alt={product.name}
													draggable="false"
													onDragStart={(e) => e.preventDefault()}
													className="w-full h-64 object-cover select-none"
												/>
												{/* Watermark */}

												<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
													<p className="text-[#D15F93] text-xl font-bold opacity-30 rotate-[-20deg]">
														Twinkle and trend
													</p>
												</div>
												{/* invisible protection layer */}
												<div className="absolute inset-0"></div>
											</div>
											{product.stock === 0 && (
												<div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
													Out of Stock
												</div>
											)}
											{product.stock < 10 && product.stock > 0 && (
												<div className="absolute top-2 left-2 bg-[#E771A3] text-white px-3 py-1 rounded-full text-sm font-medium">
													Only {product.stock} left!
												</div>
											)}
											{hasOffer && (
												<div className="absolute top-2 right-2 bg-[#E771A3] text-white px-3 py-1 rounded-full text-sm font-bold">
													{discount}% OFF
												</div>
											)}
											{product.isBestSeller && (
												<div className="absolute top-2 left-2 bg-[#F6D6DF] text-[#E771A3] px-3 py-1 rounded-full text-sm font-bold">
													⭐ Best Seller
												</div>
											)}
										</div>

										{/* Product Info */}
										<div className="p-4">
											<div className="flex items-center justify-between mb-2">
												<span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
													{categoryMap[product.category] || product.category}
												</span>
												<div className="flex items-center">
													<span className="text-yellow-500 text-sm">★</span>
													<span className="text-gray-600 text-sm ml-1">
														{product.rating}
													</span>
												</div>
											</div>

											{/* Price Section */}
											<div className="mb-3">
												{hasOffer ? (
													<div className="flex items-center gap-2">
														<span className="text-[#E771A3] font-bold text-xl">
															৳{product.offerPrice}
														</span>
														<span className="text-gray-400 text-sm line-through">
															৳{product.price}
														</span>
													</div>
												) : (
													<p className="text-[#E771A3] font-bold text-xl">
														৳{product.price}
													</p>
												)}
											</div>

											<button className="w-full bg-[#E771A3] text-white px-4 py-2 rounded-md hover:bg-[#d15f93] transition-colors">
												View Details
											</button>
										</div>
									</Link>
								);
							})}
						</div>

						{/* Pagination */}
						{totalPages > 1 && (
							<div className="flex justify-center mt-12">
								<nav className="flex items-center space-x-2">
									{/* Previous Button */}
									<button
										onClick={() => handlePageChange(currentPage - 1)}
										disabled={currentPage === 1}
										className={`px-4 py-2 rounded-md transition-colors ${
											currentPage === 1
												? "bg-gray-200 text-gray-400 cursor-not-allowed"
												: "bg-white border border-gray-300 hover:bg-gray-50"
										}`}
									>
										Previous
									</button>

									{/* Page Numbers */}
									{getPageNumbers().map((page, index) => (
										<button
											key={index}
											onClick={() =>
												typeof page === "number" && handlePageChange(page)
											}
											className={`px-4 py-2 rounded-md transition-colors ${
												page === currentPage
													? "bg-[#E771A3] text-white"
													: page === "..."
														? "cursor-default"
														: "bg-white border border-gray-300 hover:bg-gray-50"
											}`}
											disabled={page === "..."}
										>
											{page}
										</button>
									))}

									{/* Next Button */}
									<button
										onClick={() => handlePageChange(currentPage + 1)}
										disabled={currentPage === totalPages}
										className={`px-4 py-2 rounded-md transition-colors ${
											currentPage === totalPages
												? "bg-gray-200 text-gray-400 cursor-not-allowed"
												: "bg-white border border-gray-300 hover:bg-gray-50"
										}`}
									>
										Next
									</button>
								</nav>
							</div>
						)}
					</>
				) : (
					<div className="text-center py-12">
						<svg
							className="w-16 h-16 text-gray-400 mx-auto mb-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<h3 className="text-xl font-bold text-gray-800 mb-2">
							No products found
						</h3>
						<p className="text-gray-600 mb-4">
							Try adjusting your search or filter to find what you're looking
							for.
						</p>
						<button
							onClick={() => {
								setSearchTerm("");
								setSelectedCategory("");
								setSortBy("default");
								handleFilterChange();
							}}
							className="bg-[#E771A3] text-white px-6 py-2 rounded-md hover:bg-[#F6D6DF] transition-colors"
						>
							Clear Filters
						</button>
					</div>
				)}
			</div>
		</Container>
	);
};

export default Products;
