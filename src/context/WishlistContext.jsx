import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
    doc, setDoc, deleteDoc, collection, onSnapshot,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const { user } = useAuth();
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        if (!user) { setWishlistItems([]); return; }
        const ref = collection(db, "users", user.uid, "wishlist");
        const unsubscribe = onSnapshot(ref, (snapshot) => {
            setWishlistItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }, [user]);

    const addToWishlist = async (product) => {
        if (!user) return;
        const ref = doc(db, "users", user.uid, "wishlist", String(product.id));
        await setDoc(ref, {
            productId: product.id,
            name: product.name,
            image: product.image,
            price: product.offerPrice && product.offerPrice < product.price
                ? product.offerPrice : product.price,
            originalPrice: product.offerPrice && product.offerPrice < product.price
                ? product.price : null,
            category: product.category,
            rating: product.rating,
        });
    };

    const removeFromWishlist = async (productId) => {
        if (!user) return;
        await deleteDoc(doc(db, "users", user.uid, "wishlist", String(productId)));
    };

    const isInWishlist = (productId) =>
        wishlistItems.some((item) => item.productId === productId);

    const toggleWishlist = async (product) => {
        if (isInWishlist(product.id)) await removeFromWishlist(product.id);
        else await addToWishlist(product);
    };

    return (
        <WishlistContext.Provider value={{
            wishlistItems,
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            toggleWishlist,
            wishlistCount: wishlistItems.length,
        }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);