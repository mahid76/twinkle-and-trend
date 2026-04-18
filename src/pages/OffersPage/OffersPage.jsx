// src/pages/Offers/OffersPage.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../components/layout/Container";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { getDiscountPercentage, products } from "../../data/products";
import { clImg, clSrcSet } from "../../utils/cloudinaryImage";

const OffersPage = () => {
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [addedMap, setAddedMap] = useState({});
	const itemsPerPage = 12;
	const { addToCart } = useCart();
	const { toggleWishlist, isInWishlist } = useWishlist();
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const offers = products.filter(
			(p) => p.offerPrice && p.offerPrice < p.price,
		);
		setFilteredProducts(offers);
		setLoading(false);
	}, []);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentProducts = filteredProducts.slice(
		indexOfFirstItem,
		indexOfLastItem,
	);
	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleAddToCart = (e, product) => {
		e.preventDefault();
		addToCart(product, product.variants?.[0] ?? null, 1);
		setAddedMap((prev) => ({ ...prev, [product.id]: true }));
		setTimeout(
			() => setAddedMap((prev) => ({ ...prev, [product.id]: false })),
			2000,
		);
	};

	const handleWishlist = (e, product) => {
		e.preventDefault();
		if (!user) {
			navigate("/login");
			return;
		}
		toggleWishlist(product);
	};

	return (
		<Container>
			<div className="py-8">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-primary font-bold text-gray-800 mb-4">
						Special Offers
					</h1>
					<p className="text-gray-600 text-lg">
						Get amazing deals on selected products
					</p>
					<p className="text-gray-500 mt-2">
						{filteredProducts.length} products found
					</p>
				</div>

				{loading && (
					<div className="flex items-center justify-center py-12">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E771A3]" />
					</div>
				)}

				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
					{currentProducts.map((product) => {
						const discount = getDiscountPercentage(
							product.price,
							product.offerPrice,
						);
						const isAdded = addedMap[product.id];
						const wishlisted = isInWishlist(product.id);

						return (
							<Link
								key={product.id}
								to={`/products/${product.id}`}
								className="bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1"
							>
								<div className="relative">
									<div className="aspect-4/5 overflow-hidden">
										<img
											src={clImg(product.image, 400)}
											srcSet={clSrcSet(product.image, [400, 700])}
											sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
											alt={product.name}
											loading="lazy"
											decoding="async"
											draggable="false"
											onContextMenu={(e) => e.preventDefault()}
											onDragStart={(e) => e.preventDefault()}
											width="400"
											height="500"
											className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
										/>
									</div>
									{/* Wishlist */}
									<button
										onClick={(e) => handleWishlist(e, product)}
										className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full w-7 h-7 flex items-center justify-center shadow-sm hover:scale-110 transition-transform z-10"
									>
										<svg
											className="w-4 h-4"
											fill={wishlisted ? "#E771A3" : "none"}
											stroke="#E771A3"
											strokeWidth={2}
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
											/>
										</svg>
									</button>
									<div className="absolute top-2 left-2 bg-[#E771A3] text-white px-2 py-0.5 text-[10px] md:text-xs rounded-full font-bold">
										{discount}% OFF
									</div>
									{product.isBestSeller && (
										<div className="absolute bottom-2 left-2 bg-[#F6D6DF] text-[#E771A3] px-2 py-1 rounded-full text-[10px] font-bold">
											⭐ Best Seller
										</div>
									)}
								</div>
								<div className="p-3 md:p-4">
									<h3 className="text-sm md:text-base font-bold text-gray-800 mb-1 line-clamp-2 hover:text-[#E771A3] transition-colors">
										{product.name}
									</h3>
									<p className="text-gray-500 text-xs mb-2 line-clamp-2 hidden md:block">
										{product.description}
									</p>
									<div className="flex items-center gap-2 mb-3">
										<span className="text-lg font-bold text-[#E771A3]">
											৳{product.offerPrice}
										</span>
										<span className="text-sm text-gray-400 line-through">
											৳{product.price}
										</span>
									</div>
									<div className="flex items-center justify-between mb-3">
										<span
											className={`text-xs font-medium ${
												product.stock > 0 ? "text-green-600" : "text-red-500"
											}`}
										>
											{product.stock > 0 ? "In Stock" : "Out of Stock"}
										</span>
										<span className="text-xs text-gray-500">
											{product.rating} ⭐
										</span>
									</div>
									<button
										onClick={(e) => handleAddToCart(e, product)}
										disabled={product.stock === 0}
										className={`w-full py-2 rounded-lg font-semibold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
											isAdded
												? "bg-green-500 text-white"
												: "bg-[#E771A3] text-white hover:bg-[#d15f93]"
										}`}
									>
										{isAdded ? (
											<>
												<svg
													className="w-4 h-4"
													fill="none"
													stroke="currentColor"
													strokeWidth={2.5}
													viewBox="0 0 24 24"
												>
													<path
														d="M5 13l4 4L19 7"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
												Added!
											</>
										) : (
											<>
												<svg
													className="w-4 h-4"
													fill="none"
													stroke="currentColor"
													strokeWidth={2}
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
													/>
												</svg>
												Add to Cart
											</>
										)}
									</button>
								</div>
							</Link>
						);
					})}
				</div>

				{totalPages > 1 && (
					<div className="flex items-center justify-center gap-2 mb-8">
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

				{!loading && filteredProducts.length === 0 && (
					<div className="text-center py-12">
						<p className="text-gray-500 text-lg">
							No offers available at the moment
						</p>
					</div>
				)}
			</div>
		</Container>
	);
};

export default OffersPage;
