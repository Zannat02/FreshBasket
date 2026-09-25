import { useState, useEffect } from 'react';
import {
    collection,
    onSnapshot,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    writeBatch,
} from 'firebase/firestore';
import { db } from '../firebase/firebase_init';
import { useAuth } from '../provider/AuthProvider';

export const useAddresses = () => {
    const { user } = useAuth();
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setAddresses([]);
            setLoading(false);
            return;
        }

        const addressesRef = collection(db, "users", user.uid, "addresses");

    
        const unsubscribe = onSnapshot(addressesRef, (snapshot) => {
            const list = snapshot.docs.map((docSnap) => ({
                id: docSnap.id,
                ...docSnap.data(),
            }));
            setAddresses(list);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const addAddress = async (addressData) => {
        const addressesRef = collection(db, "users", user.uid, "addresses");

    
        if (addressData.isDefault) {
            await clearOtherDefaults();
        }

        await addDoc(addressesRef, addressData);
    };

    const updateAddress = async (addressId, addressData) => {
        if (addressData.isDefault) {
            await clearOtherDefaults(addressId);
        }

        const addressDoc = doc(db, "users", user.uid, "addresses", addressId);
        await updateDoc(addressDoc, addressData);
    };

    const deleteAddress = async (addressId) => {
        const addressDoc = doc(db, "users", user.uid, "addresses", addressId);
        await deleteDoc(addressDoc);
    };

   
    const clearOtherDefaults = async (exceptId = null) => {
        const batch = writeBatch(db);
        addresses.forEach((addr) => {
            if (addr.id !== exceptId && addr.isDefault) {
                const ref = doc(db, "users", user.uid, "addresses", addr.id);
                batch.update(ref, { isDefault: false });
            }
        });
        await batch.commit();
    };

    return { addresses, loading, addAddress, updateAddress, deleteAddress };
};