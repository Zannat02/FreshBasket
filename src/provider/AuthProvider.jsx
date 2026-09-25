import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase/firebase_init';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ইউজার রেজিস্টার করা
    const registerUser = async (name, email, password) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: name });
        // updateProfile এর পর state এ সাথে সাথে নাম নাও যুক্ত করে দিচ্ছি
        setUser({ ...result.user, displayName: name });
        return result;
    };

    // ইউজার লগইন করা
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // লগআউট করা
    const logoutUser = () => {
        return signOut(auth);
    };

    // Firebase এর নিজস্ব listener — user login state বদলালেই এটা রান হয়
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value = {
        user,
        loading,
        registerUser,
        loginUser,
        logoutUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;