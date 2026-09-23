import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { Search, User, X, Menu } from "lucide-react";

const categories = [
    {
        name: "Vegetables",
        sub: ["Herbs", "Packed Vegetables", "Fresh Vegetables"],
    },
    {
        name: "Organic",
        sub: ["Spice", "Honey", "Oil"],
    },
    {
        name: "Snacks & Beverages",
        sub: [
            "Juice",
            "Coffee",
            "Tea",
            "Fizzy Drinks",
            "Crisp",
            "Chocolates",
        ],
    },
    {
        name: "Fish & Meat",
        sub: ["Meat-counter", "Fish"],
    },
    {
        name: "Dairy",
        sub: ["Yogurt", "Milk", "Cheese", "Eggs"],
    },
    {
        name: "Bakery & Pastry",
        sub: [
            "Buns & Rolls",
            "Pies & Cakes",
            "Muffins & Pastries",
            "Brown Bread",
            "White Bread",
        ],
    },
];

const Navbar = () => {
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
        if (!isScrolled) {
            setIsSearchOpen(false);
        }
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

    const getCategoryPath = (item) => {
        return `/shop/${item.toLowerCase().replace(/\s+/g, "-")}`;
    };

    const menuItemClass =
        "flex items-center gap-1 text-gray-700 text-sm px-3 py-2 rounded-md transition-colors duration-200 hover:bg-green-800 hover:text-white";

    const subMenuItemClass =
        "block px-4 py-2 text-sm text-gray-600 transition-colors duration-200 hover:bg-green-800 hover:text-white";

    return (
        <div className="sticky top-0 z-50">

            <div className="lg:hidden w-full bg-green-800 text-white text-center text-sm py-2">
                Free Home Delivery!
            </div>

       
            {!isScrolled && (
                <div className="hidden lg:block w-full bg-green-800 text-white text-center text-sm py-2">
                    Free Home Delivery!
                </div>
            )}

            {/* Project name + Search + User */}
            {!isScrolled && (
                <div className="hidden lg:block w-full bg-[#faf9f7]">
                    <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                        <span className="text-2xl font-bold tracking-wide">
                            FreshBasket.
                        </span>

                        <div className="flex items-center gap-4">

                            <form
                                onSubmit={handleSearchSubmit}
                                className="flex items-center bg-white border border-gray-200 rounded-md px-3 py-2 w-72"
                            >
                                <Search
                                    size={18}
                                    className="text-gray-400 mr-2"
                                />

                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    placeholder="What Are You Looking For?"
                                    className="w-full outline-none bg-transparent text-sm"
                                />
                            </form>

                            <User size={22} />

                        </div>
                    </div>
                </div>
            )}

            {!isScrolled && (
                <hr className="hidden lg:block w-full border-gray-200" />
            )}

            {/* DESKTOP MENU ROW */}
            <div className="hidden lg:block w-full bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                    {isScrolled && (
                        <span className="text-xl font-bold tracking-wide mr-8">
                            FreshBasket.
                        </span>
                    )}

                    {/* CATEGORY MENU */}
                    {!(isScrolled && isSearchOpen) && (
                        <div className="flex items-center gap-2 flex-1">

                            {categories.map((cat) => (
                                <div
                                    key={cat.name}
                                    className="relative group"
                                >

                                    <button
                                        type="button"
                                        className={menuItemClass}
                                    >
                                        {cat.name}
                                        <span className="text-xs">▾</span>
                                    </button>

                                    {/* DROPDOWN */}
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

                    {/* SCROLLED SEARCH */}
                    {isScrolled && isSearchOpen && (
                        <form
                            onSubmit={handleSearchSubmit}
                            className="flex items-center flex-1 mx-6 bg-gray-50 border border-gray-200 rounded-md px-3 py-2"
                        >
                            <Search
                                size={18}
                                className="text-gray-400 mr-2"
                            />

                            <input
                                type="text"
                                autoFocus
                                value={searchQuery}
                                onChange={(e) =>
                                    setSearchQuery(e.target.value)
                                }
                                placeholder="What Are You Looking For?"
                                className="w-full outline-none bg-transparent text-sm"
                            />

                            <button
                                type="button"
                                onClick={closeSearch}
                            >
                                <X
                                    size={18}
                                    className="text-gray-400 ml-2"
                                />
                            </button>
                        </form>
                    )}

                    {/* SCROLLED RIGHT SIDE */}
                    {isScrolled && (
                        <div className="flex items-center gap-4">

                            {!isSearchOpen && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsSearchOpen(true)
                                    }
                                >
                                    <Search
                                        size={20}
                                        className="text-gray-700"
                                    />
                                </button>
                            )}

                            <User
                                size={20}
                                className="text-gray-700"
                            />

                        </div>
                    )}

                </div>
            </div>

            {/* TABLET / MOBILE NAVBAR */}
            <div className="lg:hidden w-full bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

                    {!isSearchOpen && (
                        <>
                            <button
                                type="button"
                                onClick={() =>
                                    setIsMobileMenuOpen(true)
                                }
                            >
                                <Menu
                                    size={24}
                                    className="text-gray-700"
                                />
                            </button>

                            <span className="text-lg font-bold tracking-wide">
                                FreshBasket.
                            </span>

                            <div className="flex items-center gap-4">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsSearchOpen(true)
                                    }
                                >
                                    <Search
                                        size={20}
                                        className="text-gray-700"
                                    />
                                </button>

                                <User
                                    size={20}
                                    className="text-gray-700"
                                />

                            </div>
                        </>
                    )}

                    {/* MOBILE SEARCH */}
                    {isSearchOpen && (
                        <form
                            onSubmit={handleSearchSubmit}
                            className="flex items-center w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2"
                        >
                            <Search
                                size={18}
                                className="text-gray-400 mr-2"
                            />

                            <input
                                type="text"
                                autoFocus
                                value={searchQuery}
                                onChange={(e) =>
                                    setSearchQuery(e.target.value)
                                }
                                placeholder="What Are You Looking For?"
                                className="w-full outline-none bg-transparent text-sm"
                            />

                            <button
                                type="button"
                                onClick={closeSearch}
                            >
                                <X
                                    size={18}
                                    className="text-gray-400 ml-2"
                                />
                            </button>
                        </form>
                    )}

                </div>
            </div>

          {/* TABLET / MOBILE menu drawer */}
{isMobileMenuOpen && (
    <div className="lg:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setIsMobileMenuOpen(false)}>
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
                            className={`text-sm transition-transform duration-200 ${
                                openCategory === cat.name ? "rotate-180" : ""
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