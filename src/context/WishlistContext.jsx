import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getDb } from "../config/firebase";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

// ✅ PERF FIX: "firebase/firestore" is imported dynamically, only once
// a signed-in user is present — guests never pay for that chunk.
export const WishlistProvider = ({ children }) => {
	const { user, authLoading } = useAuth();
	const [wishlistItems, setWishlistItems] = useState([]);
	const fsRef = useRef(null); // cached { collection, doc, deleteDoc, setDoc, db }

	// Loads (and caches) the firestore functions + db instance on demand.
	const getFs = async () => {
		if (!fsRef.current) {
			const [{ collection, doc, deleteDoc, setDoc, onSnapshot }, db] =
				await Promise.all([import("firebase/firestore"), getDb()]);
			fsRef.current = { collection, doc, deleteDoc, setDoc, onSnapshot, db };
		}
		return fsRef.current;
	};

	useEffect(() => {
		if (authLoading) return;

		if (!user) {
			setWishlistItems([]);
			return;
		}

		let cancelled = false;
		let unsubscribe = () => {};

		// ✅ user আছে — Firestore থেকে real-time sync
		(async () => {
			const { collection, onSnapshot, db } = await getFs();
			if (cancelled) return;
			const ref = collection(db, "users", user.uid, "wishlist");
			unsubscribe = onSnapshot(ref, (snapshot) => {
				setWishlistItems(
					snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
				);
			});
		})();

		return () => {
			cancelled = true;
			unsubscribe();
		};
	}, [user, authLoading]);

	const addToWishlist = async (product) => {
		if (!user) return;
		const { doc, setDoc, db } = await getFs();
		const ref = doc(db, "users", user.uid, "wishlist", String(product.id));
		await setDoc(ref, {
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
		});
	};

	const removeFromWishlist = async (productId) => {
		if (!user) return;
		const { doc, deleteDoc, db } = await getFs();
		await deleteDoc(doc(db, "users", user.uid, "wishlist", String(productId)));
	};

	const isInWishlist = (productId) =>
		wishlistItems.some((item) => item.productId === productId);

	const toggleWishlist = async (product) => {
		if (isInWishlist(product.id)) {
			await removeFromWishlist(product.id);
		} else {
			await addToWishlist(product);
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
