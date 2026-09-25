import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';
import { countries } from '../../data/countries';

const emptyForm = {
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    country: "Bangladesh",
    zip: "",
    phone: "",
    isDefault: false,
};

const AddressModal = ({ isOpen, onClose, onSave, editingAddress }) => {
    const [formData, setFormData] = useState(emptyForm);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (editingAddress) {
            setFormData(editingAddress);
        } else {
            setFormData(emptyForm);
        }
    }, [editingAddress, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await onSave(formData);
            toast.success(editingAddress ? "Address updated" : "Address added");
            onClose();
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 py-8"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">
                        {editingAddress ? "Edit Address" : "Add New Address"}
                    </h2>
                    <button onClick={onClose}>
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-700 mb-1">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-green-800"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-green-800"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Company (optional)</label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-green-800"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Address</label>
                        <input
                            type="text"
                            name="address"
                            required
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-green-800"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Apartment, suite, etc. (optional)</label>
                        <input
                            type="text"
                            name="apartment"
                            value={formData.apartment}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-green-800"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-700 mb-1">City</label>
                            <input
                                type="text"
                                name="city"
                                required
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-green-800"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Country/Region</label>
                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-green-800 bg-white"
                            >
                                {countries.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Postal/Zip Code</label>
                        <input
                            type="text"
                            name="zip"
                            value={formData.zip}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-green-800"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-green-800"
                        />
                    </div>

                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            name="isDefault"
                            checked={formData.isDefault}
                            onChange={handleChange}
                        />
                        Set as default address
                    </label>

                    <div className="flex gap-3 mt-2">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="flex-1 bg-green-800 hover:bg-green-900 disabled:opacity-60 text-white font-semibold text-sm py-3 rounded-md transition-colors"
                        >
                            {isSaving ? "Saving..." : editingAddress ? "Update Address" : "Add Address"}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 border border-gray-300 text-gray-700 font-semibold text-sm py-3 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddressModal;