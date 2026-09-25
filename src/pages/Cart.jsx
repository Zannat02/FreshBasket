import React from 'react';
import { Link } from 'react-router';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cartItems, cartTotal, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
                <ShoppingBag size={48} className="text-gray-300 mb-4" />
                <h2 className="text-xl font-bold text-gray-800">Your cart is empty</h2>
                <p className="text-sm text-gray-500 mt-2">
                    Looks like you haven't added anything to your cart yet.
                </p>
                <Link
                    to="/shop"
                    className="mt-6 inline-block bg-green-800 text-white text-sm font-semibold px-6 py-3 rounded-md hover:bg-green-900 transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-[#f5f5f4] min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Your Cart</h1>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* কার্ট আইটেম লিস্ট */}
                    <div className="flex-1 flex flex-col gap-4">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-lg p-4 flex items-center gap-4"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                                />

                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 truncate">{item.name}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        ${item.price.toFixed(2)} each
                                    </p>
                                </div>

                                <div className="flex items-center bg-gray-100 rounded-md overflow-hidden text-sm">
                                    <button
                                        type="button"
                                        onClick={() => decreaseQuantity(item.id)}
                                        className="px-2 py-2 hover:bg-gray-200 transition-colors"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="px-3 font-medium min-w-[1.5rem] text-center">
                                        {item.quantity}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => increaseQuantity(item.id)}
                                        className="px-2 py-2 hover:bg-gray-200 transition-colors"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>

                                <p className="font-bold text-gray-900 w-16 text-right flex-shrink-0">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>

                                <button
                                    type="button"
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-80 flex-shrink-0">
                        <div className="bg-white rounded-lg p-6 sticky top-24">
                            <h2 className="font-bold text-lg text-gray-900 mb-4">Order Summary</h2>

                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 mb-4">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>

                            <hr className="border-gray-200 mb-4" />

                            <div className="flex justify-between font-bold text-gray-900 text-base mb-6">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>

                            <button
                                type="button"
                                className="w-full bg-green-800 text-white text-sm font-semibold py-3 rounded-md hover:bg-green-900 transition-colors"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;