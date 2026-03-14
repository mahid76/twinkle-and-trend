// src/pages/ProductDetail/ProductDetail.jsx
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../../components/layout/Container";
import { getDiscountPercentage, getProductById } from "../../data/products";

// ─── HD Image Zoom Modal (mobile) ─────────────────────────────────────────────
const ImageZoomModal = ({ image, onClose }) => {
	const [pos, setPos] = useState({ x: 50, y: 50 });
	const [isDragging, setIsDragging] = useState(false);
	const [lastTouch, setLastTouch] = useState(null);
	const ref = useRef(null);

	const handleTouchStart = (e) => {
		e.preventDefault();
		setIsDragging(true);
		setLastTouch({ x: e.touches[0].clientX, y: e.touches[0].clientY });
	};
	const handleTouchMove = (e) => {
		e.preventDefault();
		if (!isDragging || !lastTouch) return;
		const dx = ((e.touches[0].clientX - lastTouch.x) / window.innerWidth) * 80;
		const dy = ((e.touches[0].clientY - lastTouch.y) / window.innerHeight) * 80;
		setPos((prev) => ({
			x: Math.min(100, Math.max(0, prev.x - dx)),
			y: Math.min(100, Math.max(0, prev.y - dy)),
		}));
		setLastTouch({ x: e.touches[0].clientX, y: e.touches[0].clientY });
	};
	const handleTouchEnd = () => setIsDragging(false);

	useEffect(() => {
		const handler = (e) => e.key === "Escape" && onClose();
		window.addEventListener("keydown", handler);
		document.body.style.overflow = "hidden";
		return () => {
			window.removeEventListener("keydown", handler);
			document.body.style.overflow = "";
		};
	}, [onClose]);

	return (
		<div ref={ref} className="fixed inset-0 z-50 flex flex-col bg-black">
			<div className="flex items-center justify-between px-4 py-3 bg-black/80 flex-shrink-0">
				<span className="text-white/70 text-sm">HD Zoom — drag to pan</span>
				<button
					onClick={onClose}
					className="bg-white/20 hover:bg-white/30 text-white rounded-full w-9 h-9 flex items-center justify-center text-lg transition-colors"
				>
					✕
				</button>
			</div>
			<div
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
				onContextMenu={(e) => e.preventDefault()}
				className="flex-1 relative overflow-hidden select-none"
				style={{ touchAction: "none" }}
			>
				<div
					className="w-full h-full"
					style={{
						backgroundImage: `url(${image})`,
						backgroundRepeat: "no-repeat",
						backgroundSize: "250%",
						backgroundPosition: `${pos.x}% ${pos.y}%`,
					}}
				/>
				<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
					<p className="text-white text-2xl font-bold opacity-15 rotate-[-20deg] whitespace-nowrap">
						Twinkle and trend
					</p>
				</div>
			</div>
			<div className="px-4 py-2 bg-black/80 flex-shrink-0 text-center">
				<p className="text-white/50 text-xs">Tap × to close</p>
			</div>
		</div>
	);
};

// ─── PC Hover Zoom Panel ───────────────────────────────────────────────────────
const ZoomPanel = ({ src, zoomPos, containerRef, panelSize, zoom }) => {
	const [style, setStyle] = useState({});

	useEffect(() => {
		if (!containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		let left = rect.right + 20;
		if (left + panelSize > window.innerWidth - 10)
			left = rect.left - panelSize - 20;
		let top = rect.top;
		if (top + panelSize > window.innerHeight - 10)
			top = window.innerHeight - panelSize - 10;
		setStyle({ left, top, width: panelSize, height: panelSize });
	}, [containerRef, panelSize]);

	return (
		<div
			className="hidden md:block fixed z-40 rounded-xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-50"
			style={style}
		>
			<div
				className="w-full h-full"
				style={{
					backgroundImage: `url(${src})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: `${zoom * 100}%`,
					backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
				}}
			/>
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
				<p className="text-[#D15F93] text-lg font-bold opacity-25 rotate-[-20deg] whitespace-nowrap">
					Twinkle and trend
				</p>
			</div>
			<div className="absolute bottom-2 right-2 bg-black/40 text-white text-xs px-2 py-1 rounded-full pointer-events-none">
				HD Preview
			</div>
		</div>
	);
};

// ─── PC Hover Zoom Wrapper ─────────────────────────────────────────────────────
const HoverZoomImage = ({ image, hdImage, children }) => {
	const [hovered, setHovered] = useState(false);
	const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
	const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
	const containerRef = useRef(null);
	const LENS_SIZE = 100;

	const handleMouseMove = (e) => {
		const rect = containerRef.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		setLensPos({
			x: Math.min(Math.max(x - LENS_SIZE / 2, 0), rect.width - LENS_SIZE),
			y: Math.min(Math.max(y - LENS_SIZE / 2, 0), rect.height - LENS_SIZE),
		});
		setZoomPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
	};

	return (
		<>
			<div
				ref={containerRef}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				onMouseMove={handleMouseMove}
				className="relative cursor-crosshair"
			>
				{children}
				{hovered && (
					<div
						className="absolute border-2 border-[#E771A3] bg-white/20 pointer-events-none z-20"
						style={{
							left: lensPos.x,
							top: lensPos.y,
							width: LENS_SIZE,
							height: LENS_SIZE,
						}}
					/>
				)}
			</div>
			{hovered && (
				<ZoomPanel
					src={hdImage || image}
					zoomPos={zoomPos}
					containerRef={containerRef}
					panelSize={380}
					zoom={3}
				/>
			)}
		</>
	);
};

// ─── Variant Color Swatch with Hover Preview ──────────────────────────────────
const VariantSwatch = ({ variant, isSelected, onClick }) => {
	const [hovered, setHovered] = useState(false);
	const [panelStyle, setPanelStyle] = useState({});
	const containerRef = useRef(null);
	const PANEL_SIZE = 220;

	const handleMouseEnter = () => {
		if (!containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		let left = rect.right + 12;
		if (left + PANEL_SIZE > window.innerWidth - 10)
			left = rect.left - PANEL_SIZE - 12;
		let top = rect.top + rect.height / 2 - PANEL_SIZE / 2;
		top = Math.max(10, Math.min(top, window.innerHeight - PANEL_SIZE - 10));
		setPanelStyle({ left, top, width: PANEL_SIZE, height: PANEL_SIZE });
		setHovered(true);
	};

	return (
		<>
			<div
				ref={containerRef}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={() => setHovered(false)}
				onClick={() => variant.stock > 0 && onClick(variant)}
				className="relative"
			>
				<div
					title={variant.color}
					className={`relative w-9 h-9 rounded-full border-2 transition-all ${
						isSelected
							? "border-[#E771A3] scale-110 shadow-md"
							: "border-gray-300 hover:border-gray-400 hover:scale-105"
					} ${variant.stock === 0 ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
					style={{ backgroundColor: variant.colorHex }}
				>
					{isSelected && (
						<span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold drop-shadow">
							✓
						</span>
					)}
					{variant.stock === 0 && (
						<span className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
							<div className="w-full h-0.5 bg-gray-500 rotate-45" />
						</span>
					)}
				</div>
			</div>

			{/* ✅ Hover preview panel — variant এর 1st image দেখাবে */}
			{hovered && variant.images?.[0] && (
				<div
					className="hidden md:block fixed z-50 rounded-xl overflow-hidden shadow-2xl border-2 border-[#E771A3] pointer-events-none"
					style={panelStyle}
				>
					<img
						src={variant.images[0]}
						alt={variant.color}
						draggable={false}
						className="w-full h-full object-cover"
						onContextMenu={(e) => e.preventDefault()}
					/>
					{/* Label */}
					<div className="absolute bottom-0 left-0 right-0 bg-black/55 text-white text-xs text-center py-2 font-medium">
						{variant.color} —{" "}
						{variant.offerPrice && variant.offerPrice < variant.price
							? `৳${variant.offerPrice}`
							: `৳${variant.price}`}
					</div>
					{/* Watermark */}
					<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
						<p className="text-[#D15F93] text-sm font-bold opacity-20 rotate-[-20deg] whitespace-nowrap">
							Twinkle and trend
						</p>
					</div>
				</div>
			)}
		</>
	);
};

// ─── Main Component ───────────────────────────────────────────────────────────
const ProductDetail = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const [activeImage, setActiveImage] = useState(0);
	const [zoomOpen, setZoomOpen] = useState(false);
	const [selectedVariant, setSelectedVariant] = useState(null);

	const whatsappNumber = "8801601117737";
	const facebookPageUsername = "profile.php?id=61574753113504";

	useEffect(() => {
		setLoading(true);
		setError(null);
		try {
			const foundProduct = getProductById(id);
			if (foundProduct) {
				setProduct(foundProduct);
				if (foundProduct.variants?.length > 0) {
					setSelectedVariant(foundProduct.variants[0]);
				}
			} else {
				setError("Product not found");
			}
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}, [id]);

	const handleVariantChange = (variant) => {
		setSelectedVariant(variant);
		setActiveImage(0);
		setQuantity(1);
	};

	const handleQuantityChange = (change) => {
		const maxStock = selectedVariant ? selectedVariant.stock : product?.stock;
		setQuantity((prev) => {
			const next = prev + change;
			return next >= 1 && next <= maxStock ? next : prev;
		});
	};

	// ✅ Variant থাকলে variant data, না থাকলে product data
	const activeImages = selectedVariant?.images || product?.images || [];
	const activePrice = selectedVariant?.price ?? product?.price;
	const activeOfferPrice = selectedVariant?.offerPrice ?? product?.offerPrice;
	const activeStock = selectedVariant?.stock ?? product?.stock;

	const displayPrice =
		activeOfferPrice && activeOfferPrice < activePrice
			? activeOfferPrice
			: activePrice;
	const originalPrice =
		activeOfferPrice && activeOfferPrice < activePrice ? activePrice : null;
	const discount = originalPrice
		? getDiscountPercentage(originalPrice, displayPrice)
		: 0;
	const totalAmount = displayPrice * quantity;

	const currentImage = activeImages[activeImage];

	// ✅ Variant এর hdImages আগে, তারপর product এর hdImages, তারপর regular image
	const currentHdImage =
		selectedVariant?.hdImages?.[activeImage] ||
		product?.hdImages?.[activeImage] ||
		currentImage;

const buildOrderMessage = () =>
	`
*New Order Request*

*Product:* ${product.name}
${selectedVariant ? `*Color:* ${selectedVariant.color}` : ""}
${originalPrice ? `*Original Price:* Tk.${originalPrice}` : ""}
${originalPrice ? `*Offer Price:* Tk.${displayPrice}` : `*Price:* Tk.${displayPrice}`}
*Quantity:* ${quantity}
*Total:* Tk.${totalAmount}
${originalPrice ? `*You Save:* Tk.${(originalPrice - displayPrice) * quantity}` : ""}

*Category:* ${product.category}
*SKU:* T&T-${product.id}${selectedVariant ? `-${selectedVariant.color.toUpperCase().slice(0, 3)}` : ""}

Please confirm my order!
	`.trim();


	const handleBuyNowWhatsApp = () => {
		if (activeStock > 0)
			window.open(
				`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(buildOrderMessage())}`,
				"_blank",
			);
	};

	const handleSendMessageFacebook = () => {
		if (activeStock > 0)
			window.open(
				`https://m.me/${facebookPageUsername}?ref=product&message=${encodeURIComponent(buildOrderMessage())}`,
				"_blank",
			);
	};

	const handleVisitFacebookPage = () => {
		if (activeStock > 0)
			window.open(`https://www.facebook.com/${facebookPageUsername}`, "_blank");
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E771A3] mx-auto mb-4" />
					<p className="text-gray-600">Loading product details...</p>
				</div>
			</div>
		);
	}

	if (error || !product) {
		return (
			<Container>
				<div className="text-center py-12">
					<p className="text-red-500 text-xl mb-4">
						Error: {error || "Product not found"}
					</p>
					<Link
						to="/products"
						className="text-[#E771A3] hover:underline text-lg"
					>
						← Back to Shop
					</Link>
				</div>
			</Container>
		);
	}

	return (
		<Container>
			{zoomOpen && (
				<ImageZoomModal
					image={currentHdImage}
					onClose={() => setZoomOpen(false)}
				/>
			)}

			<div className="py-4 md:py-6" />

			{/* Breadcrumb */}
			<nav className="text-sm text-gray-500 mb-6">
				<Link to="/" className="hover:text-[#E771A3]">
					Home
				</Link>
				<span className="mx-2">/</span>
				<Link to="/products" className="hover:text-[#E771A3]">
					Products
				</Link>
				<span className="mx-2">/</span>
				<span className="text-gray-800">{product.name}</span>
			</nav>

			<div className="block md:flex md:justify-between mb-8 md:mb-12">
				{/* ── Image Column ── */}
				<div className="product-image md:block">
					{/* ── Desktop layout ── */}
					<div className="hidden md:flex md:items-center md:justify-between">
						{/* Main image with hover zoom */}
						<HoverZoomImage image={currentImage} hdImage={currentHdImage}>
							<div
								className="relative overflow-hidden rounded-lg"
								style={{ width: "450px", aspectRatio: "4/5" }}
								onContextMenu={(e) => e.preventDefault()}
							>
								<img
									src={currentImage}
									alt={product.name}
									className="w-full h-full object-cover"
									draggable={false}
									onContextMenu={(e) => e.preventDefault()}
									onDragStart={(e) => e.preventDefault()}
								/>
								<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
									<p className="text-[#D15F93] text-xl font-bold opacity-30 rotate-[-20deg]">
										Twinkle and trend
									</p>
								</div>
								<div className="hidden md:flex absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/40 text-white text-xs px-3 py-1 rounded-full items-center gap-1.5 pointer-events-none">
									<svg
										className="w-3 h-3"
										fill="none"
										stroke="currentColor"
										strokeWidth={2}
										viewBox="0 0 24 24"
									>
										<circle cx="11" cy="11" r="8" />
										<path
											d="M21 21l-4.35-4.35M11 8v6M8 11h6"
											strokeLinecap="round"
										/>
									</svg>
									Hover to zoom
								</div>
							</div>
						</HoverZoomImage>

						{/* Desktop thumbnails — variant change হলে update হবে */}
						<div className="flex flex-col gap-2 ml-3">
							{activeImages.map((img, index) => (
								<button
									key={index}
									onClick={() => setActiveImage(index)}
									className={`border-2 rounded-lg overflow-hidden transition-all ${
										activeImage === index
											? "border-[#E771A3] ring-2 ring-[#E771A3] ring-opacity-50"
											: "border-gray-200 hover:border-gray-300"
									}`}
								>
									<div
										className="relative w-[100px]"
										style={{ aspectRatio: "4/5" }}
										onContextMenu={(e) => e.preventDefault()}
									>
										<img
											draggable={false}
											onContextMenu={(e) => e.preventDefault()}
											onDragStart={(e) => e.preventDefault()}
											src={img}
											alt={`${product.name} ${index + 1}`}
											className="w-full h-full object-cover"
										/>
										<div className="absolute inset-0" />
									</div>
								</button>
							))}
						</div>
					</div>

					{/* ── Mobile layout ── */}
					<div className="md:hidden">
						<div
							className="relative overflow-hidden rounded-lg mx-auto"
							style={{ maxWidth: "100%", aspectRatio: "4/5" }}
							onContextMenu={(e) => e.preventDefault()}
						>
							<img
								src={currentImage}
								alt={product.name}
								className="w-full h-full object-cover"
								draggable={false}
								onContextMenu={(e) => e.preventDefault()}
								onDragStart={(e) => e.preventDefault()}
							/>
							<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
								<p className="text-[#D15F93] text-xl font-bold opacity-30 rotate-[-20deg]">
									Twinkle and trend
								</p>
							</div>
							<button
								onClick={() => setZoomOpen(true)}
								className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg flex items-center gap-1.5 active:scale-95 transition-transform z-10"
							>
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									strokeWidth={2}
									viewBox="0 0 24 24"
								>
									<circle cx="11" cy="11" r="8" />
									<path
										d="M21 21l-4.35-4.35M11 8v6M8 11h6"
										strokeLinecap="round"
									/>
								</svg>
								HD Zoom
							</button>
						</div>

						{/* Mobile thumbnails — variant change হলে update হবে */}
						<div className="flex justify-center gap-2 mt-3">
							{activeImages.map((img, index) => (
								<button
									key={index}
									onClick={() => setActiveImage(index)}
									className={`flex-shrink-0 border-2 rounded-lg overflow-hidden transition-all ${
										activeImage === index
											? "border-[#E771A3] ring-2 ring-[#E771A3] ring-opacity-50"
											: "border-gray-200 hover:border-gray-300"
									}`}
								>
									<div
										className="relative w-[60px]"
										style={{ aspectRatio: "4/5" }}
										onContextMenu={(e) => e.preventDefault()}
									>
										<img
											draggable={false}
											onContextMenu={(e) => e.preventDefault()}
											onDragStart={(e) => e.preventDefault()}
											src={img}
											alt={`${product.name} ${index + 1}`}
											className="w-full h-full object-cover"
										/>
										<div className="absolute inset-0" />
									</div>
								</button>
							))}
						</div>
					</div>
				</div>

				{/* ── Details Column ── */}
				<div className="details mt-5 md:mt-0">
					<div className="space-y-6">
						{/* Name & Rating */}
						<div>
							<h1 className="text-2xl md:text-3xl font-primary font-bold text-gray-800 mb-1 md:mb-2">
								{product.name}
							</h1>
							<div className="flex items-center space-x-1 md:space-x-2 mb-1 md:mb-4">
								<div className="flex items-center">
									{[...Array(5)].map((_, i) => (
										<span
											key={i}
											className={
												i < Math.floor(product.rating)
													? "text-yellow-500"
													: "text-gray-300"
											}
										>
											★
										</span>
									))}
								</div>
								<span className="text-gray-500 text-sm ml-2">
									({product.rating} / 5.0)
								</span>
								<span className="text-gray-400 text-sm ml-2">(12 reviews)</span>
							</div>
						</div>

						{/* Price */}
						<div className="space-y-2">
							{originalPrice ? (
								<div className="flex items-center gap-3">
									<span className="text-2xl md:text-4xl font-bold text-[#E771A3]">
										৳{displayPrice}
									</span>
									<span className="text-md md:text-xl text-gray-400 line-through">
										৳{originalPrice}
									</span>
									<span className="text-[8px] md:text-sm text-green-600 font-bold bg-green-100 px-2 py-1 rounded">
										{discount}% OFF
									</span>
								</div>
							) : (
								<div className="text-2xl md:text-4xl font-bold text-[#E771A3]">
									৳{displayPrice}
								</div>
							)}
						</div>

						<p className="text-gray-600 leading-relaxed text-sm md:text-lg">
							{product.description}
						</p>

						{/* ✅ Color Variant Selector */}
						{product.variants?.length > 0 && (
							<div>
								<p className="text-gray-700 font-medium mb-3">
									Color:{" "}
									<span className="text-[#E771A3] font-semibold">
										{selectedVariant?.color}
									</span>
								</p>
								<div className="flex flex-wrap gap-3">
									{product.variants.map((variant, index) => (
										<VariantSwatch
											key={index}
											variant={variant}
											isSelected={selectedVariant?.color === variant.color}
											onClick={handleVariantChange}
										/>
									))}
								</div>
							</div>
						)}

						{/* Quantity */}
						<div className="flex items-center space-x-4">
							<div className="flex items-center space-x-2">
								<span className="text-gray-600 font-medium">Quantity:</span>
								<div className="flex items-center border border-gray-300 rounded-md">
									<button
										onClick={() => handleQuantityChange(-1)}
										className="px-4 md:py-2 hover:bg-gray-100 transition-colors"
									>
										-
									</button>
									<span className="px-3 py-1 md:px-6 md:py-2 font-medium">
										{quantity}
									</span>
									<button
										onClick={() => handleQuantityChange(1)}
										className="px-4 md:py-2 hover:bg-gray-100 transition-colors"
									>
										+
									</button>
								</div>
							</div>
							<span
								className={`font-medium ${activeStock > 0 ? "text-green-600" : "text-red-500"}`}
							>
								{activeStock > 0 ? `In Stock (${activeStock})` : "Out of Stock"}
							</span>
						</div>

						{/* Buy Buttons */}
						<div className="border-t border-gray-200 pt-4 md:pt-6 space-y-2 md:space-y-3">
							<button
								onClick={handleBuyNowWhatsApp}
								disabled={activeStock === 0}
								className="bg-green-500 text-white px-4 py-2 md:px-8 md:py-3 rounded-md hover:bg-green-600 w-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base md:text-lg font-medium flex items-center justify-center gap-2"
							>
								<svg
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
								</svg>
								Buy Now on WhatsApp
							</button>

							<div className="flex gap-2">
								<button
									onClick={handleVisitFacebookPage}
									disabled={activeStock === 0}
									className="bg-blue-600 text-white px-4 py-2 md:px-8 md:py-3 rounded-md hover:bg-blue-700 w-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-lg font-medium flex items-center justify-center gap-1 md:gap-2"
								>
									<svg
										className="w-5 h-5 md:w-6 md:h-6"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
									</svg>
									Visit Facebook Page
								</button>
								<button
									onClick={handleSendMessageFacebook}
									disabled={activeStock === 0}
									className="bg-blue-500 text-white px-4 py-2 md:px-8 md:py-3 rounded-md hover:bg-blue-600 w-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base md:text-lg font-medium flex items-center justify-center gap-2"
								>
									<svg
										className="w-5 h-5 md:w-6 md:h-6"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
									</svg>
									Send Message
								</button>
							</div>
						</div>

						{/* Product Meta */}
						<div className="border-t border-gray-200 pt-6 space-y-3">
							<div className="flex items-center space-x-2">
								<span className="text-gray-600 w-24">Category:</span>
								<span className="text-gray-800 font-medium">
									{product.category}
								</span>
							</div>
							<div className="flex items-center space-x-2">
								<span className="text-gray-600 w-24">SKU:</span>
								<span className="text-gray-800 font-medium">
									T&T-{product.id}
								</span>
							</div>
							<div className="flex items-center space-x-2">
								<span className="text-gray-600 w-24">Stock:</span>
								<span className="text-gray-800 font-medium">
									{activeStock} units
								</span>
							</div>
							<div className="flex items-center space-x-2">
								<span className="text-gray-600 w-24">Brand:</span>
								<span className="text-gray-800 font-medium">
									Twinkle & Trend
								</span>
							</div>
						</div>

						{/* Features */}
						<div className="border-t border-gray-200 pt-6">
							<h3 className="font-bold text-gray-800 mb-3">
								Product Features:
							</h3>
							<ul className="space-y-2">
								{product.features.map((feature, index) => (
									<li key={index} className="flex items-start space-x-2">
										<span className="text-[#E771A3] mt-1">✓</span>
										<span className="text-gray-600">{feature}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default ProductDetail;
