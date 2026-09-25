export const categories = [
    { name: "Vegetables", sub: ["Herbs", "Packed Vegetables", "Fresh Vegetables"] },
    { name: "Organic", sub: ["Spice", "Honey", "Oil"] },
    { name: "Snacks & Beverages", sub: ["Juice", "Coffee", "Tea", "Fizzy Drinks", "Crisp", "Chocolates"] },
    { name: "Fish & Meat", sub: ["Meat-counter", "Fish"] },
    { name: "Dairy", sub: ["Yogurt", "Milk", "Cheese", "Eggs"] },
    { name: "Bakery & Pastry", sub: ["Buns & Rolls", "Pies & Cakes", "Muffins & Pastries", "Brown Bread", "White Bread"] },
];

export const toSlug = (text) => text.toLowerCase().replace(/\s+/g, "-");


export const getParentCategory = (subSlug) => {
    for (const cat of categories) {
        if (cat.sub.some((s) => toSlug(s) === subSlug)) {
            return cat.name;
        }
    }
    return null;
};