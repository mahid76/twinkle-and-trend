import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		try {
			const saved = localStorage.getItem("tt_cart");
			setCartItems(saved ? JSON.parse(saved) : []);
		} catch {
			setCartItems([]);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("tt_cart", JSON.stringify(cartItems));
	}, [cartItems]);

	const addToCart = (product, variant = null, quantity = 1, size = null) => {
		const colorPart = variant?.color ? `-${variant.color}` : "";
		const sizePart = size?.label ? `-${size.label}` : "";
		const cartId = `${product.id}${colorPart}${sizePart}`;

		setCartItems((prev) => {
			const existing = prev.find((item) => item.cartId === cartId);
			const maxStock = size?.stock ?? variant?.stock ?? product.stock;

			if (existing) {
				return prev.map((item) =>
					item.cartId === cartId
						? {
								...item,
								quantity: Math.min(item.quantity + quantity, maxStock),
							}
						: item,
				);
			}

			const basePrice =
				variant?.offerPrice && variant.offerPrice < variant.price
					? variant.offerPrice
					: (variant?.price ??
						(product.offerPrice && product.offerPrice < product.price
							? product.offerPrice
							: product.price));

			const baseOriginalPrice =
				variant?.offerPrice && variant.offerPrice < variant.price
					? variant.price
					: product.offerPrice && product.offerPrice < product.price
						? product.price
						: null;

			const extraPrice = size?.extraPrice || 0;
			const price = basePrice + extraPrice;
			const originalPrice = baseOriginalPrice
				? baseOriginalPrice + extraPrice
				: null;
			const displayName = variant?.name || product.name;

			return [
				...prev,
				{
					cartId,
					productId: product.id,
					name: displayName,
					image: variant?.images?.[0] ?? product.image,
					color: variant?.color ?? null,
					colorHex: variant?.colorHex ?? null,
					size: size?.label ?? null,
					price,
					originalPrice,
					stock: maxStock,
					quantity,
					category: product.category,
				},
			];
		});
	};

	const updateQuantity = (cartId, newQuantity) => {
		if (newQuantity < 1) return removeFromCart(cartId);
		setCartItems((prev) =>
			prev.map((item) =>
				item.cartId === cartId
					? { ...item, quantity: Math.min(newQuantity, item.stock) }
					: item,
			),
		);
	};

	const removeFromCart = (cartId) =>
		setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));

	const clearCart = () => setCartItems([]);

	const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
	const cartTotal = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addToCart,
				updateQuantity,
				removeFromCart,
				clearCart,
				cartCount,
				cartTotal,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);
