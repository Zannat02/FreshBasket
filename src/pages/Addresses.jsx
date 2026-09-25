import React, { useState } from 'react';
import { Link } from 'react-router';
import { MapPin } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAddresses } from '../hooks/useAddresses';
import AddressModal from '../components/addressModal/AddressModal';

const Addresses = () => {
    const { addresses, loading, addAddress, updateAddress, deleteAddress } = useAddresses();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    const openAddModal = () => {
        setEditingAddress(null);
        setIsModalOpen(true);
    };

    const openEditModal = (address) => {
        setEditingAddress(address);
        setIsModalOpen(true);
    };

    const handleSave = async (formData) => {
        if (editingAddress) {
            await updateAddress(editingAddress.id, formData);
        } else {
            await addAddress(formData);
        }
    };

    const handleDelete = async (addressId) => {
        try {
            await deleteAddress(addressId);
            toast.info("Address deleted");
        } catch (err) {
            toast.error("Could not delete address");
        }
    };

    return (
        <div className="bg-white min-h-[70vh] px-4 py-16">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-900">Your Addresses</h1>

                <div className="text-center mt-3 mb-6">
                    <Link
                        to="/auth/account"
                        className="text-sm text-gray-500 hover:text-green-800 transition-colors"
                    >
                        Return to Account Details
                    </Link>
                </div>

                <div className="text-center mb-10">
                    <button
                        onClick={openAddModal}
                        className="bg-green-800 hover:bg-green-900 text-white text-sm font-semibold px-6 py-3 rounded-md transition-colors"
                    >
                        Add a New Address
                    </button>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500 text-sm">Loading addresses...</p>
                ) : addresses.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">
                        <MapPin size={40} className="mx-auto mb-3 text-gray-300" />
                        <p className="text-sm">No addresses added yet.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {addresses.map((addr) => (
                            <div
                                key={addr.id}
                                className="bg-[#f5f5f4] rounded-lg p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                            >
                                <div>
                                    {addr.isDefault && (
                                        <p className="text-xs font-bold uppercase tracking-wide text-green-800 mb-1">
                                            Default
                                        </p>
                                    )}
                                    <p className="font-medium text-gray-900">
                                        {addr.firstName} {addr.lastName}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {addr.address}
                                        {addr.apartment && `, ${addr.apartment}`}, {addr.city}, {addr.country}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">{addr.phone}</p>
                                </div>

                                <div className="flex gap-2 flex-shrink-0">
                                    <button
                                        onClick={() => openEditModal(addr)}
                                        className="bg-green-800 hover:bg-green-900 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(addr.id)}
                                        className="border border-gray-300 text-gray-700 text-sm font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <AddressModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                editingAddress={editingAddress}
            />
        </div>
    );
};

export default Addresses;