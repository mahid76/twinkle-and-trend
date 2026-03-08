// src/pages/Products/Products.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import tr1 from "../../assets/t&tr1.JPEG";
import tr2 from "../../assets/t&tr2.jpg";
import tr3 from "../../assets/t&tr3.jpg";
import tr4 from "../../assets/t&tr4.jpg";
import tr5 from "../../assets/t&tr5.jpg";
import Container from "../../components/layout/Container";

const Products = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [sortBy, setSortBy] = useState("default");

	// Mock product data
	const mockProducts = [
		{
			id: 1,
			name: "Bag",
			price: 2999,
			image: tr1,
			rating: 4.5,
			category: "Fashion",
			stock: 50,
		},
		{
			id: 2,
			name: "Cat Doll",
			price: 599,
			image: tr2,
			rating: 4.2,
			category: "Toys",
			stock: 100,
		},
		{
			id: 3,
			name: "Stanley",
			price: 399,
			image: tr3,
			rating: 4.8,
			category: "Home & Kitchen",
			stock: 75,
		},
		{
			id: 4,
			name: "Two doll",
			price: 1999,
			image: tr4,
			rating: 4.6,
			category: "Toys",
			stock: 30,
		},
		{
			id: 5,
			name: "Tashbih",
			price: 4999,
			image: tr5,
			rating: 4.7,
			category: "Religious",
			stock: 25,
		},
		{
			id: 6,
			name: "Leather Wallet",
			price: 1299,
			image: tr1,
			rating: 4.3,
			category: "Fashion",
			stock: 60,
		},
		{
			id: 7,
			name: "Sunglasses",
			price: 899,
			image: tr2,
			rating: 4.4,
			category: "Fashion",
			stock: 45,
		},
		{
			id: 8,
			name: "Kitchen Knife Set",
			price: 2499,
			image: tr3,
			rating: 4.9,
			category: "Home & Kitchen",
			stock: 20,
		},
	];

	useEffect(() => {
		setTimeout(() => {
			setProducts(mockProducts);
			setLoading(false);
		}, 1000);
	}, []);

	// Filter products
	const filteredProducts = products.filter((product) => {
		const matchesSearch = product.name
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const matchesCategory =
			selectedCategory === "" || product.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	// Sort products
	const sortedProducts = [...filteredProducts].sort((a, b) => {
		if (sortBy === "price-low") return a.price - b.price;
		if (sortBy === "price-high") return b.price - a.price;
		if (sortBy === "rating") return b.rating - a.rating;
		return 0;
	});

	// Categories
	const categories = ["All", "Fashion", "Toys", "Home & Kitchen", "Religious"];

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading products...</p>
				</div>
			</div>
		);
	}

	return (
		<Container>
			<div className="py-8">
				{/* Page Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl font-primary font-bold text-gray-800 mb-2">
						Shop All Products
					</h1>
					<p className="text-gray-600">
						{filteredProducts.length} products found
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
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E6A0B5]"
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
							onChange={(e) => setSelectedCategory(e.target.value)}
							className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E6A0B5]"
						>
							<option value="">All Categories</option>
							{categories
								.filter((c) => c !== "All")
								.map((category) => (
									<option key={category} value={category}>
										{category}
									</option>
								))}
						</select>

						{/* Sort By */}
						<select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E6A0B5]"
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
							onClick={() =>
								setSelectedCategory(category === "All" ? "" : category)
							}
							className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
								(category === "All" && selectedCategory === "") ||
								selectedCategory === category
									? "bg-[#E6A0B5] text-white"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
						>
							{category}
						</button>
					))}
				</div>

				{/* Products Grid */}
				{sortedProducts.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{sortedProducts.map((product) => (
							<Link
								key={product.id}
								to={`/products/${product.id}`}
								className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
							>
								{/* Product Image */}
								<div className="relative overflow-hidden">
									<img
										src={product.image}
										alt={product.name}
										className="w-full h-64 object-cover"
									/>
									{product.stock === 0 && (
										<div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
											Out of Stock
										</div>
									)}
									{product.stock < 10 && product.stock > 0 && (
										<div className="absolute top-2 left-2 bg-[#E6A0B5] text-white px-3 py-1 rounded-full text-sm font-medium">
											Only {product.stock} left!
										</div>
									)}
								</div>

								{/* Product Info */}
								<div className="p-4">
									<div className="flex items-center justify-between mb-2">
										<span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
											{product.category}
										</span>
										<div className="flex items-center">
											<span className="text-yellow-500 text-sm">★</span>
											<span className="text-gray-600 text-sm ml-1">
												{product.rating}
											</span>
										</div>
									</div>

									<h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
										{product.name}
									</h3>

									<p className="text-teal-500 font-bold text-xl mb-3">
										৳{product.price}
									</p>

									<button className="w-full bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors">
										View Details
									</button>
								</div>
							</Link>
						))}
					</div>
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
							}}
							className="bg-[#E6A0B5] text-white px-6 py-2 rounded-md hover:bg-[#F6D6DF] transition-colors"
						>
							Clear Filters
						</button>
					</div>
				)}

				{/* Pagination */}
				{sortedProducts.length > 0 && (
					<div className="flex justify-center mt-12">
						<nav className="flex space-x-2">
							<button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
								Previous
							</button>
							<button className="px-4 py-2 bg-[#E6A0B5] text-white rounded-md">
								1
							</button>
							<button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
								2
							</button>
							<button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
								3
							</button>
							<button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
								Next
							</button>
						</nav>
					</div>
				)}
			</div>
		</Container>
	);
};

export default Products;
