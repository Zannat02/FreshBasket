import React from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useAuth } from '../provider/AuthProvider';
import { useAddresses } from '../hooks/useAddresses';

const MyAccount = () => {
    const { user, logoutUser } = useAuth();
    const { addresses } = useAddresses();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser();
        toast.info("Logged out successfully");
        navigate("/auth/login");
    };

    const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0];

    return (
        <div className="bg-white min-h-[70vh] px-4 py-16">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-900">My Account</h1>
                <p className="text-sm text-gray-500 text-center mt-2">
                    Welcome, {user?.displayName || "there"}!
                </p>

                <div className="text-center mt-2">
                    <button
                        onClick={handleLogout}
                        className="text-sm text-gray-500 font-bold hover:text-green-800 transition-colors"
                    >
                        Log out
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-10 mt-12 ">

                    <div className="flex-1">
                        <h2 className="text-sm font-bold uppercase tracking-wide text-gray-800 mb-3">
                            Order History
                        </h2>
                        <p className="text-sm text-gray-500">
                            You haven't placed any orders yet.
                        </p>
                    </div>

                    <div className="flex-1">
                        <h2 className="text-sm font-bold uppercase tracking-wide text-gray-800 mb-3">
                            Account Details
                        </h2>
                        <p className="text-sm text-gray-600 mb-4">
                            {defaultAddress?.country || "No address added yet"}
                        </p>
                        <Link
                            to="/auth/addresses"
                            className="inline-block bg-green-800 hover:bg-green-900 text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors"
                        >
                            View Addresses ({addresses.length})
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;