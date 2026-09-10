import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

const STORAGE_KEY = "wishlist";

// লগইন ছাড়াই wishlist ব্যবহার করা যায় — সব ডেটা browser এর localStorage এ থাকে।
const loadWishlist = () => {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
};

export const WishlistProvider = ({ children }) => {
	const [wishlistItems, setWishlistItems] = useState(loadWishlist);

	// ✅ যেকোনো change এ localStorage এ save হয়ে যায়
	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistItems));
		} catch {
			// localStorage full/unavailable হলে চুপচাপ ignore করা হবে
		}
	}, [wishlistItems]);

	// ✅ অন্য ট্যাবে wishlist পরিবর্তন হলে এই ট্যাবেও sync হবে
	useEffect(() => {
		const onStorage = (e) => {
			if (e.key === STORAGE_KEY) {
				setWishlistItems(loadWishlist());
			}
		};
		window.addEventListener("storage", onStorage);
		return () => window.removeEventListener("storage", onStorage);
	}, []);

	const addToWishlist = (product) => {
		setWishlistItems((prev) => {
			if (prev.some((item) => item.productId === product.id)) return prev;
			const newItem = {
				id: String(product.id),
				productId: product.id,
				name: product.name,
				image: product.image,
				price:
					product.offerPrice && product.offerPrice < product.price
						? product.offerPrice
						: product.price,
				originalPrice:
					product.offerPrice && product.offerPrice < product.price
						? product.price
						: null,
				category: product.category,
				rating: product.rating,
			};
			return [...prev, newItem];
		});
	};

	const removeFromWishlist = (productId) => {
		setWishlistItems((prev) =>
			prev.filter((item) => item.productId !== productId),
		);
	};

	const isInWishlist = (productId) =>
		wishlistItems.some((item) => item.productId === productId);

	const toggleWishlist = (product) => {
		if (isInWishlist(product.id)) {
			removeFromWishlist(product.id);
		} else {
			addToWishlist(product);
		}
	};

	return (
		<WishlistContext.Provider
			value={{
				wishlistItems,
				addToWishlist,
				removeFromWishlist,
				isInWishlist,
				toggleWishlist,
				wishlistCount: wishlistItems.length,
			}}
		>
			{children}
		</WishlistContext.Provider>
	);
};

export const useWishlist = () => useContext(WishlistContext);
