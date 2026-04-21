// src/components/BestSellingProducts/BestSellingProducts.jsx
// ✅ Swiper REMOVED — CSS transform carousel
// ✅ True infinite loop — [...products, ...products], silent snap (no jump)
// ✅ Hover pause
// ✅ Mobile: 2 cards per view

import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { getBestSellers } from "../../data/products";
import { clImg, clSrcSet } from "../../utils/cloudinaryImage";

// matchMedia = CSS query, zero layout reflow
const getSlidesPerView = () => {
	if (typeof window === "undefined") return 4;
	if (window.matchMedia("(min-width: 1280px)").matches) return 4;
	if (window.matchMedia("(min-width: 1024px)").matches) return 3;
	if (window.matchMedia("(min-width: 640px)").matches) return 2;
	return 2; // mobile: 2 cards — smaller & cleaner
};

const BestSellingProducts = () => {
	// ✅ CLS FIX: getBestSellers() is synchronous — lazy useState init
	// avoids useEffect 2-render cycle (loading spinner→carousel height shift = CLS)
	const [products] = useState(() => getBestSellers());

	const [addedMap, setAddedMap] = useState({});
	const [activeIndex, setActiveIndex] = useState(0);
	const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView);
	const [animating, setAnimating] = useState(true);
	const [isHovering, setIsHovering] = useState(false);

	const intervalRef = useRef(null);
	const snapTimerRef = useRef(null);

	const { addToCart } = useCart();
	const { toggleWishlist, isInWishlist } = useWishlist();
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const mqs = [
			window.matchMedia("(min-width: 1280px)"),
			window.matchMedia("(min-width: 1024px)"),
			window.matchMedia("(min-width: 640px)"),
		];
		const handler = () => setSlidesPerView(getSlidesPerView());
		mqs.forEach((mq) => mq.addEventListener("change", handler));
		return () => mqs.forEach((mq) => mq.removeEventListener("change", handler));
	}, []);

	// ─── Infinite loop logic ───────────────────────────────────────
	// extendedProducts = [...products, ...products]
	// When activeIndex reaches products.length:
	//   → view at products.length === view at 0 (seamless)
	//   → after transition (450ms), silently snap to 0
	// ──────────────────────────────────────────────────────────────
	const goNext = useCallback(() => {
		setActiveIndex((prev) => {
			const next = prev + 1;
			// If we just moved INTO the clone zone, schedule silent snap
			if (next >= products.length) {
				clearTimeout(snapTimerRef.current);
				snapTimerRef.current = setTimeout(() => {
					setAnimating(false);
					setActiveIndex(0);
					requestAnimationFrame(() =>
						requestAnimationFrame(() => setAnimating(true)),
					);
				}, 460); // just after the 0.45s transition
			}
			return next;
		});
	}, [products.length]);

	const startAutoplay = useCallback(() => {
		clearInterval(intervalRef.current);
		intervalRef.current = setInterval(goNext, 3000);
	}, [goNext]);

	const stopAutoplay = useCallback(() => {
		clearInterval(intervalRef.current);
	}, []);

	useEffect(() => {
		if (products.length === 0 || isHovering) return;
		startAutoplay();
		return stopAutoplay;
	}, [goNext, products.length, isHovering, startAutoplay, stopAutoplay]);

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

	const handleWishlist = (e, product) => {
		e.preventDefault();
		if (!user) {
			navigate("/login");
			return;
		}
		toggleWishlist(product);
	};

	// Double the slides for seamless infinite loop
	const extendedProducts = [...products, ...products];

	const slideWidth = 100 / slidesPerView;
	const translateX = -(activeIndex * slideWidth);

	// Dot count = real slides only (capped at maxIndex + 1)
	const maxIndex = Math.max(0, products.length - slidesPerView);
	const dotIndex =
		activeIndex >= products.length ? 0 : Math.min(activeIndex, maxIndex);

	return (
		<section
			className="max-w-7xl mx-auto py-4 md:py-8 px-4"
			aria-labelledby="best-sellers-heading"
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			<div className="mb-4 md:mb-10">
				<h2
					id="best-sellers-heading"
					className="text-xl text-center sm:text-4xl font-primary font-bold text-gray-800 mb-2"
				>
					Best Selling Products
				</h2>
			</div>

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
						const isAdded = addedMap[product.id];
						const wishlisted = isInWishlist(product.id);
						return (
							<div
								key={`${product.id}-${i}`}
								style={{ flex: `0 0 ${slideWidth}%`, padding: "0 6px" }}
								aria-hidden={i >= products.length}
							>
								<Link
									to={`/products/${product.id}`}
									aria-label={`${product.name} — ৳${product.price}`}
								>
									<div className="bg-white rounded-xl shadow p-2 border border-slate-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
										<div className="relative overflow-hidden rounded-lg w-full">
											<div
												className="relative overflow-hidden"
												onContextMenu={(e) => e.preventDefault()}
											>
												<img
													src={clImg(product.image, {
														width: 400,
														quality: "auto:eco",
													})}
													srcSet={clSrcSet(
														product.image,
														[300, 500, 700],
														"auto:eco",
													)}
													sizes="(max-width: 640px) 45vw, (max-width: 1024px) 45vw, (max-width: 1280px) 30vw, 22vw"
													alt={product.name}
													loading="eager"
													fetchPriority="high"
													decoding="sync"
													draggable="false"
													onContextMenu={(e) => e.preventDefault()}
													onDragStart={(e) => e.preventDefault()}
													width="400"
													height="500"
													className="aspect-[4/5] object-cover w-full select-none transition-transform duration-500 hover:scale-105"
												/>
												<div
													className="absolute inset-0 flex items-center justify-center pointer-events-none"
													aria-hidden="true"
												>
													<p className="text-[#D15F93] text-sm sm:text-xl font-bold opacity-30 rotate-[-20deg]">
														Twinkle and trend
													</p>
												</div>
											</div>

											{/* Wishlist */}
											<button
												onClick={(e) => handleWishlist(e, product)}
												aria-label={
													wishlisted
														? `${product.name} wishlist থেকে সরান`
														: `${product.name} wishlist এ যোগ করুন`
												}
												aria-pressed={wishlisted}
												className="absolute top-1.5 right-1.5 bg-white/90 backdrop-blur-sm rounded-full w-6 h-6 flex items-center justify-center shadow-sm hover:scale-110 transition-transform z-10"
											>
												<svg
													className="w-3.5 h-3.5"
													fill={wishlisted ? "#C2185B" : "none"}
													stroke="#C2185B"
													strokeWidth={2}
													viewBox="0 0 24 24"
													aria-hidden="true"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
													/>
												</svg>
											</button>

											{product.stock === 0 && (
												<div
													className="absolute top-1.5 left-1.5 bg-red-500 text-white px-1.5 py-0.5 text-[9px] sm:text-xs rounded-full font-medium"
													role="status"
												>
													Out of Stock
												</div>
											)}
											{product.stock < 10 && product.stock > 0 && (
												<div
													className="absolute top-7 left-1.5 bg-[#BE3F7A] text-white px-1.5 py-0.5 text-[9px] sm:text-xs rounded-full font-medium"
													role="status"
												>
													Only {product.stock} left!
												</div>
											)}
										</div>

										<div className="mt-2 flex flex-col grow">
											<h3 className="text-xs sm:text-base font-semibold text-gray-800 line-clamp-2 leading-tight">
												{product.name}
											</h3>
											<p className="text-green-700 font-bold text-sm sm:text-xl mt-1">
												৳{product.price}
											</p>
											<div className="flex items-center mt-0.5">
												<span
													className="text-yellow-500 text-xs"
													aria-hidden="true"
												>
													★
												</span>
												<span className="text-gray-600 text-xs ml-1">
													{product.rating}
												</span>
												<span className="sr-only">
													Rating: {product.rating} out of 5
												</span>
											</div>
											<button
												onClick={(e) => handleAddToCart(e, product)}
												disabled={product.stock === 0}
												aria-label={
													isAdded
														? `${product.name} cart এ যোগ হয়েছে`
														: `${product.name} cart এ যোগ করুন`
												}
												className={`mt-1.5 sm:mt-3 w-full py-1.5 sm:py-2.5 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 text-[11px] sm:text-sm ${
													isAdded
														? "bg-green-500 text-white"
														: "bg-[#BE3F7A] text-white hover:bg-[#9B2F62]"
												}`}
											>
												{isAdded ? (
													<>
														<svg
															className="w-3.5 h-3.5"
															fill="none"
															stroke="currentColor"
															strokeWidth={2.5}
															viewBox="0 0 24 24"
															aria-hidden="true"
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
															className="w-3.5 h-3.5 hidden sm:block"
															fill="none"
															stroke="currentColor"
															strokeWidth={2}
															viewBox="0 0 24 24"
															aria-hidden="true"
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
									</div>
								</Link>
							</div>
						);
					})}
				</div>
			</div>

			{/* Pagination dots */}
			<div
				className="flex justify-center gap-2 mt-6"
				role="tablist"
				aria-label="Slide navigation"
			>
				{Array.from({ length: maxIndex + 1 }).map((_, i) => (
					<button
						key={i}
						role="tab"
						aria-selected={i === dotIndex}
						aria-label={`Slide ${i + 1}`}
						onClick={() => goToIndex(i)}
						style={{
							height: "10px",
							borderRadius: "5px",
							background: i === dotIndex ? "#0f172a" : "#cbd5e1",
							width: i === dotIndex ? "28px" : "10px",
							transition: "all 0.3s",
							border: "none",
							cursor: "pointer",
							padding: 0,
						}}
					/>
				))}
			</div>
		</section>
	);
};

export default BestSellingProducts;
