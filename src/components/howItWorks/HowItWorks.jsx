import React from 'react';
import { Search, ShoppingBasket, CreditCard, Truck } from 'lucide-react';

const steps = [
    {
        icon: Search,
        title: "Browse Products",
        description: "Explore fresh groceries across vegetables, dairy, bakery and more.",
    },
    {
        icon: ShoppingBasket,
        title: "Add to Cart",
        description: "Pick your favorites and add them to your basket in one click.",
    },
    {
        icon: CreditCard,
        title: "Checkout Securely",
        description: "Choose your address and confirm your order with ease.",
    },
    {
        icon: Truck,
        title: "Fast Delivery",
        description: "Get your groceries delivered fresh, right to your doorstep.",
    },
];

const HowItWorks = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
            <div className="bg-white rounded-lg p-6 sm:p-10">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 sm:mb-10 text-left">
                    How It Works
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className="flex flex-col items-center text-center">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mb-4">
                                    <Icon size={26} className="text-green-800" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;