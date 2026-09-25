import React, { useState } from 'react';
import { Link } from 'react-router';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const AuthNavbar = () => {
    const { cartCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="w-full bg-white border-b border-gray-200 relative">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                <div className="flex items-center gap-3">
                    {/* Hamburger — শুধু mobile/tablet এ */}
                    <button
                        type="button"
                        className="sm:hidden"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <Menu size={22} className="text-gray-700" />
                    </button>

                    <Link to="/" className="text-xl font-bold tracking-wide">
                        FreshBasket.
                    </Link>
                </div>

                {/* Shop/Catalog — শুধু desktop এ সরাসরি দেখাবে */}
                <div className="hidden sm:flex items-center gap-6">
                    <Link to="/shop" className="text-sm text-gray-700 hover:text-green-800 transition-colors">
                        Shop
                    </Link>
                    <Link to="/catalog" className="text-sm text-gray-700 hover:text-green-800 transition-colors">
                        Catalog
                    </Link>
                </div>

                <div className="flex items-center gap-5">
                    <button type="button">
                        <Search size={20} className="text-gray-700" />
                    </button>

                    <Link to="/cart" className="relative">
                        <ShoppingCart size={20} className="text-gray-700" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-green-800 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <Link to="/auth/login">
                        <User size={20} className="text-gray-700" />
                    </Link>
                </div>
            </div>

            {/* Mobile/Tablet slide-in menu — শুধু Shop/Catalog এখানে থাকবে */}
            {isMenuOpen && (
                <div
                    className="sm:hidden fixed inset-0 z-50 bg-black/40"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <div
                        className="w-64 h-full bg-white p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-lg font-bold">FreshBasket.</span>
                            <button onClick={() => setIsMenuOpen(false)}>
                                <X size={22} />
                            </button>
                        </div>

                        <Link
                            to="/shop"
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-3 py-3 text-sm text-gray-700 rounded-md hover:bg-green-800 hover:text-white transition-colors"
                        >
                            Shop
                        </Link>
                        <Link
                            to="/catalog"
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-3 py-3 text-sm text-gray-700 rounded-md hover:bg-green-800 hover:text-white transition-colors"
                        >
                            Catalog
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuthNavbar;