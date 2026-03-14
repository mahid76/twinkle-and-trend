// src/pages/Cart/Cart.jsx
import { Link } from "react-router-dom";
import Container from "../../components/layout/Container";
import { useCart } from "../../context/CartContext";

const Cart = () => {
	const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();

	const whatsappNumber = "8801601117737";

	const handleWhatsAppOrder = () => {
		if (cartItems.length === 0) return;

		const itemLines = cartItems
			.map((item, i) =>
				`${i + 1}. *${item.name}*${item.color ? ` (${item.color})` : ""} x${item.quantity} = Tk.${item.price * item.quantity}`,
			)
			.join("\n");

		const savings = cartItems.reduce((sum, item) => {
			if (item.originalPrice) return sum + (item.originalPrice - item.price) * item.quantity;
			return sum;
		}, 0);

		const message = `
*New Order Request*

*Order Summary:*
${itemLines}

*Total Items:* ${cartItems.reduce((s, i) => s + i.quantity, 0)}
*Total Amount:* Tk.${cartTotal}
${savings > 0 ? `*You Save:* Tk.${savings}` : ""}

Please confirm my order!
		`.trim();

		window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
	};

	if (cartItems.length === 0) {
		return (
			<Container>
				<div className="py-16 text-center">
					<div className="text-6xl mb-4">🛒</div>
					<h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
					<p className="text-gray-500 mb-6">Add some products to get started!</p>
					<Link to="/products" className="bg-[#E771A3] text-white px-6 py-3 rounded-md hover:bg-[#d15f93] transition-colors inline-block">
						Shop Now
					</Link>
				</div>
			</Container>
		);
	}

	return (
		<Container>
			<div className="py-6 md:py-10">
				{/* Header */}
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl md:text-3xl font-primary font-bold text-gray-800">
						My Cart
						<span className="ml-2 text-lg text-gray-400 font-normal">
							({cartItems.reduce((s, i) => s + i.quantity, 0)} items)
						</span>
					</h1>
					<button onClick={clearCart} className="text-sm text-red-400 hover:text-red-600 transition-colors">
						Clear All
					</button>
				</div>

				<div className="flex flex-col lg:flex-row gap-6">
					{/* Cart Items */}
					<div className="flex-1 space-y-4">
						{cartItems.map((item) => (
							<div key={item.cartId} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-4">
								<Link to={`/products/${item.productId}`} className="flex-shrink-0">
									<div className="w-20 h-24 md:w-24 md:h-28 rounded-lg overflow-hidden bg-gray-100">
										<img
											src={item.image}
											alt={item.name}
											draggable={false}
											onContextMenu={(e) => e.preventDefault()}
											className="w-full h-full object-cover"
										/>
									</div>
								</Link>

								<div className="flex-1 min-w-0">
									<div className="flex items-start justify-between gap-2">
										<div>
											<Link to={`/products/${item.productId}`} className="font-semibold text-gray-800 text-sm md:text-base hover:text-[#E771A3] transition-colors line-clamp-2">
												{item.name}
											</Link>
											{item.color && (
												<div className="flex items-center gap-1.5 mt-1">
													<div className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: item.colorHex }} />
													<span className="text-xs text-gray-500">{item.color}</span>
												</div>
											)}
										</div>
										<button onClick={() => removeFromCart(item.cartId)} className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0 text-lg leading-none">
											✕
										</button>
									</div>

									<div className="flex items-center gap-2 mt-2">
										<span className="text-[#E771A3] font-bold text-sm md:text-base">Tk.{item.price}</span>
										{item.originalPrice && (
											<span className="text-gray-400 text-xs line-through">Tk.{item.originalPrice}</span>
										)}
									</div>

									<div className="flex items-center justify-between mt-3">
										<div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
											<button onClick={() => updateQuantity(item.cartId, item.quantity - 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors text-lg leading-none">−</button>
											<span className="px-3 py-1 text-sm font-medium border-x border-gray-200 min-w-[2rem] text-center">{item.quantity}</span>
											<button onClick={() => updateQuantity(item.cartId, item.quantity + 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors text-lg leading-none">+</button>
										</div>
										<span className="text-gray-700 font-semibold text-sm md:text-base">Tk.{item.price * item.quantity}</span>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Order Summary */}
					<div className="lg:w-80 flex-shrink-0">
						<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-4">
							<h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>

							<div className="space-y-3 mb-4">
								{cartItems.map((item) => (
									<div key={item.cartId} className="flex justify-between text-sm">
										<span className="text-gray-600 truncate mr-2">
											{item.name}
											{item.color && <span className="text-gray-400"> ({item.color})</span>}
											{" "}×{item.quantity}
										</span>
										<span className="text-gray-800 font-medium flex-shrink-0">Tk.{item.price * item.quantity}</span>
									</div>
								))}
							</div>

							<div className="border-t border-gray-100 pt-4 space-y-2">
								{cartItems.some((i) => i.originalPrice) && (
									<div className="flex justify-between text-sm">
										<span className="text-green-600">You Save</span>
										<span className="text-green-600 font-medium">
											Tk.{cartItems.reduce((sum, item) => {
												if (item.originalPrice) return sum + (item.originalPrice - item.price) * item.quantity;
												return sum;
											}, 0)}
										</span>
									</div>
								)}
								<div className="flex justify-between text-base font-bold">
									<span className="text-gray-800">Total</span>
									<span className="text-[#E771A3]">Tk.{cartTotal}</span>
								</div>
							</div>

							<button
								onClick={handleWhatsAppOrder}
								className="mt-5 w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center gap-2"
							>
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
									<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
								</svg>
								Order via WhatsApp
							</button>

							<Link to="/products" className="mt-3 w-full border border-gray-200 text-gray-600 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm text-center block">
								Continue Shopping
							</Link>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Cart;