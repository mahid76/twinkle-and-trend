
import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/layout/Container";
import { getDiscountPercentage, products } from "../../data/products";

const Products = () => {
	const [visibleCount, setVisibleCount] = useState(4);

	const visibleProducts = products.slice(0, visibleCount);

	// Category Mapping
	const categoryMap = {
		fashion: "Fashion",
		toys: "Toys",
		"home-kitchen": "Home & Kitchen",
		religious: "Religious",
		electronics: "Electronics",
		sports: "Sports",
	};

	return (
		<Container>
			<div className="py-5 md:py-8">
				{/* Page Header */}
				<div className="text-center mb-6 md:mb-10">
					<h1 className="text-2xl sm:text-4xl font-primary font-bold text-gray-800 mb-2">
						Shop All Products
					</h1>
					{/* <p className="text-gray-600 text-sm md:text-base">
						{products.length} products available
					</p> */}
				</div>

				{/* Products Grid */}
				<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
					{visibleProducts.map((product) => {
						const hasOffer =
							product.offerPrice && product.offerPrice < product.price;

						const discount = hasOffer
							? getDiscountPercentage(product.price, product.offerPrice)
							: 0;

						return (
							<Link
								key={product.id}
								to={`/products/${product.id}`}
								className="bg-white rounded-md md:rounded-lg shadow-sm md:shadow-lg overflow-hidden hover:shadow-md md:hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
							>
								{/* Product Image */}
								<div className="relative overflow-hidden">
									<div
										className="relative overflow-hidden aspect-4/5"
										onContextMenu={(e) => e.preventDefault()}
									>
										<img
											src={product.image}
											alt={product.name}
											draggable="false"
											onDragStart={(e) => e.preventDefault()}
											className="w-full h-full object-cover select-none transition-transform duration-500 hover:scale-105"
										/>

										{/* Watermark */}
										<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
											<p className="text-[#D15F93] text-xl font-bold opacity-30 rotate-[-20deg]">
												Twinkle and trend
											</p>
										</div>

										<div className="absolute inset-0"></div>
									</div>

									{/* Stock Badge */}
									{product.stock === 0 && (
										<div className="absolute top-2 right-2 bg-red-500 text-white px-2 md:px-3 py-1 md:py-1 text-[10px] md:text-sm rounded-full font-medium">
											Out of Stock
										</div>
									)}

									{product.stock < 10 && product.stock > 0 && (
										<div className="absolute top-2 left-2 bg-[#E771A3] text-white px-2 md:px-3 py-1 md:py-1 text-[10px] md:text-sm rounded-full  font-medium">
											Only {product.stock} left!
										</div>
									)}

									{/* Discount Badge */}
									{hasOffer && (
										<div className="absolute md:top-4 md:right-4 top-2 right-2 bg-[#E771A3] text-white px-2 md:px-3 py-1 md:py-1 text-[10px] md:text-sm rounded-full  font-bold">
											{discount}% OFF
										</div>
									)}

									{/* Best Seller */}
									{product.isBestSeller && (
										<div className="absolute top-2 left-2 bg-[#F6D6DF] text-[#E771A3]  px-2 md:px-3 py-1 md:py-1 rounded-full text-[10px] md:text-sm font-bold">
											⭐ Best Seller
										</div>
									)}
								</div>

								{/* Product Info */}
								<div className="px-2 py-2 md:p-4">
									{/* Category + Rating */}
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

									{/* Price */}
									<div className="">
										{" "}
										{/* if text in 2 line, h-12 md:h-full  */}
										<h1 class="text-md md:text-xl mb-2 font-semibold text-gray-800 line-clamp-2">
											{product.name}
										</h1>
									</div>
									<div className="mb-2 md:mb-3">
										{hasOffer ? (
											<div className="flex items-center gap-2">
												<span className="text-[#E771A3] font-bold text-lg md:text-xl">
													৳{product.offerPrice}
												</span>
												<span className="text-gray-400 text-sm line-through">
													৳{product.price}
												</span>
											</div>
										) : (
											<p className="text-[#E771A3] font-bold  text-lg md:text-xl">
												৳{product.price}
											</p>
										)}
									</div>

									{/* Button */}
									<button className="w-full bg-[#E771A3] text-white  px-4 py-2 rounded-md hover:bg-[#d15f93] transition-colors">
										View Details
									</button>
								</div>
							</Link>
						);
					})}
				</div>

				{/* View More / View Less */}
				<div className="flex justify-center mt-5 md:mt-10">
					{visibleCount < products.length ? (
						<button
							onClick={() => setVisibleCount((prev) => prev + 4)}
							className="bg-[#E771A3] text-white px-6 py-3 rounded-md hover:bg-[#d15f93] transition-all duration-300 hover:scale-105"
						>
							View More
						</button>
					) : (
						<button
							onClick={() => setVisibleCount(4)}
							className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-all duration-300 hover:scale-105"
						>
							View Less
						</button>
					)}
				</div>
			</div>
		</Container>
	);
};

export default Products;
