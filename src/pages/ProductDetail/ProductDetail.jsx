// src/pages/ProductDetail/ProductDetail.jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../../components/layout/Container";
import { getProductById } from "../../data/products";

const ProductDetail = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const [activeImage, setActiveImage] = useState(0);

	// ✅ WhatsApp Number (আপনার WhatsApp নম্বর দিন)
	const whatsappNumber = "8801601117737"; // ✅ আপনার WhatsApp নম্বর এখানে দিন

	// ✅ Facebook Page ID (আপনার Facebook Page ID দিন)
	const facebookPageId = "YOUR_PAGE_ID"; // ✅ আপনার Facebook Page ID এখানে দিন

	// Fetch Product Data
	useEffect(() => {
		setLoading(true);
		setError(null);

		try {
			const foundProduct = getProductById(id);
			if (foundProduct) {
				setProduct(foundProduct);
			} else {
				setError("Product not found");
			}
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}, [id]);

	// Handle Quantity Change
	const handleQuantityChange = (change) => {
		setQuantity((prev) => {
			const newQuantity = prev + change;
			return newQuantity >= 1 && newQuantity <= product?.stock
				? newQuantity
				: prev;
		});
	};

	// Handle Buy Now - WhatsApp
	const handleBuyNowWhatsApp = () => {
		if (product?.stock > 0) {
			const message = `
🛒 *New Order Request*

 *Product:* ${product.name}
 *Price:* ৳${product.price}
 *Quantity:* ${quantity}
 *Total:* ৳${product.price * quantity}

 *Category:* ${product.category}


Please confirm my order!
			`.trim();

			const encodedMessage = encodeURIComponent(message);
			const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
			window.open(whatsappUrl, "_blank");
		}
	};

	// Handle Buy Now - Facebook
	const handleBuyNowFacebook = () => {
		if (product?.stock > 0) {
			const message = `
🛒 *New Order Request*

📦 *Product:* ${product.name}
💰 *Price:* ৳${product.price}
📊 *Quantity:* ${quantity}
💵 *Total:* ৳${product.price * quantity}

📍 *Category:* ${product.category}
⭐ *Rating:* ${product.rating}/5

Please confirm my order!
			`.trim();

			const encodedMessage = encodeURIComponent(message);
			const facebookUrl = `https://m.me/${facebookPageId}?ref=product&message=${encodedMessage}`;
			window.open(facebookUrl, "_blank");
		}
	};

	// Loading State
	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading product details...</p>
				</div>
			</div>
		);
	}

	// Error State
	if (error || !product) {
		return (
			<Container>
				<div className="text-center py-12">
					<p className="text-red-500 text-xl mb-4">
						Error: {error || "Product not found"}
					</p>
					<Link
						to="/products"
						className="text-teal-500 hover:underline text-lg"
					>
						← Back to Shop
					</Link>
				</div>
			</Container>
		);
	}

	return (
		<Container>
			<div className="py-8">
				{/* Breadcrumb */}
				<nav className="text-sm text-gray-500 mb-6">
					<Link to="/" className="hover:text-[#E6A0B5]">
						Home
					</Link>
					<span className="mx-2">/</span>
					<Link to="/products" className="hover:text-[#E6A0B5]">
						Products
					</Link>
					<span className="mx-2">/</span>
					<span className="text-gray-800">{product.name}</span>
				</nav>

				{/* Product Details */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
					{/* Product Images */}
					<div className="space-y-4">
						{/* Main Image */}
						<div className="bg-white rounded-lg shadow-lg overflow-hidden">
							<img
								src={product.images[activeImage]}
								alt={product.name}
								className="w-full h-96 object-cover"
							/>
						</div>

						{/* Thumbnail Images */}
						<div className="grid grid-cols-4 gap-2">
							{product.images.map((img, index) => (
								<button
									key={index}
									onClick={() => setActiveImage(index)}
									className={`border-2 rounded-lg overflow-hidden transition-all ${
										activeImage === index
											? "border-[#E6A0B5] ring-2 ring-[#E6A0B5] ring-opacity-50"
											: "border-gray-200 hover:border-gray-300"
									}`}
								>
									<img
										src={img}
										alt={`${product.name} ${index + 1}`}
										className="w-full h-20 object-cover"
									/>
								</button>
							))}
						</div>
					</div>

					{/* Product Info */}
					<div className="space-y-6">
						<div>
							<h1 className="text-3xl font-primary font-bold text-gray-800 mb-2">
								{product.name}
							</h1>
							<div className="flex items-center space-x-2 mb-4">
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

						<div className="text-4xl font-bold text-teal-500">
							৳{product.price}
						</div>

						<p className="text-gray-600 leading-relaxed text-lg">
							{product.description}
						</p>

						{/* Quantity Selector */}
						<div className="flex items-center space-x-4">
							<div className="flex items-center space-x-2">
								<span className="text-gray-600 font-medium">Quantity:</span>
								<div className="flex items-center border border-gray-300 rounded-md">
									<button
										onClick={() => handleQuantityChange(-1)}
										className="px-4 py-2 hover:bg-gray-100 transition-colors"
									>
										-
									</button>
									<span className="px-6 py-2 font-medium">{quantity}</span>
									<button
										onClick={() => handleQuantityChange(1)}
										className="px-4 py-2 hover:bg-gray-100 transition-colors"
									>
										+
									</button>
								</div>
							</div>
							<span
								className={`font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}
							>
								{product.stock > 0 ? "In Stock" : "Out of Stock"}
							</span>
						</div>

						{/* Buy Now Buttons */}
						<div className="border-t border-gray-200 pt-6 space-y-3">
							<button
								onClick={handleBuyNowWhatsApp}
								disabled={product.stock === 0}
								className="bg-green-500 text-white px-8 py-3 rounded-md hover:bg-green-600 w-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg font-medium flex items-center justify-center gap-2"
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

							<button
								onClick={handleBuyNowFacebook}
								disabled={product.stock === 0}
								className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 w-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg font-medium flex items-center justify-center gap-2"
							>
								<svg
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
								</svg>
								Buy Now on Facebook
							</button>
						</div>

						{/* Product Details */}
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
									{product.stock} units
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
										<span className="text-[#E6A0B5] mt-1">✓</span>
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
