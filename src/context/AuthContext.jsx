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
            {!authLoading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);