// src/pages/Wishlist/Wishlist.jsx
import { Link } from "react-router-dom";
import Container from "../../components/layout/Container";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { clImg, clSrcSet } from "../../utils/cloudinaryImage";

const Wishlist = () => {
	const { wishlistItems, removeFromWishlist } = useWishlist();
	const { addToCart } = useCart();
	const { user, authLoading } = useAuth();

	// ✅ auth load হওয়ার আগে redirect/login message দেখাবে না
	if (authLoading) {
		return (
			<div
				className="flex items-center justify-center min-h-[60vh]"
				role="status"
			>
				<div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#C2185B]" />
			</div>
		);
	}

	if (!user) {
		return (
			<Container>
				<div className="py-16 text-center">
					<div className="text-6xl mb-4">🤍</div>
					<h2 className="text-2xl font-bold text-gray-800 mb-2">
						Wishlist দেখতে Login করুন
					</h2>
					<p className="text-gray-500 mb-6">
						পছন্দের products save করতে account লাগবে।
					</p>
					<Link
						to="/login"
						className="bg-[#C2185B] text-white px-6 py-3 rounded-xl hover:bg-[#A01645] transition-colors inline-block font-semibold"
					>
						Login করুন
					</Link>
				</div>
			</Container>
		);
	}

	if (wishlistItems.length === 0) {
		return (
			<Container>
				<div className="py-16 text-center">
					<div className="text-6xl mb-4">🤍</div>
					<h2 className="text-2xl font-bold text-gray-800 mb-2">
						Wishlist খালি
					</h2>
					<p className="text-gray-500 mb-6">
						পছন্দের products এ ❤️ চেপে save করুন!
					</p>
					<Link
						to="/products"
						className="bg-[#C2185B] text-white px-6 py-3 rounded-xl hover:bg-[#A01645] transition-colors inline-block font-semibold"
					>
						Shop Now
					</Link>
				</div>
			</Container>
		);
	}

	return (
		<Container>
			<div className="py-6 md:py-10">
				<h1 className="text-2xl md:text-3xl font-primary font-bold text-gray-800 mb-6">
					My Wishlist
					<span className="ml-2 text-lg text-gray-400 font-normal">
						({wishlistItems.length} items)
					</span>
				</h1>
				<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
					{wishlistItems.map((item) => (
						<div
							key={item.id}
							className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all"
						>
							<div className="relative">
								<Link to={`/products/${item.productId}`}>
									<div className="aspect-4/5 overflow-hidden">
										<img
											src={clImg(item.image, 400)}
											srcSet={clSrcSet(item.image, [400, 700])}
											sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
											alt={item.name}
											loading="lazy"
											decoding="async"
											draggable={false}
											onContextMenu={(e) => e.preventDefault()}
											width="400"
											height="500"
											className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
										/>
									</div>
								</Link>
								<button
									onClick={() => removeFromWishlist(item.productId)}
									className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors"
								>
									<svg
										className="w-4 h-4 text-[#C2185B]"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
									</svg>
								</button>
							</div>
							<div className="p-3">
								<Link to={`/products/${item.productId}`}>
									<h3 className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-[#C2185B] transition-colors mb-1">
										{item.name}
									</h3>
								</Link>
								<div className="flex items-center gap-2 mb-3">
									<span className="text-[#C2185B] font-bold text-sm">
										Tk.{item.price}
									</span>
									{item.originalPrice && (
										<span className="text-gray-400 text-xs line-through">
											Tk.{item.originalPrice}
										</span>
									)}
								</div>
								<button
									onClick={() =>
										addToCart(
											{
												id: item.productId,
												name: item.name,
												image: item.image,
												price: item.price,
												stock: 99,
												category: item.category,
											},
											null,
											1,
										)
									}
									className="w-full bg-[#C2185B] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#A01645] transition-colors"
								>
									Add to Cart
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</Container>
	);
};

export default Wishlist;
