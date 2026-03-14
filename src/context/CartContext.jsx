// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState(() => {
		try {
			const saved = localStorage.getItem("tt_cart");
			return saved ? JSON.parse(saved) : [];
		} catch {
			return [];
		}
	});

	useEffect(() => {
		localStorage.setItem("tt_cart", JSON.stringify(cartItems));
	}, [cartItems]);

	const addToCart = (product, variant = null, quantity = 1) => {
		const cartId = variant ? `${product.id}-${variant.color}` : `${product.id}`;

		setCartItems((prev) => {
			const existing = prev.find((item) => item.cartId === cartId);
			if (existing) {
				return prev.map((item) =>
					item.cartId === cartId
						? { ...item, quantity: Math.min(item.quantity + quantity, variant?.stock ?? product.stock) }
						: item,
				);
			}

			const price =
				variant?.offerPrice && variant.offerPrice < variant.price
					? variant.offerPrice
					: variant?.price ??
					  (product.offerPrice && product.offerPrice < product.price
							? product.offerPrice
							: product.price);

			const originalPrice =
				variant?.offerPrice && variant.offerPrice < variant.price
					? variant.price
					: product.offerPrice && product.offerPrice < product.price
					  ? product.price
					  : null;

			return [
				...prev,
				{
					cartId,
					productId: product.id,
					name: product.name,
					image: variant?.images?.[0] ?? product.image,
					color: variant?.color ?? null,
					colorHex: variant?.colorHex ?? null,
					price,
					originalPrice,
					stock: variant?.stock ?? product.stock,
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

	const removeFromCart = (cartId) => {
		setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
	};

	const clearCart = () => setCartItems([]);

	const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
	const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, cartCount, cartTotal }}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);