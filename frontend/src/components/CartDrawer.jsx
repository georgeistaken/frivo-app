import React from "react";
function CartDrawer({
    cartOpen,
    setCartOpen,
    cart,
    setCart,
    products,
    total,

    navigateTo,

    capitalizeFirstLetter,

    trashIcon,

    productMessages,
    setProductMessages,
    productMessageTypes,
    setProductMessageTypes

}) {

    // -------------------- Start of helper functions ------------------

    // Increase the quantity which - button is clicked
    const decreaseQuantity = (itemId) => {
        setCart(prev =>
            prev.map(item =>
                item.id === itemId
                    ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                    : item
            )
        );
    };

    // Increase the quantity which + button is clicked
    const increaseQuantity = (item) => {
        // Find the matching product from the products array
        const productData = getProduct(item.id);

        // Stop if product isn't found
        if (!productData) return;

        // Prevent customer from adding more than the available stock
        if (item.quantity >= productData.stock) {
            setProductMessages(prev => ({
                ...prev,
                [item.id]: `Only ${productData.stock} available in stock`
            }));

            setProductMessageTypes(prev => ({
                ...prev,
                [item.id]: "error"
            }));

            setTimeout(() => {
                setProductMessages(prev => ({
                    ...prev,
                    [item.id]: ""
                }));
            }, 2500);

            return;
        }

        // Increase qty if the remaining stock amount allows it
        setCart(prev =>
            prev.map(p =>
                p.id === item.id
                    ? { ...p, quantity: (p.quantity || 1) + 1 }
                    : p
            )
        );
    };

    // Remove stock items from the cart
    const removeFromCart = (itemId) => {
        setCart(prev =>
            prev.filter(item => item.id !== itemId)
        );
    };

    // Lookup for products
    const getProduct = (id) =>
        products.find(product => product.id === id);

    // -------------------- End of helper functions ------------------

    return (
        <>
            {/* Overlay when cart drawer is open */}
            <div
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300
                    ${cartOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }
                `}
                onClick={() => setCartOpen(false)}
            />

            {/* The cart drawer (Global UI) */}
            {cartOpen && (
                <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 z-50 overflow-y-auto">

                    {/* The drawers close button */}
                    <button
                        className="mb-4"
                        onClick={() => setCartOpen(false)}>
                        ✖
                    </button>

                    {/* Cart Title */}
                    <h2 className="text-lg font-bold mb-4">Your Cart</h2>

                    {/* Inside the cart drawer */}
                    {cart.length === 0 ? (
                        <p>No items added yet</p>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="mb-4 flex items-center gap-3">

                                {/* Product Image */}
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-12 w-12 object-cover rounded-md"
                                />

                                {/* Imformation and controls */}
                                <div className="flex-1">

                                    {/* Name */}
                                    <p className="text-sm font-medium">
                                        {capitalizeFirstLetter(item.name)}
                                    </p>

                                    {/* Qty & price */}
                                    <div className="flex items-center justify-between mt-1">

                                        {/* Qty selectors */}
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => decreaseQuantity(item.id)}
                                                className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                                            >
                                                -
                                            </button>

                                            {/* The quantity display div */}
                                            <div className="w-10 p-1 text-center">
                                                {item.quantity}
                                            </div>

                                            {(!item.quantity || item.quantity < 1) && (
                                                <p className="text-xs text-red-500 mt-1">
                                                    Quantity must be at least 1
                                                </p>
                                            )}

                                            {/* The increase button (+) */}
                                            <button
                                                onClick={() => increaseQuantity(item)}
                                                // + button is visibly disabled if theres not enough stock 
                                                className={`px-2 py-1 rounded
                                                    ${item.quantity >= (getProduct(item.id)?.stock || 0)
                                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                        : "bg-gray-200"
                                                    }
                                                `}
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Price */}
                                        <span className="text-md font-semibold">
                                            €{((item.price ?? 0) * (item.quantity ?? 1)).toFixed(2)}
                                        </span>
                                    </div>

                                    {/* Remove an item from the cart */}
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <img
                                            src={trashIcon}
                                            alt="Remove"
                                            className="h-4 w-4 object-contain hover:scale-110 transition"
                                        />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}

                    <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
                        <p className="text-lg sm:text-xl font-bold text-gray-800">
                            Total: €{total.toFixed(2)}
                        </p>
                    </div>

                    {/* Checkout button */}
                    <button
                        onClick={() => {
                            setCartOpen(false);
                            navigateTo("checkout");
                        }}
                        disabled={cart.length === 0}
                        className={`mt-4 w-full py-2 rounded
                            ${cart.length === 0
                                ? "bg-gray-300 cursor-not-allowed text-white"
                                : "bg-orange-400 hover:bg-orange-500 text-white"
                            }
                        `}
                    >
                        Checkout
                    </button>
                </div>
            )}
        </>
    )
}

export default CartDrawer;