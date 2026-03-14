// src/pages/Products/Products.jsx
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Container from "../../components/layout/Container";
import { getDiscountPercentage, products } from "../../data/products";
import { useCart } from "../../context/CartContext";

// ✅ Skeleton Card
const SkeletonCard = () => (
	<div className="bg-white rounded-md md:rounded-lg shadow-sm overflow-hidden animate-pulse">
		<div className="aspect-4/5 bg-gray-200 rounded-lg" />
		<div className="px-2 py-2 md:p-4 space-y-2">
			<div className="h-3 bg-gray-200 rounded w-1/2" />
			<div className="h-4 bg-gray-200 rounded w-3/4" />
			<div className="h-4 bg-gray-200 rounded w-1/3" />
			<div className="h-8 bg-gray-200 rounded w-full" />
		</div>
	</div>
);

const Products = () => {
	const [searchParams] = useSearchParams();
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	
	const [sortBy, setSortBy] = useState("default");
	const [currentPage, setCurrentPage] = useState(1);
	const [addedMap, setAddedMap] = useState({});

	// ✅ Loading মাত্র 600ms — তারপর skeleton সরে যাবে
	const [loading, setLoading] = useState(true);

	const itemsPerPage = 12;
	const { addToCart } = useCart();

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 600);
		return () => clearTimeout(timer);
	}, []);

	const categoryMap = {
		fashion: "Fashion",
		toys: "Toys",
		"home-kitchen": "Home & Kitchen",
		religious: "Religious",
		electronics: "Electronics",
		sports: "Sports",
	};

	const reverseCategoryMap = Object.fromEntries(
		Object.entries(categoryMap).map(([key, value]) => [value, key]),
	);

	const categories = ["All", ...new Set(products.map((p) => p.category))];

	useEffect(() => {
		const categoryParam = searchParams.get("category");
		const searchParam = searchParams.get("search");
		if (categoryParam && categoryMap[categoryParam]) {
			setSelectedCategory(categoryMap[categoryParam]);
		}
		if (searchParam) setSearchTerm(searchParam);
	}, [searchParams]);

	const filteredProducts = products.filter((product) => {
		const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory =
			selectedCategory === "" ||
			product.category === reverseCategoryMap[selectedCategory];
		return matchesSearch && matchesCategory;
	});

	const sortedProducts = [...filteredProducts].sort((a, b) => {
		if (sortBy === "price-low") return a.price - b.price;
		if (sortBy === "price-high") return b.price - a.price;
		if (sortBy === "rating") return b.rating - a.rating;
		return 0;
	});

	const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const currentProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

	const handleFilterChange = () => setCurrentPage(1);

	const handlePageChange = (page) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	const handleAddToCart = (e, product) => {
		e.preventDefault();
		const defaultVariant = product.variants?.[0] ?? null;
		addToCart(product, defaultVariant, 1);
		setAddedMap((prev) => ({ ...prev, [product.id]: true }));
		setTimeout(() => setAddedMap((prev) => ({ ...prev, [product.id]: false })), 2000);
	};

	const getPageNumbers = () => {
		const pages = [];
		if (totalPages <= 5) {
			for (let i = 1; i <= totalPages; i++) pages.push(i);
		} else if (currentPage <= 3) {
			[1, 2, 3, 4, "...", totalPages].forEach((p) => pages.push(p));
		} else if (currentPage >= totalPages - 2) {
			[1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages].forEach((p) => pages.push(p));
		} else {
			[1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages].forEach((p) => pages.push(p));
		}
		return pages;
	};

	return (
		<Container>
			<div className="py-5 md:py-8">
				{/* Header */}
				<div className="text-center mb-2 md:mb-8">
					<h1 className="text-2xl sm:text-4xl font-primary font-bold text-gray-800 mb-2 md:mb-4">
						Shop All Products
					</h1>
					<p className="text-gray-600 md:text-base text-sm">
						{sortedProducts.length} products available
					</p>
				</div>

				{/* Filter Bar */}
				<div className="bg-red rounded-md md:rounded-lg shadow-sm md:shadow-lg p-3 md:p-6 mb-4 md:mb-8">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
						<div className="relative">
							<input
								type="text"
								placeholder="Search products..."
								value={searchTerm}
								onChange={(e) => { setSearchTerm(e.target.value); handleFilterChange(); }}
								className="w-full px-2 py-2 md:px-4 md:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E771A3]"
							/>
							<svg className="absolute right-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
						</div>
						<select
							value={selectedCategory}
							onChange={(e) => { setSelectedCategory(e.target.value); handleFilterChange(); }}
							className="w-full px-2 py-2 md:px-4 md:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E771A3]"
						>
							<option value="">All Categories</option>
							{categories.filter((c) => c !== "All").map((category) => (
								<option key={category} value={categoryMap[category] || category}>
									{categoryMap[category] || category}
								</option>
							))}
						</select>
						<select
							value={sortBy}
							onChange={(e) => { setSortBy(e.target.value); handleFilterChange(); }}
							className="w-full px-2 py-2 md:px-4 md:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E771A3]"
						>
							<option value="default">Sort By: Default</option>
							<option value="price-low">Price: Low to High</option>
							<option value="price-high">Price: High to Low</option>
							<option value="rating">Rating: High to Low</option>
						</select>
					</div>
				</div>

				{/* Category Pills */}
				<div className="flex flex-wrap gap-2 mb-4 md:mb-8">
					{categories.map((category) => (
						<button
							key={category}
							onClick={() => { setSelectedCategory(category === "All" ? "" : categoryMap[category]); handleFilterChange(); }}
							className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
								(category === "All" && selectedCategory === "") || selectedCategory === categoryMap[category]
									? "bg-[#E771A3] text-white"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
						>
							{categoryMap[category] || category}
						</button>
					))}
				</div>

				{/* ✅ Skeleton — 600ms পরে সরে যাবে */}
				{loading ? (
					<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{Array.from({ length: 12 }).map((_, i) => (
							<SkeletonCard key={i} />
						))}
					</div>
				) : currentProducts.length > 0 ? (
					<>
						<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{currentProducts.map((product) => {
								const hasOffer = product.offerPrice && product.offerPrice < product.price;
								const discount = hasOffer ? getDiscountPercentage(product.price, product.offerPrice) : 0;
								const isAdded = addedMap[product.id];

								return (
									<Link
										key={product.id}
										to={`/products/${product.id}`}
										className="bg-white rounded-md md:rounded-lg shadow-sm md:shadow-lg overflow-hidden hover:shadow-md md:hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
									>
										<div className="relative overflow-hidden">
											<div className="relative overflow-hidden aspect-4/5 rounded-lg" onContextMenu={(e) => e.preventDefault()}>
												<img
													src={product.image}
													alt={product.name}
													draggable="false"
													onDragStart={(e) => e.preventDefault()}
													className="w-full h-full object-cover select-none"
													loading="lazy"
												/>
												<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
													<p className="text-[#D15F93] text-xl font-bold opacity-30 rotate-[-20deg]">Twinkle and trend</p>
												</div>
												<div className="absolute inset-0" />
											</div>
											{product.stock === 0 && <div className="absolute top-2 right-2 bg-red-500 text-white px-2 md:px-3 py-1 text-[10px] md:text-sm rounded-full font-medium">Out of Stock</div>}
											{product.stock < 10 && product.stock > 0 && <div className="absolute top-2 left-2 bg-[#E771A3] text-white px-2 md:px-3 py-1 text-[10px] md:text-sm rounded-full font-medium">Only {product.stock} left!</div>}
											{hasOffer && <div className="absolute md:top-4 md:right-4 top-2 right-2 bg-[#E771A3] text-white px-2 md:px-3 py-1 text-[10px] md:text-sm rounded-full font-bold">{discount}% OFF</div>}
											{product.isBestSeller && <div className="absolute top-2 left-2 bg-[#F6D6DF] text-[#E771A3] px-2 md:px-3 py-1 rounded-full text-[10px] md:text-sm font-bold">⭐ Best Seller</div>}
										</div>

										<div className="px-2 py-2 md:p-4">
											<div className="flex items-center justify-between mb-2">
												<span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{categoryMap[product.category] || product.category}</span>
												<div className="flex items-center">
													<span className="text-yellow-500 text-sm">★</span>
													<span className="text-gray-600 text-sm ml-1">{product.rating}</span>
												</div>
											</div>
											<h1 className="text-md md:text-xl mb-2 font-semibold text-gray-800 line-clamp-2">{product.name}</h1>
											<div className="mb-2 md:mb-3">
												{hasOffer ? (
													<div className="flex items-center gap-2">
														<span className="text-[#E771A3] font-bold text-lg md:text-xl">৳{product.offerPrice}</span>
														<span className="text-gray-400 text-sm line-through">৳{product.price}</span>
													</div>
												) : (
													<p className="text-[#E771A3] font-bold text-lg md:text-xl">৳{product.price}</p>
												)}
											</div>
											<button
												onClick={(e) => handleAddToCart(e, product)}
												disabled={product.stock === 0}
												className={`w-full px-4 py-2 rounded-md transition-all duration-300 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
													isAdded ? "bg-green-500 text-white" : "bg-[#E771A3] text-white hover:bg-[#d15f93]"
												}`}
											>
												{isAdded ? (
													<><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>Added!</>
												) : (
													<><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>Add to Cart</>
												)}
											</button>
										</div>
									</Link>
								);
							})}
						</div>

						{totalPages > 1 && (
							<div className="flex justify-center mt-12">
								<nav className="flex items-center space-x-1 md:space-x-2">
									{getPageNumbers().map((page, index) => (
										<button
											key={index}
											onClick={() => typeof page === "number" && handlePageChange(page)}
											className={`px-2 md:px-4 py-1 md:py-2 rounded-md transition-colors ${
												page === currentPage ? "bg-[#E771A3] text-white" : page === "..." ? "cursor-default" : "bg-white border border-gray-300 hover:bg-gray-50"
											}`}
											disabled={page === "..."}
										>
											{page}
										</button>
									))}
								</nav>
							</div>
						)}
					</>
				) : (
					<div className="text-center py-12">
						<svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<h3 className="text-xl font-bold text-gray-800 mb-2">No products found</h3>
						<p className="text-gray-600 mb-4">Try adjusting your search or filter.</p>
						<button
							onClick={() => { setSearchTerm(""); setSelectedCategory(""); setSortBy("default"); handleFilterChange(); }}
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