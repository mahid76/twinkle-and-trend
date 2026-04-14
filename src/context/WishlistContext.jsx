import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
    doc, setDoc, deleteDoc, collection, onSnapshot,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const { user, authLoading } = useAuth(); // ✅ FIX: authLoading নেওয়া হয়েছে
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        // ✅ FIX: auth load না হওয়া পর্যন্ত কিছু করব না
        // আগে authLoading check না থাকায় user=null ভেবে wishlist clear হয়ে যাচ্ছিল
        if (authLoading) return;

        if (!user) {
            setWishlistItems([]);
            return;
        }

        // ✅ user আছে — Firestore থেকে real-time sync করো
        const ref = collection(db, "users", user.uid, "wishlist");
        const unsubscribe = onSnapshot(ref, (snapshot) => {
            setWishlistItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }, [user, authLoading]); // ✅ FIX: authLoading dependency যোগ করা হয়েছে

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
