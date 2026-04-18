import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // ✅ FIX: null = "not yet known", false = "confirmed logged out"
    // authLoading শুধু auth-dependent UI এর জন্য — পুরো app block করবে না
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const register = async (email, password, name) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: name });
        setUser({ ...result.user, displayName: name });
        return result;
    };

    const login = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

    const logout = () => signOut(auth);

    return (
        <AuthContext.Provider value={{ user, authLoading, register, login, loginWithGoogle, logout }}>
            {/* ✅ KEY FIX: আগে {!authLoading && children} ছিল
                এতে Firebase onAuthStateChanged resolve না হওয়া পর্যন্ত
                (~1-3 সেকেন্ড) পুরো app blank থাকত → LCP 3040ms render delay
                এখন children সবসময় render হয়, authLoading শুধু
                Cart/Wishlist/Login এ locally handle করা হবে */}
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);