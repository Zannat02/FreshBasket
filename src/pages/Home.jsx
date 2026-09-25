import React from 'react';
import HeroSlider from '../components/hero/HeroSlider';
import ProductCard from '../components/product/ProductCard';
import products from '../data/products.json';
import HowItWorks from '../components/howItWorks/HowItWorks';

const getFeatured = () => products.filter((p) => p.featured);

const getLatest = (excludeFishMeat = false) => {
    const filtered = excludeFishMeat
        ? products.filter((p) => p.category !== "Fish & Meat")
        : products.filter((p) => p.category === "Fish & Meat");

    return [...filtered]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10);
};

const Home = () => {
    const featuredProducts = getFeatured();
    const latestProducts = getLatest(true);
    const latestFishMeat = getLatest(false);

    return (
        <div className="bg-[#f5f5f4]">
            <HeroSlider />

            {/*  Featured Products */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
                <div className="bg-white rounded-lg p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-left">
                        Featured Products
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>

        
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
                <div className="bg-white rounded-lg p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-left">
                        Latest Products
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                        {latestProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>

            <HowItWorks></HowItWorks>

          
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
                <div className="bg-white rounded-lg p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-left">
                        Latest Products
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                        {latestFishMeat.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;