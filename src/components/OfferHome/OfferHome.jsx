// src/components/OfferHome/OfferHome.jsx
// ✅ Swiper REMOVED — CSS transform carousel
// ✅ True infinite loop — seamless, no jump
// ✅ Hover pause
// ✅ Mobile: 2 cards per view — smaller & cleaner

import { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/layout/Container";
import { useCart } from "../../context/CartContext";
import { getDiscountPercentage, products } from "../../data/products";
import { clImg, clSrcSet } from "../../utils/cloudinaryImage";

const getSlidesPerView = () => {
	if (typeof window === "undefined") return 3;
	if (window.matchMedia("(min-width: 1024px)").matches) return 3;
	if (window.matchMedia("(min-width: 640px)").matches) return 2;
	return 2; // mobile: 2 cards — smaller & cleaner
};

const OfferHome = () => {
	const filteredProducts = products.filter(
		(p) => p.offerPrice && p.offerPrice < p.price,
	);

	const [addedMap, setAddedMap] = useState({});
	const [activeIndex, setActiveIndex] = useState(0);
	const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView);
	const [animating, setAnimating] = useState(true);
	const [isHovering, setIsHovering] = useState(false);

	const intervalRef = useRef(null);
	const snapTimerRef = useRef(null);
	const { addToCart } = useCart();

	useEffect(() => {
		const mqs = [
			window.matchMedia("(min-width: 1024px)"),
			window.matchMedia("(min-width: 640px)"),
		];
		const handler = () => setSlidesPerView(getSlidesPerView());
		mqs.forEach((mq) => mq.addEventListener("change", handler));
		return () => mqs.forEach((mq) => mq.removeEventListener("change", handler));
	}, []);

	const goNext = useCallback(() => {
		setActiveIndex((prev) => {
			const next = prev + 1;
			if (next >= filteredProducts.length) {
				clearTimeout(snapTimerRef.current);
				snapTimerRef.current = setTimeout(() => {
					setAnimating(false);
					setActiveIndex(0);
					requestAnimationFrame(() =>
						requestAnimationFrame(() => setAnimating(true))
					);
				}, 460);
			}
			return next;
		});
	}, [filteredProducts.length]);

	const startAutoplay = useCallback(() => {
		clearInterval(intervalRef.current);
		intervalRef.current = setInterval(goNext, 2500);
	}, [goNext]);

	const stopAutoplay = useCallback(() => {
		clearInterval(intervalRef.current);
	}, []);

	useEffect(() => {
		if (filteredProducts.length === 0 || isHovering) return;
		startAutoplay();
		return stopAutoplay;
	}, [goNext, filteredProducts.length, isHovering, startAutoplay, stopAutoplay]);

	const goToIndex = (i) => {
		clearTimeout(snapTimerRef.current);
		setAnimating(true);
		setActiveIndex(i);
		stopAutoplay();
		if (!isHovering) startAutoplay();
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

	if (filteredProducts.length === 0) return null;

	const extendedProducts = [...filteredProducts, ...filteredProducts];
	const slideWidth = 100 / slidesPerView;
	const translateX = -(activeIndex * slideWidth);

	const maxIndex = Math.max(0, filteredProducts.length - slidesPerView);
	const dotIndex = activeIndex >= filteredProducts.length ? 0 : Math.min(activeIndex, maxIndex);

	return (
		<Container>
			<section
				className="py-6 sm:py-8"
				aria-labelledby="special-offers-heading"
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
			>
				<div className="text-center mb-4 sm:mb-10">
					<h2
						id="special-offers-heading"
						className="text-xl sm:text-4xl font-primary font-bold text-gray-800 mb-1"
					>
						Special Offers
					</h2>
					<p className="text-gray-600 text-xs sm:text-sm md:text-base">
						Get amazing deals on selected products
					</p>
				</div>

				<div className="px-1 sm:px-4">
					<div className="relative overflow-hidden rounded-xl">
						<div
							style={{
								display: "flex",
								transform: `translateX(${translateX}%)`,
								transition: animating ? "transform 0.45s ease" : "none",
								willChange: "transform",
							}}
						>
							{extendedProducts.map((product, i) => {
								const discount = getDiscountPercentage(product.price, product.offerPrice);
								const isAdded = addedMap[product.id];

								return (
									<div
										key={`${product.id}-${i}`}
										style={{ flex: `0 0 ${slideWidth}%`, padding: "0 5px" }}
										aria-hidden={i >= filteredProducts.length || undefined}
								{...(i >= filteredProducts.length ? { inert: "" } : {})}
									>
										<div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 h-full">
											<div className="relative overflow-hidden rounded-t-xl aspect-square sm:aspect-[4/5]">
												<Link to={`/products/${product.id}`} tabIndex={-1} aria-hidden="true">
													<img
														src={clImg(product.image, { width: 400, quality: "auto" })}
														srcSet={clSrcSet(product.image, [250, 400, 600], "auto")}
														sizes="(max-width: 640px) 45vw, (max-width: 1024px) 45vw, 30vw"
														alt={product.name}
														loading={i === 0 ? "eager" : "lazy"}
														fetchPriority={i === 0 ? "high" : "auto"}
														decoding={i === 0 ? "sync" : "async"}
														width="400"
														height="400"
														draggable="false"
														onContextMenu={(e) => e.preventDefault()}
														onDragStart={(e) => e.preventDefault()}
														className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 select-none"
													/>
												</Link>
												<div
													className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-[#BE3F7A] text-white px-1.5 py-0.5 text-[9px] sm:text-xs rounded-full font-bold"
													aria-label={`${discount}% ছাড়`}
												>
													{discount}% OFF
												</div>
											</div>

											<div className="p-1.5 sm:p-4">
												<Link to={`/products/${product.id}`}>
													<h3 className="text-[10px] sm:text-base font-semibold text-gray-800 hover:text-[#BE3F7A] truncate leading-tight">
														{product.name}
													</h3>
												</Link>
												<div className="flex items-center gap-1 sm:gap-2 mt-1 sm:mt-2">
													<span className="text-sm sm:text-xl font-bold text-[#BE3F7A]">
														৳{product.offerPrice}
													</span>
													<span className="text-gray-500 line-through text-[9px] sm:text-sm">
														৳{product.price}
													</span>
												</div>
												<button
													onClick={(e) => handleAddToCart(e, product)}
													disabled={product.stock === 0}
													aria-label={isAdded ? "Cart এ যোগ হয়েছে" : `${product.name} cart এ যোগ করুন`}
													className={`mt-1.5 sm:mt-2 w-full py-1 sm:py-1.5 rounded-lg font-semibold text-[10px] sm:text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 sm:gap-1.5 ${
														isAdded ? "bg-green-500 text-white" : "bg-[#BE3F7A] text-white hover:bg-[#9B2F62]"
													}`}
												>
													{isAdded ? (
														<>
															<svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
																<path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
															</svg>
															Added!
														</>
													) : (
														<>
															<svg className="w-3 h-3 hidden sm:block" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
																<path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
															</svg>
															Add to Cart
														</>
													)}
												</button>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>

					{/* Pagination dots */}
					<div className="flex justify-center gap-1.5 mt-5" role="tablist" aria-label="Slide navigation">
						{Array.from({ length: maxIndex + 1 }).map((_, i) => (
							<button
								key={i}
								role="tab"
								aria-selected={i === dotIndex}
								aria-label={`Slide ${i + 1}`}
								onClick={() => goToIndex(i)}
								style={{
									padding: "8px 4px",
									background: "transparent",
									border: "none",
									cursor: "pointer",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									minWidth: "24px",
									minHeight: "24px",
								}}
							>
								<span
									style={{
										display: "block",
										height: "8px",
										borderRadius: "4px",
										background: i === dotIndex ? "#E771A3" : "#F6D6DF",
										width: i === dotIndex ? "22px" : "8px",
										transition: "all 0.3s ease",
									}}
								/>
							</button>
						))}
					</div>
				</div>
			</section>
		</Container>
	);
};

export default OfferHome;
