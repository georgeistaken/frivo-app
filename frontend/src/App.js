import { useEffect, useState } from "react";
import logo from "./assets/logo-icon-4.png";
import cartIcon from "./assets/cart.png";
import trashIcon from "./assets/bin.png";
import banner from "./assets/home-banner-2.png";

function App() {
  const [products, setProducts] = useState([]);  // Stores products fetched from backend API
  const [productMessages, setProductMessages] = useState({}); //stores temporary UI message
  const [productMessageTypes, setProductMessageTypes] = useState({});  // Stores message type per product (success or error)
  const [quantities, setQuantities] = useState({});  //Stores the quantity selected for each product - uses productID as the key
  const [selectedCategories, setSelectedCategories] = useState([]); // To filter products according to categories
  const [cart, setCart] = useState([]);  // Stores cart items
  const [cartOpen, setCartOpen] = useState(false); // Interactive cart
  const [page, setPage] = useState("products");  // Controlls which page is being displayed
  const [menuOpen, setMenuOpen] = useState(false);  // Menu for mobile view
  const [filterOpen, setFilterOpen] = useState(false);
  const [tempCategories, setTempCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // ==========================================================================

  // Function to send selected product to the cart (backend)
  const addToCart = (productID, productName, productPrice) => {

    // Get selected quantity (default = 1 -> only if user hasn't touched the input)
    const quantity = quantities[productID] || 1;

    // Sends POST request to backend API
    fetch("http://localhost:3000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      // Sending products ID in request body
      body: JSON.stringify({ productId: productID, quantity }),
    })

      // Conformation message response from backend "Product added to cart"
      .then(async (res) => {
        const data = await res.text();

        if (!res.ok) {
          throw new Error(data); // Triggers the catch
        }
        return data;
      })

      // Shows the response to the user 
      .then((data) => {
        setProductMessages((prev) => ({
          ...prev,
          [productID]: data
        }));

        setProductMessageTypes((prev) => ({
          ...prev,
          [productID]: "success"
        }));

        // Sets the message to clear after 3 seconds
        setTimeout(() => {
          setProductMessages((prev) => ({
            ...prev,
            [productID]: ""
          }));
        }, 3000);

        // Updating the cart state based on the previous items
        setCart((prev) => {
          // Checks if the product already exisits in the cart
          // Uses prev to ensure the lastest version/state of the cart is being used
          const existing = prev.find(item => item.id === productID);

          if (existing) {  // If it exists, the qty is updated
            return prev.map(item =>
              item.id === productID
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          }

          return [...prev, {  //Adds the product if it doesnt already exisit in the cart
            id: productID,
            name: productName,
            quantity,
            price: productPrice,
            image: products.find(p => p.id === productID)?.image
          }];
        });
      })

      // Error handling if request fails - catch errors
      .catch((err) => {
        setProductMessages((prev) => ({
          ...prev,
          [productID]: err.message
        }));

        // Show error message in UI
        //setProductMessages((prev) => ({
        //  ...prev,
        //  [productID]: "Error: Something went wrong"
        //}));

        setProductMessageTypes((prev) => ({
          ...prev,
          [productID]: "error"
        }));
      });

  };
  // ==========================================================================

  // Updates quantities for specific products
  const handleQuantityChange = (productId, value) => {
    //Prevents negative or zero values
    if (value < 1) return;

    setQuantities((prev) => ({
      ...prev,
      [productId]: value
    }));
  };

  // ==========================================================================

  // Capitalizes the first letter of a string
  const capitalizeFirstLetter = (text) => {
    if (!text) return "";

    // Words that should not be capitalized
    const exceptions = ["and", "or", "to", "of", "in", "on", "at", "for"];

    return text
      .toLowerCase()
      .split(" ")
      .map((word, index) => {
        // First word is always capitalized
        if (index === 0) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }

        // Keep exception words lowercase
        if (exceptions.includes(word)) {
          return word;
        }

        // Capitalize normal words
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  };

  // ==========================================================================

  // Extract unique categories from the products
  const categories = [...new Set(products.map(p => p.category))];

  // ==========================================================================

  // The filter toggle selection - when changes are submitted and applies
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // ==========================================================================

  // The filter toggle selection - temp state BEFORE changes are commited
  const toggleTempCategories = (category) => {
    setTempCategories((prev) =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // ==========================================================================

  // Filters products based on selected categories
  const filteredProducts = products.filter(product =>
    selectedCategories.length === 0 ||
    selectedCategories.includes(product.category)
  );

  // ==========================================================================

  // Calculate total cost of all items in the cart
  const total = cart.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);

  // ==========================================================================

  return (
    <div className="min-h-screen bg-gray-50 px-6 pt-6 pb-10">

      {/* --------------------------------------------------------------------*/}

      {/* Navigation bar*/}
      <div className="bg-white shadow-sm rounded-2xl px-4 sm:px-6 py-3 md:py-4 flex items-center">

        {/* Left Side */}
        <div className="w-1/3 flex justify-start items-center gap-1">

          {/* Mobile Hamburger Nav */}
          <button
            className="text-2xl md:hidden "
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

        </div>

        {/* Center */}
        <div className="w-1/3 flex justify-center">

          {/* Logo icon */}
          <img
            src={logo}
            alt="Frivo Logo"
            className="h-10 sm:h-12 md:h-16 max-w-[140px] sm:max-w-[180px] md:max-w-[200px] object-contain md:ml-2"
          />

        </div>

        {/* Right Side */}
        <div className="w-1/3 flex justify-end items-center gap-3">

          {/* Desktop navigation - hidden on smaller screens */}
          <div className="hidden lg:flex gap-4 items-center">
            <button onClick={() => setPage("home")}>Home</button>
            <button onClick={() => setPage("contact")}>Contact</button>
            <button onClick={() => setPage("products")}>Products</button>
          </div>

          {/* Desktop Hamburger Nav */}
          <button
            className="hidden md:block lg:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {/* Interactive cart icon - shows cart count */}
          <button
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-1"
          >
            <img src={cartIcon} alt="Cart" className="h-5 w-5" />
            <span className="w-6 text-center">
              {cart.reduce((sum, item) => sum + (item.quantity || 0), 0)}
            </span>
          </button>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-3 mb-6 bg-white p-4 rounded-xl shadow transition-all duration-300 transform">

          <button onClick={() => { setPage("home"); setMenuOpen(false); }}>
            Home
          </button>

          <button onClick={() => { setPage("contact"); setMenuOpen(false); }}>
            Contact
          </button>

          <button onClick={() => { setPage("products"); setMenuOpen(false); }}>
            Products
          </button>

        </div>
      )}

      {/* --------------------------------------------------------------------*/}

      {/* Filter Overlay */}
      <div
        className={`
          fixed inset-0 bg-black/40 transition-opacity duration-300
          ${filterOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setFilterOpen(false)}
      />

      {/* Filter Drawer */}
      <div
        className={`
          fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 p-4
          transform transition-transform duration-300
          ${filterOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close button on filter drawer */}
        <button onClick={() => setFilterOpen(false)}>✖</button>

        {/* Filter Title */}
        <h2 className="text-lg font-bold mt-4 mb-2">Categories:</h2>

        {/* Subtle line */}
        <div className="border-t border-gray-400 mb-6 opacity-55"></div>

        {/* Categories */}
        <div className="flex flex-col gap-2">
          {categories.map((categ) => (
            <label
              key={categ}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => toggleTempCategories(categ)}
            >

              {/* Hidden checkbox */}
              <input
                type="checkbox"
                checked={tempCategories.includes(categ)}
                onChange={() => toggleTempCategories(categ)}
                className="sr-only"
              />

              {/* Custom cirlce checkbox */}
              <div
                className={`
                  w-5 h-5 rounded-full border-2 
                  flex items-center justify-center
                  transition duration-200
                  ${tempCategories.includes(categ)
                    ? "bg-orange-400 border-orange-400"
                    : "border-gray-400"
                  }
                `}
              >
                {/* Affect when selected */}
                {tempCategories.includes(categ) && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>

              {/* Lable text */}
              <span>{categ}</span>

            </label>
          ))}
        </div>

        {/* Subtle line */}
        <div className="border-t border-gray-400 mt-7 opacity-55"></div>

        {/* Applying changes button */}
        <button
          className="mt-6 w-full bg-orange-400 text-white py-2 rounded"
          onClick={() => {
            setSelectedCategories(tempCategories);
            setFilterOpen(false);
          }}
        >
          Apply Selection
        </button>
      </div>

      {/* --------------------------------------------------------------------*/}

      {/* Products Page */}
      {page === "products" && (
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

          {/* Product grid */}
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
                className="
                bg-white rounded-2xl shadow-sm 
                p-3 sm:p-4 
                hover:shadow-md hover:-translate-y-1 
                transition duration-300 
                border border-gray-100 flex flex-col
                "
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

                {/* Quantity Selector */}
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

                    {/* The quantity display box */}
                    <input
                      type="number"

                      //prevents the mouse wheel from adjusting the quantity
                      onWheel={(e) => e.target.blur()}

                      min="1"

                      // Sets the default to 1 if not set
                      value={quantities[product.id] || 1}

                      // Updates the quantity when the user changes it
                      onChange={(e) => {
                        const value = e.target.value;
                        // Allow empty fields
                        if (value === "") {
                          setQuantities(prev => ({
                            ...prev,
                            [product.id]: ""
                          }));
                          return;
                        }

                        const num = parseInt(value);
                        if (!isNaN(num)) {
                          handleQuantityChange(product.id, num);
                        }
                      }}
                      onBlurCapture={() => {
                        if (!quantities[product.id] || quantities[product.id] < 1) {
                          handleQuantityChange(product.id, 1);
                        }
                      }}
                      className="w-10 p-1 border rounded-md text-center"
                    />

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

                {/* 'Add to cart' button */}
                <button
                  // Disables the button so that the user cannot click it when theres not enough stock
                  //disabled={(quantities[product.id] || 1) > product.stock}
                  // When clicked, product info and related data are sent to backend
                  onClick={() => {
                    const quantity = quantities[product.id] || 1;

                    // For message type = error - out of stock
                    if (quantity > product.stock) {

                      // Error message for 'out of stock' and 'not enough stock'
                      const errorMessage =
                        product.stock === 0
                          ? "This product is out of stock"
                          : "Not enough stock available";

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
                  <p
                    className={`text-xs mt-2 text-center
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
      )}

      {/* --------------------------------------------------------------------*/}

      {/* Contact Page */}
      {page === "contact" && (
        <p className="text-center text-gray-600">
          Contact us at support@frivo.com
        </p>
      )}

      {/* --------------------------------------------------------------------*/}

      {/* Home Page */}
      {page === "home" && (
        <>

          {/* Hero Banner */}
          <div className="mt-3 relative rounded-2xl overflow-hidden">
            <img
              src={banner}
              alt="Home page welcome banner"
              className="w-full aspect-[2.5/1] object-cover object-left rounded-2xl"
            />

            {/* Banner Button */}
            <button
              onClick={() => setPage("products")}
              className="
              absolute left-[6.5%] bottom-[8.8%] 
              bg-orange-500 hover:bg-orange-600 text-white shadow-lg transition
              rounded-md
              sm:rounded-lg
              md:rounded-xl
              lg:rounded-2xl
              hover:scale-105 active:scale-95
              px-[4.2vw] py-[1vw]
              text-[1.2vw] 
              "
            >
              Shop Now
            </button>

          </div>

          <p className="mt-7 text-center">
            More content coming soon..
          </p>

        </>
      )}

      {/* --------------------------------------------------------------------*/}

      {/* Overlay when cart drawer is open */}
      <div
        className={`
          fixed inset-0 bg-black/40 z-40 transition-opacity duration-300
          ${cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setCartOpen(false)}
      />

      {/* The cart drawer (Global UI) */}
      {cartOpen && (
        <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 z-50">

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

                    {/* Qty selector */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setCart(prev =>
                            prev.map(p =>
                              p.id === item.id
                                ? { ...p, quantity: Math.max(1, p.quantity - 1) }
                                : p
                            )
                          )
                        }
                        className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                      >
                        -
                      </button>

                      {/* The quantity display box */}
                      <input
                        type="number"

                        //prevents the mouse wheel from adjusting the quantity
                        onWheel={(e) => e.target.blur()}
                        min="1"

                        // Sets the default to 1 if not set
                        value={item.quantity}

                        // Updates the quantity when the user changes it
                        onChange={(e) => {
                          const value = e.target.value;
                          // Allow empty fields
                          if (value === "") {
                            setCart(prev =>
                              prev.map(p =>
                                p.id === item.id ? { ...p, quantity: "" } : p
                              )
                            );
                            return;
                          }

                          const num = parseInt(value);
                          if (!isNaN(num)) {
                            setCart(prev =>
                              prev.map(p =>
                                p.id === item.id ? { ...p, quantity: num } : p
                              )
                            );
                          }
                        }}
                        onBlur={() => {
                          setCart(prev =>
                            prev.map(p =>
                              p.id === item.id && (!p.quantity || p.quantity < 1)
                                ? { ...p, quantity: 1 }
                                : p
                            )
                          )
                        }}
                        className="w-10 text-center border rounded"
                      />

                      {(!item.quantity || item.quantity < 1) && (
                        <p className="text-xs text-red-500 mt-1">
                          Quantity must be at least 1
                        </p>
                      )}

                      {/* The increase button (+) */}
                      <button
                        onClick={() =>
                          setCart(prev =>
                            prev.map(p =>
                              p.id === item.id
                                ? { ...p, quantity: (p.quantity || 1) + 1 }
                                : p
                            )
                          )
                        }
                        className="px-2 py-1 bg-gray-200 rounded"
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
                    onClick={() =>
                      setCart(prev => prev.filter(p => p.id !== item.id))
                    }
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
          <button className="mt-4 w-full bg-orange-400 text-white py-2 rounded">
            Checkout
          </button>

        </div>
      )}

      {/* --------------------------------------------------------------------*/}

    </div>
  );
}

export default App;
