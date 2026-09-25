import React, {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CART_STORAGE_KEY = "freshbasket_cart";

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const stored = localStorage.getItem(CART_STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error("Failed to load cart:", error);
            return [];
        }
    });

    // Cart localStorage এ save করবে
    useEffect(() => {
        localStorage.setItem(
            CART_STORAGE_KEY,
            JSON.stringify(cartItems)
        );
    }, [cartItems]);

    // একটি product-এর quantity বের করা
    const getQuantity = (productId) => {
        const item = cartItems.find(
            (item) => item.id === productId
        );

        return item ? item.quantity : 0;
    };

    // Product cart-এ add করা
    const addToCart = (product) => {
        const existingItem = cartItems.find(
            (item) => item.id === product.id
        );

        if (existingItem) {
            setCartItems((prev) =>
                prev.map((item) =>
                    item.id === product.id
                        ? {
                              ...item,
                              quantity: item.quantity + 1,
                          }
                        : item
                )
            );

            toast.success(
                `${product.name} quantity increased`
            );

            return;
        }

        setCartItems((prev) => [
            ...prev,
            {
                ...product,
                quantity: 1,
            },
        ]);

        toast.success(`${product.name} added to cart`);
    };

    // Quantity increase
    const increaseQuantity = (productId) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === productId
                    ? {
                          ...item,
                          quantity: item.quantity + 1,
                      }
                    : item
            )
        );
    };

    // Quantity decrease
    const decreaseQuantity = (productId) => {
        const item = cartItems.find(
            (item) => item.id === productId
        );

        if (!item) return;

        if (item.quantity === 1) {
            setCartItems((prev) =>
                prev.filter((item) => item.id !== productId)
            );

            toast.info(
                `${item.name} removed from cart`
            );

            return;
        }

        setCartItems((prev) =>
            prev.map((item) =>
                item.id === productId
                    ? {
                          ...item,
                          quantity: item.quantity - 1,
                      }
                    : item
            )
        );
    };

    // Product completely remove
    const removeFromCart = (productId) => {
        const item = cartItems.find(
            (item) => item.id === productId
        );

        setCartItems((prev) =>
            prev.filter((item) => item.id !== productId)
        );

        if (item) {
            toast.info(`${item.name} removed from cart`);
        }
    };

    // Total product quantity
    const cartCount = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    // Total price
    const cartTotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const value = {
        cartItems,
        getQuantity,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        cartCount,
        cartTotal,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};