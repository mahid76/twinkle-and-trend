// src/components/ProductSlider.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getBestSellers } from "../../data/products";

const ProductSlider = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	// Fetch Best Sellers
	useEffect(() => {
		setLoading(true);
		const bestSellers = getBestSellers();
		setProducts(bestSellers);
		setLoading(false);
	}, []);

	if (loading) {
		return (
			<div className="max-w-7xl mx-auto py-12 px-4">
				<h1 className="text-2xl sm:text-4xl font-primary font-bold text-gray-800 mb-2">
					Best Selling Products
				</h1>
				<div className="flex items-center justify-center min-h-[400px]">
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
						<p className="text-gray-600">Loading products...</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-7xl  mx-auto py-4 md:py-8 px-4">
			<div className="mb-6 md:mb-10">
				<h1 className="text-2xl text-center sm:text-4xl font-primary font-bold text-gray-800 mb-2">
					Best Selling Products
				</h1>
			</div>

			<div className="relative group">
				<Swiper
					modules={[Navigation, Pagination, Autoplay]}
					spaceBetween={20}
					loop={true}
					autoplay={{
						delay: 3000,
						disableOnInteraction: false,
					}}
					pagination={{
						clickable: true,
						el: ".custom-pagination",
						renderBullet: function (index, className) {
							return '<span class="' + className + '"></span>';
						},
					}}
					navigation={true}
					breakpoints={{
						0: { slidesPerView: 1, navigation: false, pagination: false },
						640: { slidesPerView: 2, navigation: false },
						1024: { slidesPerView: 3, navigation: true },
						1280: { slidesPerView: 4, navigation: true },
					}}
					className="rounded-xl"
				>
					{products.map((product) => (
						<SwiperSlide key={product.id}>
							<Link to={`/products/${product.id}`}>
							<div className="flex justify-center md:block">
									<div className="bg-white rounded-xl shadow p-2 md:p-4 border border-slate-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
									{/* Product Image */}
									<div className="relative overflow-hidden rounded-lg max-w-70 md:w-full h-full object-cover transition-transform duration-300 hover:scale-105">
										<div
											className="relative overflow-hidden "
											onContextMenu={(e) => e.preventDefault()}
										>
											<img
												draggable="false"
												onContextMenu={(e) => e.preventDefault()}
												onDragStart={(e) => e.preventDefault()}
												src={product.image}
												alt={product.name}
												className="aspect-4/5  object-cover select-none transition-transform duration-500 hover:scale-105"
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
											<div className="absolute top-2 right-2 bg-red-500 text-white px-2 md:px-3 py-1 md:py-1 text-[10px] md:text-sm rounded-full font-medium">
												Out of Stock
											</div>
										)}
										{product.stock < 10 && product.stock > 0 && (
											<div className="absolute top-2 left-2 bg-[#E771A3] text-white px-2 md:px-3 py-1 md:py-1 text-[10px] md:text-sm rounded-full  font-medium">
												Only {product.stock} left!
											</div>
										)}
									</div>

									{/* Product Info */}
									<div className="mt-3 md:mt-4 flex flex-col grow">
										<h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
											{product.name}
										</h3>
										<p className="text-emerald-600 font-bold text-xl mt-1 md:mt-2">
											৳{product.price}
										</p>
										<div className="flex items-center mt-1 md:mt-2">
											<span className="text-yellow-500 text-sm">★</span>
											<span className="text-gray-600 text-sm ml-1">
												{product.rating}
											</span>
										</div>
										<button className="mt-2 md:mt-4 w-full bg-teal-500 text-white py-2.5 rounded-lg font-medium hover:bg-teal-600 transition-colors">
											View Details
										</button>
									</div>
								</div>
							</div>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>

				{/* Custom Pagination */}
				<div className="custom-pagination flex justify-center gap-2 mt-8"></div>
			</div>

			{/* Custom Styles */}
			<style
				dangerouslySetInnerHTML={{
					__html: `
        .custom-pagination .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #cbd5e1;
          opacity: 1;
          transition: all 0.3s;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background: #0f172a;
          width: 30px;
          border-radius: 6px;
        }
      `,
				}}
			/>
		</div>
	);
};

export default ProductSlider;
