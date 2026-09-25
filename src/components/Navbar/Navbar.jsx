import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { Search, User, X, Menu, } from "lucide-react";
import { ShoppingCart } from "lucide-react";

import { useCart } from "../../context/CartContext";
import { categories, toSlug } from "../../data/categories";
import { useAuth } from "../../provider/AuthProvider";






const Navbar = () => {
    const { cartCount } = useCart();
    const { user } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [openCategory, setOpenCategory] = useState(null);

    const toggleCategory = (name) => {
        setOpenCategory(openCategory === name ? null : name);
    };



    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!isScrolled) setIsSearchOpen(false);
    }, [isScrolled]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim() === "") return;
        navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
        setSearchQuery("");
    };

    const closeSearch = () => {
        setIsSearchOpen(false);
        setSearchQuery("");
    };

    const getCategoryPath = (item) => `/shop/${toSlug(item)}`;

    const menuItemClass =
        "flex items-center gap-1 text-gray-700 text-sm px-3 py-2 rounded-md transition-colors duration-200 hover:bg-green-800 hover:text-white";
    const subMenuItemClass =
        "block px-4 py-2 text-sm text-gray-600 transition-colors duration-200 hover:bg-green-800 hover:text-white";



    return (
        <div className="sticky top-0 z-50">


            <div className="lg:hidden w-full bg-green-800 text-white text-center text-sm py-2">
                Free Home Delivery!
            </div>


            <div
                className={`hidden lg:grid overflow-hidden transition-[grid-template-rows] duration-500 ease-in-out ${isScrolled ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
                    }`}
            >
                <div className="overflow-hidden">
                    <div
                        className={`transition-opacity duration-300 ${isScrolled ? "opacity-0" : "opacity-100"
                            }`}
                    >
                        <div className="w-full bg-green-800 text-white text-center text-sm py-2">
                            Free Home Delivery!
                        </div>

                        <div className="w-full bg-[#faf9f7]">
                            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                                <span className="text-2xl font-bold tracking-wide">
                                    FreshBasket.
                                </span>
                                <div className="flex items-center gap-4">
                                    <form
                                        onSubmit={handleSearchSubmit}
                                        className="flex items-center bg-white border border-gray-200 rounded-md px-3 py-2 w-72"
                                    >
                                        <Search size={18} className="text-gray-400 mr-2" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="What Are You Looking For?"
                                            className="w-full outline-none bg-transparent text-sm"
                                        />
                                    </form>
                                    <Link to="/cart" className="relative">
                                        <ShoppingCart size={20} className="text-gray-700" />
                                        {cartCount > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-green-800 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                                {cartCount}
                                            </span>
                                        )}
                                    </Link>
                                    <Link to={user ? "/auth/account" : "/auth/login"}>
                                        <User size={22} className="text-gray-700 hover:text-green-800 transition-colors" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <hr className="w-full border-gray-200" />
                    </div>
                </div>
            </div>

            {/* DESKTOP MENU ROW */}
            <div className="hidden lg:block w-full bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                    <span
                        className={`text-xl font-bold tracking-wide mr-8 transition-opacity duration-300 ${isScrolled ? "opacity-100" : "opacity-0 w-0 mr-0 overflow-hidden"
                            }`}
                    >
                        FreshBasket.
                    </span>

                    {!(isScrolled && isSearchOpen) && (
                        <div className="flex items-center gap-2 flex-1">
                            {categories.map((cat) => (
                                <div key={cat.name} className="relative group">
                                    <button type="button" className={menuItemClass}>
                                        {cat.name}
                                        <span className="text-xs">▾</span>
                                    </button>
                                    <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg border border-gray-100 rounded-xl min-w-[180px] z-50">
                                        {cat.sub.map((item) => (
                                            <Link
                                                key={item}
                                                to={getCategoryPath(item)}
                                                className={subMenuItemClass}
                                            >
                                                {item}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {isScrolled && isSearchOpen && (
                        <form
                            onSubmit={handleSearchSubmit}
                            className="flex items-center flex-1 mx-6 bg-gray-50 border border-gray-200 rounded-md px-3 py-2"
                        >
                            <Search size={18} className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                autoFocus
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="What Are You Looking For?"
                                className="w-full outline-none bg-transparent text-sm"
                            />
                            <button type="button" onClick={closeSearch}>
                                <X size={18} className="text-gray-400 ml-2" />
                            </button>
                        </form>
                    )}

                    {isScrolled && (
                        <div className="flex items-center gap-4">
                            {!isSearchOpen && (
                                <button type="button" onClick={() => setIsSearchOpen(true)}>
                                    <Search size={20} className="text-gray-700" />
                                </button>
                            )}

                            <Link to="/cart" className="relative">
                                <ShoppingCart size={20} className="text-gray-700" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-green-800 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>


                            <Link to={user ? "/auth/account" : "/auth/login"}>
                                <User size={20} className="text-gray-700 hover:text-green-800 transition-colors" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* TABLET / MOBILE NAVBAR */}
            <div className="lg:hidden w-full bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
                    {!isSearchOpen && (
                        <>
                            <button type="button" onClick={() => setIsMobileMenuOpen(true)}>
                                <Menu size={24} className="text-gray-700" />
                            </button>
                            <span className="text-lg font-bold tracking-wide">FreshBasket.</span>
                            <div className="flex items-center gap-4">
                                <button type="button" onClick={() => setIsSearchOpen(true)}>
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

                                <Link to={user ? "/auth/account" : "/auth/login"}>
                                    <User size={20} className="text-gray-700 hover:text-green-800 transition-colors" />
                                </Link>
                            </div>
                        </>
                    )}

                    {isSearchOpen && (
                        <form
                            onSubmit={handleSearchSubmit}
                            className="flex items-center w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2"
                        >
                            <Search size={18} className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                autoFocus
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="What Are You Looking For?"
                                className="w-full outline-none bg-transparent text-sm"
                            />
                            <button type="button" onClick={closeSearch}>
                                <X size={18} className="text-gray-400 ml-2" />
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* TABLET / MOBILE menu drawer */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-50 bg-black/40"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <div
                        className="w-72 h-full bg-white p-4 overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-lg font-bold">FreshBasket.</span>
                            <button onClick={() => setIsMobileMenuOpen(false)}>
                                <X size={22} />
                            </button>
                        </div>

                        {categories.map((cat) => (
                            <div key={cat.name} className="border-b border-gray-100">
                                <button
                                    onClick={() => toggleCategory(cat.name)}
                                    className="w-full flex items-center justify-between px-3 py-3 text-left font-medium text-gray-800"
                                >
                                    {cat.name}
                                    <span
                                        className={`text-sm transition-transform duration-200 ${openCategory === cat.name ? "rotate-180" : ""
                                            }`}
                                    >
                                        ▾
                                    </span>
                                </button>

                                {openCategory === cat.name && (
                                    <div className="pb-2">
                                        {cat.sub.map((item) => (
                                            <a
                                                key={item}
                                                href={`/shop/${item.toLowerCase().replace(/\s+/g, "-")}`}
                                                className={`${subMenuItemClass} pl-6 rounded-md`}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {item}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;