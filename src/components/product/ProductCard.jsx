import React from 'react';
import { ShoppingBasket, Minus, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
    const { getQuantity, addToCart, increaseQuantity, decreaseQuantity } = useCart();
    const quantity = getQuantity(product.id);

    return (
        <div className="relative group">
            <div className="relative bg-white aspect-square flex items-center justify-center border border-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />

                {quantity === 0 ? (
                    <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="absolute top-3 left-3 bg-gray-100 hover:bg-green-800 hover:text-white text-gray-700 p-2 rounded-md shadow-sm transition-colors duration-200"
                    >
                        <ShoppingBasket size={16} />
                    </button>
                ) : (
                    <div className="absolute top-3 left-3 flex items-center bg-green-800 text-white rounded-md shadow-sm overflow-hidden text-sm">
                        <button
                            type="button"
                            onClick={() => decreaseQuantity(product.id)}
                            className="px-2 py-2 hover:bg-green-900 transition-colors"
                        >
                            <Minus size={14} />
                        </button>
                        <span className="px-2 font-medium min-w-[1.5rem] text-center">
                            {quantity}
                        </span>
                        <button
                            type="button"
                            onClick={() => increaseQuantity(product.id)}
                            className="px-2 py-2 hover:bg-green-900 transition-colors"
                        >
                            <Plus size={14} />
                        </button>
                    </div>
                )}
            </div>

            <p className="mt-3 font-bold text-gray-900">${product.price.toFixed(2)}</p>
            <p className="text-sm text-blue-900/80">{product.name}</p>
        </div>
    );
};

export default ProductCard;