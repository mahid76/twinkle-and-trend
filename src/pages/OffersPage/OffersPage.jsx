// src/pages/OffersPage/OffersPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/layout/Container";
import { products, getDiscountPercentage } from "../../data/products";

const OffersPage = () => {
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 12;

	useEffect(() => {
		// Filter products with offerPrice
		const offers = products.filter(
			(p) => p.offerPrice && p.offerPrice < p.price
		);
		setFilteredProducts(offers);
		setLoading(false);
	}, []);

	// Calculate current products
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentProducts = filteredProducts.slice(
		indexOfFirstItem,
		indexOfLastItem
	);

	// Calculate total pages
	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

	// Change page
	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<Container>
			<div className="py-8">
				{/* Page Header */}
				<div className="text-center mb-12">
					<h1 className="text-4xl font-primary font-bold text-gray-800 mb-4">
						🎉 Special Offers
					</h1>
					<p className="text-gray-600 text-lg">
						Get amazing deals on selected products
					</p>
					<p className="text-gray-500 mt-2">
						Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} products
					</p>
				</div>

				{/* Loading State */}
				{loading && (
					<div className="flex items-center justify-center py-12">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E771A3]"></div>
					</div>
				)}

				{/* Products Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
					{currentProducts.map((product) => {
						const discount = getDiscountPercentage(product.price, product.offerPrice);

						return (
							<div
								key={product.id}
								className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
							>
								{/* Product Image */}
								<div className="relative">
									<Link to={`/products/${product.id}`}>
										<img
											src={product.image}
											alt={product.name}
											className="w-full h-64 object-cover"
										/>
									</Link>

									{/* Offer Badge */}
									<div className="absolute top-4 right-4 bg-[#E771A3] text-white px-3 py-1 rounded-full text-sm font-bold">
										{discount}% OFF
									</div>

									{/* Best Seller Badge */}
									{product.isBestSeller && (
										<div className="absolute top-4 left-4 bg-[#F6D6DF] text-[#E771A3] px-3 py-1 rounded-full text-sm font-bold">
											⭐ Best Seller
										</div>
									)}
								</div>

								{/* Product Info */}
								<div className="p-6">
									<Link to={`/products/${product.id}`}>
										<h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-[#E771A3]">
											{product.name}
										</h3>
									</Link>

									<p className="text-gray-600 text-sm mb-4">
										{product.description}
									</p>

									{/* Price */}
									<div className="flex items-center gap-3 mb-4">
										<span className="text-2xl font-bold text-[#E771A3]">
											৳{product.offerPrice}
										</span>
										<span className="text-lg text-gray-400 line-through">
											৳{product.price}
										</span>
										<span className="text-sm text-green-600 font-medium">
											Save ৳{product.price - product.offerPrice}
										</span>
									</div>

									{/* Stock Status */}
									<div className="flex items-center justify-between mb-4">
										<span
											className={`text-sm font-medium ${
												product.stock > 0 ? "text-green-600" : "text-red-500"
											}`}
										>
											{product.stock > 0 ? "In Stock" : "Out of Stock"}
										</span>
										<span className="text-sm text-gray-500">
											{product.rating} ⭐
										</span>
									</div>

									{/* Buy Button */}
									<Link
										to={`/products/${product.id}`}
										className="block text-center bg-[#E771A3] text-white px-6 py-3 rounded-lg hover:bg-[#d15f93] transition-colors font-medium"
									>
										View Details
									</Link>
								</div>
							</div>
						);
					})}
				</div>

				{/* Pagination */}
				{totalPages > 1 && (
					<div className="flex items-center justify-center gap-2 mb-8">
						{/* Previous Button */}
						<button
							onClick={() => paginate(currentPage - 1)}
							disabled={currentPage === 1}
							className={`px-4 py-2 rounded-lg font-medium transition-colors ${
								currentPage === 1
									? "bg-gray-300 text-gray-500 cursor-not-allowed"
									: "bg-[#E771A3] text-white hover:bg-[#d15f93]"
							}`}
						>
							Previous
						</button>

						{/* Page Numbers */}
						{Array.from({ length: totalPages }, (_, index) => (
							<button
								key={index + 1}
								onClick={() => paginate(index + 1)}
								className={`px-4 py-2 rounded-lg font-medium transition-colors ${
									currentPage === index + 1
										? "bg-[#E771A3] text-white"
										: "bg-white text-gray-700 hover:bg-gray-100"
								}`}
							>
								{index + 1}
							</button>
						))}

						{/* Next Button */}
						<button
							onClick={() => paginate(currentPage + 1)}
							disabled={currentPage === totalPages}
							className={`px-4 py-2 rounded-lg font-medium transition-colors ${
								currentPage === totalPages
									? "bg-gray-300 text-gray-500 cursor-not-allowed"
									: "bg-[#E771A3] text-white hover:bg-[#d15f93]"
							}`}
						>
							Next
						</button>
					</div>
				)}

				{/* No Products Found */}
				{!loading && filteredProducts.length === 0 && (
					<div className="text-center py-12">
						<p className="text-gray-500 text-lg">No offers available at the moment</p>
					</div>
				)}
			</div>
		</Container>
	);
};

export default OffersPage;