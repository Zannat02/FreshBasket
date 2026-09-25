import React from 'react';
import { useParams, useSearchParams, Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import products from '../data/products.json';
import ProductCard from '../components/product/ProductCard';
import { toSlug, getParentCategory } from '../data/categories';

import vegetablesBanner from '../assets/banners/vegetables.jpg';
import organicBanner from '../assets/banners/organic.jpg';
import snacksBanner from '../assets/banners/snacks.jpg';
import meatBanner from '../assets/banners/meat.jpg';
import dairyBanner from '../assets/banners/dairy.jpg';
import bakeryBanner from '../assets/banners/bakery.jpg';
import allProductsBanner from '../assets/banners/all-products.jpg';

const bannerMap = {
    "Vegetables": vegetablesBanner,
    "Organic": organicBanner,
    "Snacks & Beverages": snacksBanner,
    "Fish & Meat": meatBanner,
    "Dairy": dairyBanner,
    "Bakery & Pastry": bakeryBanner,
};

const Shop = () => {
    const { category } = useParams();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";

    let filteredProducts = products;
    let heading = "All Products";
    let bannerImage = allProductsBanner;

    if (category) {
        // Navbar থেকে সরাসরি কোনো সাবক্যাটাগরিতে ক্লিক করে আসা হয়েছে
        filteredProducts = products.filter((p) => toSlug(p.subcategory) === category);
        heading = filteredProducts[0]?.subcategory || category;
        const parent = getParentCategory(category);
        bannerImage = bannerMap[parent] || allProductsBanner;

    } else if (searchQuery) {
        const searchSlug = toSlug(searchQuery);

        // সার্চ যদি কোনো সাবক্যাটাগরির নামের সাথে মিলে যায় (যেমন "milk", "packed vegetables")
        const matchedSubcategory = [...new Set(products.map((p) => p.subcategory))]
            .find((sub) => toSlug(sub) === searchSlug);

        if (matchedSubcategory) {
            filteredProducts = products.filter((p) => p.subcategory === matchedSubcategory);
            heading = matchedSubcategory;
            const parent = getParentCategory(toSlug(matchedSubcategory));
            bannerImage = bannerMap[parent] || allProductsBanner;
        } else {
            // নাহলে প্রোডাক্টের নামের ভেতর সার্চ টেক্সট আছে কিনা খোঁজা (specific product search)
            filteredProducts = products.filter((p) =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            heading = `Search results for "${searchQuery}"`;
        }
    }

    return (
        <div className="bg-[#f5f5f4] min-h-screen">

            {/* ব্যানার */}
            <div className="relative w-full h-48 sm:h-56 lg:h-64 overflow-hidden">
                <img
                    src={bannerImage}
                    alt={heading}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold text-center px-4">
                        {heading}
                    </h1>
                </div>

                {/* Back to Home বাটন */}
                <Link
                    to="/"
                    className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 bg-white/90 hover:bg-white text-gray-800 text-sm font-medium px-3 sm:px-4 py-2 rounded-full shadow-md backdrop-blur-sm transition-colors duration-200"
                >
                    <ArrowLeft size={16} />
                    <span className="hidden sm:inline">Back to Home</span>
                </Link>
            </div>

            {/* প্রোডাক্ট গ্রিড */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
                <div className="bg-white rounded-lg p-4 sm:p-6">
                    {filteredProducts.length === 0 ? (
                        <p className="text-center text-gray-500 py-10">
                            No products found.
                        </p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;