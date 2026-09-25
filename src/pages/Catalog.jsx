import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import products from '../data/products.json';
import ProductCard from '../components/product/ProductCard';

const ITEMS_PER_PAGE = 20;

const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "title-asc", label: "Alphabetically, A-Z" },
    { value: "title-desc", label: "Alphabetically, Z-A" },
    { value: "price-asc", label: "Price, low to high" },
    { value: "price-desc", label: "Price, high to low" },
    { value: "date-new", label: "Date, new to old" },
    { value: "date-old", label: "Date, old to new" },
];

const Catalog = () => {
    const [filterCategory, setFilterCategory] = useState("all");
    const [sortKey, setSortKey] = useState("featured");
    const [currentPage, setCurrentPage] = useState(1);

    const categories = useMemo(
        () => [...new Set(products.map((p) => p.category))],
        []
    );

    const filteredAndSorted = useMemo(() => {
        let result = filterCategory === "all"
            ? [...products]
            : products.filter((p) => p.category === filterCategory);

        switch (sortKey) {
            case "title-asc":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "title-desc":
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "price-asc":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                result.sort((a, b) => b.price - a.price);
                break;
            case "date-new":
                result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case "date-old":
                result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case "featured":
            default:
                result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
                break;
        }

        return result;
    }, [filterCategory, sortKey]);

    const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE));
    const paginatedProducts = filteredAndSorted.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleFilterChange = (e) => {
        setFilterCategory(e.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = (e) => {
        setSortKey(e.target.value);
        setCurrentPage(1);
    };

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

                <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-10">
                    Products
                </h1>

                {/* Filter / Sort toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 border-b border-gray-200 pb-4 mb-8">
                    <div className="flex items-center gap-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase">Filter by</label>
                        <select
                            value={filterCategory}
                            onChange={handleFilterChange}
                            className="text-sm border border-gray-300 rounded-md px-2 py-1.5 bg-white outline-none"
                        >
                            <option value="all">All products</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase">Sort by</label>
                        <select
                            value={sortKey}
                            onChange={handleSortChange}
                            className="text-sm border border-gray-300 rounded-md px-2 py-1.5 bg-white outline-none"
                        >
                            {sortOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>

                    <p className="sm:ml-auto text-sm italic text-gray-500">
                        {filteredAndSorted.length} products
                    </p>
                </div>

                {/* Product grid */}
                {paginatedProducts.length === 0 ? (
                    <p className="text-center text-gray-500 py-16">No products found.</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        {paginatedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-12">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="border border-gray-300 rounded-md p-2 disabled:opacity-40 hover:bg-gray-50 transition-colors"
                        >
                            <ChevronLeft size={16} />
                        </button>

                        <span className="text-sm text-gray-600">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="border border-gray-300 rounded-md p-2 disabled:opacity-40 hover:bg-gray-50 transition-colors"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Catalog;