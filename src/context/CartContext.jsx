import { createContext, useContext, useEffect, useRef, useState } from "react";
import { db } from "../config/firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user, authLoading } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [cartLoaded, setCartLoaded] = useState(false);
    // ✅ Track whether the current cartItems came from Firestore/localStorage (not user action)
    const isSyncing = useRef(false);

    // ✅ Load cart — user change হলে আগে cartLoaded reset করো
    useEffect(() => {
        if (authLoading) return;

        // ✅ KEY FIX: নতুন user/guest session শুরু হলে cartLoaded false করো
        // এতে save effect আগে fire করবে না
        setCartLoaded(false);
        isSyncing.current = true;

        if (user) {
            const ref = doc(db, "users", user.uid, "cart", "items");
            const unsubscribe = onSnapshot(ref, (snap) => {
                if (snap.exists()) {
                    setCartItems(snap.data().items || []);
                } else {
                    // localStorage এ guest cart থাকলে migrate করো
                    try {
                        const local = localStorage.getItem("tt_cart");
                        if (local) {
                            const parsed = JSON.parse(local);
                            setCartItems(parsed);
                            // Firestore এ save করো (migrate)
                            setDoc(ref, { items: parsed });
                            localStorage.removeItem("tt_cart");
                        } else {
                            setCartItems([]);
                        }
                    } catch {
                        setCartItems([]);
                    }
                }
                isSyncing.current = false;
                setCartLoaded(true);
            });
            return () => unsubscribe();
        } else {
            // Guest — localStorage থেকে load
            try {
                const saved = localStorage.getItem("tt_cart");
                setCartItems(saved ? JSON.parse(saved) : []);
            } catch {
                setCartItems([]);
            }
            isSyncing.current = false;
            setCartLoaded(true);
        }
    }, [user, authLoading]);

    // ✅ Cart save — শুধু cartLoaded হওয়ার পরে এবং syncing না হলে save করো
    useEffect(() => {
        if (!cartLoaded) return;
        if (isSyncing.current) return;

        if (user) {
            const ref = doc(db, "users", user.uid, "cart", "items");
            setDoc(ref, { items: cartItems });
        } else {
            localStorage.setItem("tt_cart", JSON.stringify(cartItems));
        }
    }, [cartItems, user, cartLoaded]);

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

    const removeFromCart = (cartId) =>
        setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));

    const clearCart = () => setCartItems([]);

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, cartCount, cartTotal }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
