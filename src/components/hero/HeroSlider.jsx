import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight } from 'lucide-react';

import vegetablesImg from "../../assets/hero/vegetables.jpg";
import bakeryImg from "../../assets/hero/bakery.jpg";
import dairyImg from "../../assets/hero/dairy.jpg";
import groceryImg from "../../assets/hero/grocery.jpg";

const slides = [
    {
        image: vegetablesImg,
        heading: "Fresh Picks, Delivered Daily",
        subtext: "Hand-selected produce from local farms to your doorstep.",
    },
    {
        image: bakeryImg,
        heading: "Baked Fresh Every Morning",
        subtext: "Warm bread and pastries, straight from the oven to you.",
    },
    {
        image: dairyImg,
        heading: "Farm To Your Fridge",
        subtext: "Real dairy, real eggs, nothing sitting on a shelf for weeks.",
    },
    {
        image: groceryImg,
        heading: "Everything Your Kitchen Needs",
        subtext: "One basket, every aisle — vegetables to meat, all in one place.",
        showButton: true,
    },
];

const SLIDE_DURATION = 5000;

const HeroSlider = () => {
    const [current, setCurrent] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, SLIDE_DURATION);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[600px] overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                >
                    <img
                        src={slide.image}
                        alt={slide.heading}
                        className="w-full h-full object-cover"
                    />

                    {/* মূল gradient — পুরো ছবির উপর, নিচ থেকে ঘন */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                    {/* এক্সট্রা layer — একদম নিচের অর্ধেকে আরও ঘন, টেক্সট যেখানে বসবে */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

                    <div className="absolute inset-0 flex items-end sm:items-center">
                        <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-10 pb-10 sm:pb-14 lg:pb-0">
                            {index === current && (
                                <div key={current} className="max-w-xl">
                                    <h1 className="animate-slide-up text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-md">
                                        {slide.heading}
                                    </h1>
                                    <p
                                        className="animate-slide-up text-sm sm:text-base text-white/90 mt-3 sm:mt-4 drop-shadow-sm"
                                        style={{ animationDelay: "0.15s", animationFillMode: "backwards" }}
                                    >
                                        {slide.subtext}
                                    </p>

                                    {slide.showButton && (
                                        <button
                                            onClick={() => navigate("/shop")}
                                            className="animate-slide-up shine-effect relative overflow-hidden mt-5 sm:mt-7 inline-flex items-center gap-2 bg-white text-black text-sm font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-md border border-green-700"
                                            style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}
                                        >
                                            Order Now
                                            <ArrowRight size={16} />
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            index === current ? "w-6 bg-white" : "w-1.5 bg-white/50"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;