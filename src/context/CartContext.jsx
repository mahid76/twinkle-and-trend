import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user, authLoading } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [cartLoaded, setCartLoaded] = useState(false);

    // ✅ Login হলে Firestore থেকে, না হলে localStorage থেকে
    useEffect(() => {
        if (authLoading) return;

        if (user) {
            // Firestore থেকে cart load
            const ref = doc(db, "users", user.uid, "cart", "items");
            const unsubscribe = onSnapshot(ref, (snap) => {
                if (snap.exists()) {
                    setCartItems(snap.data().items || []);
                } else {
                    // localStorage এ কিছু থাকলে Firestore এ migrate করুন
                    try {
                        const local = localStorage.getItem("tt_cart");
                        if (local) {
                            const parsed = JSON.parse(local);
                            setCartItems(parsed);
                            setDoc(ref, { items: parsed });
                            localStorage.removeItem("tt_cart");
                        } else {
                            setCartItems([]);
                        }
                    } catch {
                        setCartItems([]);
                    }
                }
                setCartLoaded(true);
            });
            return () => unsubscribe();
        } else {
            // Guest — localStorage
            try {
                const saved = localStorage.getItem("tt_cart");
                setCartItems(saved ? JSON.parse(saved) : []);
            } catch {
                setCartItems([]);
            }
            setCartLoaded(true);
        }
    }, [user, authLoading]);

    // ✅ Cart save
    useEffect(() => {
        if (!cartLoaded) return;
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
                          ? product.offerPrice : product.price);
            const originalPrice =
                variant?.offerPrice && variant.offerPrice < variant.price
                    ? variant.price
                    : product.offerPrice && product.offerPrice < product.price
                      ? product.price : null;
            return [...prev, {
                cartId, productId: product.id, name: product.name,
                image: variant?.images?.[0] ?? product.image,
                color: variant?.color ?? null, colorHex: variant?.colorHex ?? null,
                price, originalPrice, stock: variant?.stock ?? product.stock,
                quantity, category: product.category,
            }];
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
        <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, cartCount, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);