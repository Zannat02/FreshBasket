import React from 'react';
import {
    FaCcVisa,
    FaCcMastercard,
    FaCcAmex,
    FaCcPaypal,
    FaCcDinersClub,
    FaCcDiscover,
} from 'react-icons/fa';

const paymentIcons = [
    FaCcVisa,
    FaCcMastercard,
    FaCcAmex,
    FaCcPaypal,
    FaCcDinersClub,
    FaCcDiscover,
];

const AuthFooter = () => {
    return (
        <footer className="bg-gray-100 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between gap-8">
                <div>
                    <p className="font-bold text-sm text-gray-800 mb-3">Quick links</p>
                    <p className="text-sm text-gray-500">Search</p>
                </div>

                <div className="w-full sm:w-80">
                    <p className="font-bold text-sm text-gray-800 mb-3">Newsletter</p>
                    <form className="flex">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-green-800 hover:bg-green-900 text-white text-sm font-semibold px-4 rounded-r-md transition-colors"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <hr className="border-gray-200" />

            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                {/* USD dropdown + payment icons — mobile এ স্ট্যাক, desktop এ পাশাপাশি */}
                <div className="flex flex-col items-center sm:flex-row sm:items-center gap-3">
                    <select className="text-sm border border-gray-300 rounded-md px-2 py-1 bg-white outline-none">
                        <option>USD $</option>
                        <option>BDT ৳</option>
                    </select>

                    <div className="flex items-center gap-2">
                        {paymentIcons.map((Icon, index) => (
                            <Icon key={index} size={28} className="text-gray-600" />
                        ))}
                    </div>
                </div>

                <p className="text-xs text-gray-400 text-center sm:text-right">
                    © {new Date().getFullYear()} FreshBasket. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default AuthFooter;