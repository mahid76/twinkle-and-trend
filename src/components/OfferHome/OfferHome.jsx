import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/layout/Container";
import { getDiscountPercentage, products } from "../../data/products";

// 1. Only Import Pagination and Autoplay
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// 2. Import core and pagination styles
import "swiper/css";
import "swiper/css/pagination";

const OfferHome = () => {
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const offers = products.filter(
			(p) => p.offerPrice && p.offerPrice < p.price,
		);
		setFilteredProducts(offers);
		setLoading(false);
	}, []);

	return (
		<Container>
			<div className=" py-6 md:py-8">
				{/* Page Header */}
				<div className="text-center mb-4 md:mb-12">
					<h1 className="text-2xl sm:text-4xl font-primary font-bold text-gray-800 mb-2">
						🎉 Special Offers
					</h1>
					<p className="text-gray-600 text-sm md:text-base">
						Get amazing deals on selected products
					</p>
				</div>

				{/* Loading State */}
				{loading && (
					<div className="flex items-center justify-center py-12">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E771A3]"></div>
					</div>
				)}

				{/* Swiper Slider without Arrows */}
				{!loading && filteredProducts.length > 0 && (
					<div className="relative group px-4">
						<Swiper
							modules={[Pagination, Autoplay]}
							spaceBetween={30}
							loop={filteredProducts.length > 3}
							autoplay={{
								delay: 1500,
								disableOnInteraction: false,
								pauseOnMouseEnter: true,
							}}
							pagination={{
								clickable: true,
								el: ".offers-pagination",
							}}
							breakpoints={{
								0: { slidesPerView: 1 },
								640: { slidesPerView: 2 },
								1024: { slidesPerView: 3 },
							}}
							className="pb-4"
						>
							{filteredProducts.map((product) => {
								const discount = getDiscountPercentage(
									product.price,
									product.offerPrice,
								);

								return (
									<SwiperSlide key={product.id}>
										<div className="bg-white rounded-xl shadow-sm md:shadow-md overflow-hidden hover:shadow-md md:hover:shadow-lg transition-all duration-300 border border-gray-100 mb-4 h-full">
											<div className="relative overflow-hidden aspect-4/5  rounded-lg">
												<Link to={`/products/${product.id}`}>
													<img
														src={product.image}
														alt={product.name}
														className="w-full h-full  object-cover select-none transform hover:scale-105 transition-transform duration-500"
													/>
                                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
													<p className="text-[#D15F93] text-xl font-bold opacity-30 rotate-[-20deg]">
														Twinkle and trend
													</p>
												</div>
                                                <div className="absolute inset-0"></div>
												</Link>
                                                
												<div className="absolute md:top-4 md:right-4 top-2 right-2 bg-[#E771A3] text-white px-2 md:px-3 py-1 md:py-1 text-[10px] md:text-sm rounded-full  font-bold">
													{discount}% OFF
												</div>
											</div>

											<div className="px-2 py-4 md:p-4">
												<Link to={`/products/${product.id}`}>
													<h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-[#E771A3] truncate">
														{product.name}
													</h3>
												</Link>
												<p className="text-gray-500 text-sm mb-3 md:mb-4 line-clamp-2 h-10">
													{product.description}
												</p>

												<div className="flex items-center gap-3 mb-3 md:mb-6">
													<span className="text-2xl font-bold text-[#E771A3]">
														৳{product.offerPrice}
													</span>
													<span className="text-gray-400 line-through text-sm">
														৳{product.price}
													</span>
												</div>

												<Link
													to={`/products/${product.id}`}
													className="block text-center bg-[#E771A3] text-white px-6 py-3 rounded-xl hover:bg-[#d15f93] transition-all font-bold shadow-md hover:shadow-lg active:scale-95"
												>
													Grab Offer
												</Link>
											</div>
										</div>
									</SwiperSlide>
								);
							})}
						</Swiper>

						{/* Pagination container remains outside */}
						<div className="offers-pagination flex justify-center gap-2 mt-10"></div>
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

			<style
				dangerouslySetInnerHTML={{
					__html: `
                .offers-pagination .swiper-pagination-bullet {
                    width: 10px;
                    height: 10px;
                    background: #F6D6DF;
                    opacity: 1;
                    transition: all 0.3s ease;
                }
                .offers-pagination .swiper-pagination-bullet-active {
                    background: #E771A3;
                    width: 28px;
                    border-radius: 5px;
                }
            `,
				}}
			/>
		</Container>
	);
};

export default OfferHome;
