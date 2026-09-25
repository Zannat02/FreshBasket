import React from 'react';

const paymentMethods = ["VISA", "Mastercard", "Amex", "PayPal", "Diners", "Discover"];

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

            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <select className="text-sm border border-gray-300 rounded-md px-2 py-1 bg-white outline-none">
                    <option>USD $</option>
                    <option>BDT ৳</option>
                </select>

                <p className="text-xs text-gray-400">
                    © {new Date().getFullYear()} FreshBasket. All rights reserved.
                </p>

                <div className="flex gap-2">
                    {paymentMethods.map((method) => (
                        <span
                            key={method}
                            className="text-[10px] font-semibold border border-gray-300 rounded px-2 py-1 text-gray-500 bg-white"
                        >
                            {method}
                        </span>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default AuthFooter;