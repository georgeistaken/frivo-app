import React from "react";
function ProductsPage({
    filteredProducts,
    setFilterOpen,

    toggleCategory,
    selectedCategories,
    tempCategories,
    setTempCategories,

    capitalizeFirstLetter,

    handleQuantityChange,
    quantities,

    cart,
    addToCart,

    productMessages,
    productMessageTypes,

    setProductMessages,
    setProductMessageTypes
}) {
    return (
        <>
            {/* Page Title */}
            <h1 className="text-3xl font-medium text-gray-800 mt-6 mb-4">
                Products
            </h1>

            {/* Filter Section */}
            <div className="mb-2">
                <button
                    onClick={() => {
                        setTempCategories(selectedCategories);
                        setFilterOpen(true);
                    }}
                    className="px-1 text-gray-500 rounded-full"
                >
                    Filters
                </button>
            </div>

            {/* Selected filter display */}
            <div className="flex flex-wrap gap-2 mb-4">
                {selectedCategories.map((categ) => (
                    <div
                        key={categ}
                        className="flex items-center gap-2 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs"
                    >
                        {categ}

                        {/* x to remove filter */}
                        <button
                            onClick={() => toggleCategory(categ)}
                            className="text-xs font-bold hover:text-orange-800"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            {/* --------------------------------------------------------------------*/}
            {/* Product grid */}
            {/* --------------------------------------------------------------------*/}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4"> {/* Set number of grids depending on window size*/}

                {/* If there is no matches for the filter selection then display a message */}
                {filteredProducts.length === 0 && (
                    <p className="col-span-full text-center text-gray-500">  {/* col-span-full ensures the message spans the entire grid*/}
                        No products found for the selected categories
                    </p>
                )}

                {/* Otherwise, display the products as normal */}
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-2xl shadow-sm p-3 sm:p-4 
                            hover:shadow-md hover:-translate-y-1 transition 
                            duration-300 border border-gray-100 flex flex-col"
                    >
                        {/* Subtle zoom when hovering */}
                        <div className="overflow-hidden rounded-xl mb-4">

                            {/* Product category */}
                            <p className="text-[9px] sm:text-[10px] text-orange-800 uppercase tracking-wide mt-1 mb-2 opacity-65">
                                {product.category}
                            </p>

                            {/* Image */}
                            <img
                                src={product.image}
                                alt={capitalizeFirstLetter(product.name)}
                                className="w-full aspect-[4/3] object-cover rounded-xl mb-1"
                            />
                        </div>

                        {/* Subtle line */}
                        <div className="border-t border-gray-400 mb-2 opacity-55"></div>

                        {/* Product name */}
                        <h2 className="text-sm sm:text-base font-medium text-gray-800 mt-1">
                            {capitalizeFirstLetter(product.name)}
                        </h2>

                        {/* Product size display */}
                        <p className="text-[10px] text-gray-500 uppercase tracking-wide opacity-65">
                            {product.size}
                        </p>

                        {/* Product price */}
                        <div className="flex justify-end mt-1">
                            <p className="text-lg sm:text-xl font-bold text-gray-800 mt-1">
                                €{product.price}
                            </p>
                        </div>

                        {product.stock === 0 && (
                            <p className="text-xs text-red-500 mt-1 text-center">
                                Out of stock
                            </p>
                        )}

                        {/* --------------------------------------------------------------------*/}
                        {/* Quantity Selector */}
                        {/* --------------------------------------------------------------------*/}
                        <div className="mt-3 flex items-center justify-between">
                            <label className="text-sm text-gray-600">Qty:</label>

                            <div className="flex items-center gap-2">

                                {/* The decrease button (-) */}
                                <button
                                    onClick={() =>
                                        handleQuantityChange(
                                            product.id,
                                            (quantities[product.id] || 1) - 1
                                        )
                                    }
                                    // Disables the button if the quantity is 1
                                    disabled={(quantities[product.id] || 1) <= 1}
                                    className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                                >
                                    -
                                </button>

                                {/* The quantity display div */}
                                <div className="w-10 p-1 text-center">
                                    {quantities[product.id] || 1}
                                </div>

                                {/* The increase button (+) */}
                                <button
                                    onClick={() =>
                                        handleQuantityChange(
                                            product.id,
                                            (quantities[product.id] || 1) + 1
                                        )
                                    }
                                    className="px-2 py-1 bg-gray-200 rounded"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* --------------------------------------------------------------------*/}
                        {/* 'Add to cart' button */}
                        {/* --------------------------------------------------------------------*/}
                        <button
                            // Disables the button so that the user cannot click it when theres not enough stock
                            disabled={(quantities[product.id] || 1) > product.stock}
                            // When clicked, product info and related data are sent to backend
                            onClick={() => {
                                const quantity = quantities[product.id] || 1;

                                // Finds the existing qty already in the cart
                                const cartItem = cart.find(
                                    item => item.id === product.id
                                );
                                // Gets the cart quantity from the cart item qty or sets to 0 if undefined
                                const existingQty = cartItem
                                    ? cartItem.quantity
                                    : 0;
                                // Adds the cart qty to the requested qty
                                const totalRequestedQty =
                                    existingQty + quantity;

                                // Calculates whats left after stock has been added to the cart
                                const remainingStock =
                                    product.stock - existingQty;

                                // For message type = error - out of stock
                                if (totalRequestedQty > product.stock) {

                                    // Error message for 'out of stock' and 'not enough stock'
                                    const errorMessage =
                                        product.stock === 0
                                            ? "This product is out of stock"
                                            : `There's ${remainingStock} available in stock`;

                                    // Sets the message
                                    setProductMessages((prev) => ({
                                        ...prev,
                                        [product.id]: errorMessage
                                    }));

                                    // Sets the message type
                                    setProductMessageTypes((prev) => ({
                                        ...prev,
                                        [product.id]: "error"
                                    }));

                                    // Removes the message after 2.5 seconds
                                    setTimeout(() => {
                                        setProductMessages((prev) => ({
                                            ...prev,
                                            [product.id]: ""
                                        }));
                                    }, 2500);

                                    return; // Stops the execution
                                }

                                // For if message type = success
                                addToCart(product.id, product.name, product.price);
                            }}
                            // Visually informs the customer that the button is disabled if the selected qty exceeds stock count
                            className={`mt-4 w-full py-2 rounded-xl transition duration-200
                                ${(quantities[product.id] || 1) > product.stock
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-orange-400 text-white hover:bg-orange-500"
                                }`}
                        >
                            Add to Cart
                        </button>

                        {/* Message that is product specific */}
                        {productMessages[product.id] && (
                            <p className={`text-xs mt-2 text-center
                                ${productMessageTypes[product.id] === "error"
                                    ? "text-red-500"
                                    : "text-green-600"
                                }`}
                            >
                                {productMessages[product.id]}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

export default ProductsPage;