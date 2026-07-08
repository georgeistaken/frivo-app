import { useEffect, useState, useRef } from "react";
// Navbar image imports
import logo from "./assets/logo-icon-4.png";
import cartIcon from "./assets/cart.png";
import trashIcon from "./assets/bin.png";
// Footer image imports
import instaIcon from "./assets/instaIcon.png";
import facebookIcon from "./assets/facebookIcon.png";
import whatsappIcon from "./assets/whatsappIcon.png";
// Payment image imports
import visaLogo from "./assets/visa_logo.png";
import mastercardLogo from "./assets/mastercard_logo.png";
import applePayLogo from "./assets/applepay_logo.png";
import paypalLogo from "./assets/paypal_logo.png";
import confirmIcon from "./assets/thumbs_up.jpg";

// Page imports
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CheckoutPage from "./pages/CheckoutPage";
import ContactPage from "./pages/ContactPage";
import ConfirmationPage from "./pages/ConfirmationPage";
//Component imports
import CartDrawer from "./components/CartDrawer";
import FilterDrawer from "./components/FilterDrawer";
import Navbar from "./components/Navbar";
import Notifications from "./components/Notifications";
import Footer from "./components/Footer.jsx";

function App() {
  // Product card variables
  const [products, setProducts] = useState([]);  // Stores products fetched from backend API
  const [productMessages, setProductMessages] = useState({}); //stores temporary UI message
  const [productMessageTypes, setProductMessageTypes] = useState({});  // Stores message type per product (success or error)
  const [quantities, setQuantities] = useState({});  //Stores the quantity selected for each product - uses productID as the key
  const [selectedCategories, setSelectedCategories] = useState([]); // To filter products according to categories
  // Cart related variables
  const [cart, setCart] = useState([]);  // Stores cart items
  const [cartOpen, setCartOpen] = useState(false); // Interactive cart
  // Filter related variables
  const [filterOpen, setFilterOpen] = useState(false);
  const [tempCategories, setTempCategories] = useState([]);

  // General Variables
  const [page, setPage] = useState("home");  // Controls which page is the default
  const [menuOpen, setMenuOpen] = useState(false);  // Menu for mobile view

  // Customer information
  const customerDetailsRef = useRef(null);  // scroll ref for incomplete customer details
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // Delivery or collection options + address variables
  const deliveryMethodRef = useRef(null);  // scroll ref for incomplete delivery method selection
  const addressDetailsRef = useRef(null);  // scroll ref for incomplex address
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [addressType, setAddressType] = useState("");
  const [complexName, setComplexName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [suburb, setSuburb] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  // Date and time slot variables
  const dateTimeRef = useRef(null);  // scroll ref for incomplete sections
  const [selectedDate, setSelectedDate] = useState(""); // Stores the date selected by the user
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  // Order summary variables
  //const [orderNumber] = useState( // Stores a randomly generated order number
  //  "#" + Math.floor(100000 + Math.random() * 900000)
  //);
  // Sticky checkout bar variables
  const checkoutFooterRef = useRef(null);  // References the final checkout section
  const [showStickyCheckout, setShowStickyCheckout] = useState(true);  // Controls when the sticky checkout bar should be visible
  // Payment variables
  const paymentRef = useRef(null);  // scroll ref for incomplete sections
  const [paymentMethod, setPaymentMethod] = useState("");  // Stores payment method
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [checkoutErrors, setCheckoutErrors] = useState({});

  // Confirmation Variables
  const [completedOrder, setCompletedOrder] = useState(null);
  const [orderNumber, setOrderNumber] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  // Notification System variables - success/error/warning/info
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");
  const [showNotification, setShowNotification] = useState(false); // Controls visibility

  // Contact form variables
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");

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
          // Checks if the product already exists in the cart
          // Uses prev to ensure the latest version/state of the cart is being used
          const existing = prev.find(item => item.id === productID);

          if (existing) {  // If it exists, the qty is updated
            return prev.map(item =>
              item.id === productID
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          }

          return [...prev, {  //Adds the product if it doesnt already exist in the cart
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

  // Formatting phone numbers for display purposes
  // Eg. +491769824338 -> +49 176 6824338
  // For German numbers only at the moment
  const formatPhoneNumber = (phone) => {
    if (!phone) return "";

    // Removes spaces, brackets and hyphens. Keeps plus but removes minus symbol
    const cleanedNumber = phone.replace(/[\s()-]/g, "");

    // International format
    if (cleanedNumber.startsWith("+49")) {
      return cleanedNumber.replace(
        /^(\+49)(\d{3})(\d{7})$/,
        "$1 $2 $3"
      );
    }

    // Local format
    if (cleanedNumber.length === 10) {
      return cleanedNumber.replace(
        /(\d{3})(\d{3})(\d{4})/,
        "$1 $2 $3"
      );
    }

    return phone
  }

  // ==========================================================================

  // Notification System - Styled
  const showMessage = (
    message,
    type = "success",
    duration = 3000
  ) => {
    // Update the notification text
    setNotificationMessage(message);

    // Update notification colour
    setNotificationType(type);

    // Make the message visible
    setShowNotification(true);

    // Automatically hide - timeout
    setTimeout(() => {
      setShowNotification(false)
    }, duration);

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

  // Calculate total cost of all items in the cart drawer
  const total = cart.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);

  // ==========================================================================

  // Calculate the total value of all products before fees and taxes (checkout)
  const itemSubtotal = cart.reduce((sum, item) => {
    return sum + ((item.price ?? 0) * (item.quantity ?? 0));
  }, 0);

  // VAT (15%)
  const vatAmount = itemSubtotal * 0.15;

  // Service fee charged per order
  const serviceFee = 1.99;

  // Delivery fee - only applies when delivery is selected and a full address exists
  // Can later be replaced with code that calculated distance and its matching delivery fee
  const deliveryFee =
    deliveryMethod === "delivery" &&
      streetAddress.trim() !== "" &&
      suburb.trim() !== "" &&
      postalCode.trim() !== ""
      ? 4.99
      : 0;

  // Grand total with all fees included
  const checkoutTotal = Number((itemSubtotal + vatAmount + serviceFee + deliveryFee).toFixed(2));

  // ==========================================================================

  // Creates the 7 available dates - starting at the date of checkout
  const availableDates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date();

    // increments the days from day 1 to day 7
    date.setDate(date.getDate() + i);

    availableDates.push({
      value: date.toISOString().split("T")[0],
      label: date.toLocaleDateString("en-GB", { // Changes the date to a string
        weekday: "short",
        day: "numeric",
        month: "short"
      })
    });
  }
  // ==========================================================================

  // Sets the time slots for delivery for each available date
  let availableTimeSlots = [];

  // Creates time slots IF a date has been selected
  if (selectedDate) {

    const now = new Date();
    const todayString = now.toISOString().split("T")[0];
    const isToday = selectedDate === todayString; // Checks if the date is set to today

    // Runs if delivery method is set to collection. 
    if (deliveryMethod === "collection") {

      // Loops to create time slots with 30min intervals
      for (let hour = 8; hour < 20; hour++) {
        // Start for the time slot
        const slotStart = new Date();
        slotStart.setHours(hour, 0, 0, 0);
        // End of the time slot
        const slotEnd = new Date(slotStart);
        slotEnd.setMinutes(slotEnd.getMinutes() + 30);

        // Runs for same-day selection - adds extra time for staff to complete
        if (isToday) {
          // Creates a copy of the current date and time
          const earliestCollectionTime = new Date(now);
          // Sets the earliest time for collection 30 min from the current date. 
          earliestCollectionTime.setMinutes(
            earliestCollectionTime.getMinutes() + 30
          );

          // Skips all time slots that are earlier than the set earliestCollectionTime
          if (slotStart < earliestCollectionTime) {
            continue;
          }
        }

        // Converts the time into a user-friendly format and pushes them to the available time slot list
        availableTimeSlots.push(
          `${slotStart.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
          })} - ${slotEnd.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
          })}`
        );

        // Sets the next time slots within the same hour (in 30 min intervals)
        const secondStart = new Date(slotEnd);
        const secondEnd = new Date(secondStart);
        secondEnd.setMinutes(secondEnd.getMinutes() + 30);

        // Another same-day selection rule - for the second time slot option 
        if (isToday) {
          const earliestCollectionTime = new Date(now);

          earliestCollectionTime.setMinutes(
            earliestCollectionTime.getMinutes() + 30
          );

          // Skips the time slot if its earlier than the earliestCollectionTime
          if (secondStart < earliestCollectionTime) {
            continue;
          }
        }

        // Add the second collection time slot option to the list in a user-friendly format
        availableTimeSlots.push(
          `${secondStart.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
          })} - ${secondEnd.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
          })}`
        );
      }
    }
    // Runs if delivery method is set to delivery. 
    else {
      // Loops to create time slots with 60min intervals
      for (let hour = 9; hour < 20; hour++) {
        // Start for the time slot
        const slotStart = new Date();
        slotStart.setHours(hour, 0, 0, 0);
        // End of the time slot
        const slotEnd = new Date(slotStart);
        slotEnd.setHours(slotEnd.getHours() + 1);

        // Runs for same-day selection
        if (isToday) {
          const earliestDeliveryTime = new Date(now);
          // Sets the earliest time for delivery, 60 min from the time at the moment of selecting the date. 
          earliestDeliveryTime.setMinutes(
            earliestDeliveryTime.getMinutes() + 60
          );

          // Skips the time slot if its earlier than the earliestDeliveryTime
          if (slotStart < earliestDeliveryTime) {
            continue;
          }
        }

        // Adds the time slot to the list of available time slots
        availableTimeSlots.push(
          `${slotStart.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
          })} - ${slotEnd.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
          })}`
        );
      }
    }
  }

  // ==========================================================================

  // Detects when the final checkout section becomes visible
  useEffect(() => {
    const handleScroll = () => {
      if (!checkoutFooterRef.current) return;
      const rect = checkoutFooterRef.current.getBoundingClientRect();
      // When the footer becomes visible, the sticky bar hides
      setShowStickyCheckout(rect.top > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  // ==========================================================================

  // Validates all required checkout fields before payment
  const validateCheckout = () => {
    const errors = {};

    // ------------------------------------------------------------
    // Delivery / Collection Selection
    // ------------------------------------------------------------

    if (!deliveryMethod) {
      errors.deliveryMethod = true;
    }

    // ------------------------------------------------------------
    // Customer Information
    // ------------------------------------------------------------

    if (!firstName.trim()) {
      errors.firstName = true;
    }

    if (!surname.trim()) {
      errors.surname = true;
    }

    const phoneRegex = /^\+?[0-9()\-\s]{8,20}$/;

    if (!phoneNumber.trim()) {
      errors.phoneNumber = true;
    }
    else if (!phoneRegex.test(phoneNumber)) {
      errors.phoneNumber = true;
    }

    // ------------------------------------------------------------
    // Delivery Address
    // Only required if delivery selected
    // ------------------------------------------------------------

    if (deliveryMethod === "delivery") {

      if (!addressType) {
        errors.addressType = true;
      }

      if (!streetAddress.trim()) {
        errors.streetAddress = true;
      }

      if (!unitNumber.trim()) {
        errors.unitNumber = true;
      }

      if (!suburb.trim()) {
        errors.suburb = true;
      }

      if (!postalCode.trim()) {
        errors.postalCode = true;
      }

      if (addressType === "complex" && !complexName.trim()) {
        errors.complexName = true;
      }

    }

    // ------------------------------------------------------------
    // Date & Time
    // ------------------------------------------------------------

    if (!selectedDate) {
      errors.selectedDate = true;
    }

    if (!selectedTimeSlot) {
      errors.selectedTimeSlot = true;
    }

    // ------------------------------------------------------------
    // Payment Method
    // ------------------------------------------------------------

    if (!paymentMethod) {
      errors.paymentMethod = true;
    }

    // ------------------------------------------------------------
    // Card Details
    // ------------------------------------------------------------

    if (paymentMethod === "card") {

      if (!cardName.trim()) {
        errors.cardName = true;
      }

      if (!cardNumber.trim()) {
        errors.cardNumber = true;
      }

      if (!expiryDate.trim()) {
        errors.expiryDate = true;
      }

      if (!cvv.trim()) {
        errors.cvv = true;
      }
    }

    setCheckoutErrors(errors);

    // ------------------------------------------------------------
    // Scroll To First Error
    // ------------------------------------------------------------

    if (errors.deliveryMethod) {
      deliveryMethodRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
      showMessage(
        "Please fill in all required fields.",
        "warning"
      );

      return false;
    }

    if (
      errors.firstName ||
      errors.surname ||
      errors.phoneNumber
    ) {
      customerDetailsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
      showMessage(
        "Please fill in all required fields.",
        "warning"
      );

      return false;
    }

    if (
      errors.addressType ||
      errors.streetAddress ||
      errors.unitNumber ||
      errors.suburb ||
      errors.postalCode ||
      errors.complexName
    ) {
      addressDetailsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
      showMessage(
        "Please fill in all required fields.",
        "warning"
      );

      return false;
    }

    if (
      errors.selectedDate ||
      errors.selectedTimeSlot
    ) {
      dateTimeRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
      showMessage(
        "Please select a date and time.",
        "warning"
      );

      return false;
    }

    if (
      errors.paymentMethod ||
      errors.cardName ||
      errors.cardNumber ||
      errors.expiryDate ||
      errors.cvv
    ) {
      paymentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
      showMessage(
        "Please fill in all required fields.",
        "warning"
      );

      return false;
    }

    return true;
  };

  // ==========================================================================

  // Validates the checkout payment process
  const handleCheckout = async () => {
    const isValid = validateCheckout();

    // Runs all frontend validation first
    if (!isValid) {
      return;
    }

    const subTotal = itemSubtotal;

    // Simplified version of the cart for backend to process
    const orderItems = cart.map(item => ({
      productId: item.id,
      quantity: item.quantity
    }));

    // Copy of the full cart
    const completedCart = [...cart];

    // Object to be sent to backend
    const orderData = {
      // Customer details
      customer: {
        firstName,
        surname,
        phoneNumber
      },
      // Delivery/Collection
      deliveryMethod,
      // Delivery address details
      address: {
        addressType,
        streetAddress,
        unitNumber,
        complexName,
        suburb,
        postalCode,
        deliveryInstructions
      },
      // Date and time slot
      selectedDate,
      selectedTimeSlot,
      // Payment details
      paymentMethod,
      subTotal,
      checkoutTotal,
      // Product id and qty
      items: orderItems
    };

    try {
      // Disables the pay now button while the order is being processed.
      setPlacingOrder(true);
      // Send order to Express
      const response = await fetch("http://localhost:3000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      // If an error status is returned from Express, an error is displayed for the customer
      if (!response.ok) {
        throw new Error(result.message || "Unable to place order.");
      }
      // Store the generated Firebase order ID
      setOrderNumber(result.orderId);
      // Store the completed order for the confirmation page
      setCompletedOrder({
        ...orderData,
        items: completedCart,
        subTotal,
        deliveryFee,
        serviceFee,
        checkoutTotal
      });

      // Clear the shopping cart
      setCart([]);

      // Finally navigate to the confirmation page
      navigateTo("confirmation");
      // Confirmation popup notification
      showMessage(
        "Order successfully placed!",
        "success"
      );

    } catch (error) { // Dislays any errors that arise
      console.error("Checkout Error:", error);
      showMessage(
        error.message || "Something went wrong while trying to place your order. Please try again.",
        "error"
      );
    }
    finally {
      // Re-enable the pay now button whether the order suceeded or failed
      setPlacingOrder(false);
    }

  };

  // ==========================================================================

  const resetApplication = () => {

    setCart([]);
    setCartOpen(false);

    // Navigation
    navigateTo("products");

    // Customer Details
    setFirstName("");
    setSurname("");
    setPhoneNumber("");
    setEmail("");

    // Delivery / Collection
    setDeliveryMethod("");
    setAddressType("");
    setStreetAddress("");
    setUnitNumber("");
    setComplexName("");
    setSuburb("");
    setPostalCode("");

    // Date & time slots
    setSelectedDate("");
    setSelectedTimeSlot("");

    // Payment
    setPaymentMethod("");
    setCardName("");
    setCardNumber("");
    setExpiryDate("");
    setCvv("");

    // Validation
    setCheckoutErrors({});

    // Product quantities
    setQuantities({});

    // Any product messages
    setProductMessages({});
    setProductMessageTypes({});

    // Confirmation Page
    setCompletedOrder(null);
    setOrderNumber("");

    // Ordering processing
    setPlacingOrder(false);

  }

  // ==========================================================================

  // Clears the contact form after message sent successfully
  const resetContactForm = () => {

    setContactName("");
    setContactEmail("");
    setContactSubject("");
    setContactMessage("");

  };

  // Handle the contact form submission
  const handleContactSubmit = (e) => {

    // Prevents the page from refreshing
    e.preventDefault();

    // Basic validation
    if (
      !contactName.trim() ||
      !contactEmail.trim() ||
      !contactSubject.trim() ||
      !contactMessage.trim()
    ) {

      showMessage(
        "Please complete all the fields.",
        "warning"
      );

      return;
    }

    console.log({
      name: contactName,
      email: contactEmail,
      message: contactMessage
    });

    // Clear the form
    resetContactForm();

    // Success notification
    showMessage(
      "Message successfully sent.",
      "success"
    );

  };

  // ==========================================================================

  // Navigating between pages
  const navigateTo = (newPage) => {
    // Update React's page state
    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    // Add new history entries without loading the page
    window.history.pushState(
      { page: newPage },
      "",
      "#" + newPage
    );
  };

  // Keeping data and location on pay when moving back and forther on browser
  useEffect(() => {
    const initialPage =
      window.location.hash.replace("#", "") || "home";

    setPage(initialPage);

    window.history.replaceState(
      { page: initialPage },
      "",
      "#" + initialPage
    );

    const handlePopState = (event) => {

      if (event.state?.page) {
        setPage(event.state.page);
      } else {
        const page =
          window.location.hash.replace("#", "") || "home";

        setPage(page);
      }

      window.scrollTo({
        top: 0,
        behavior: "instant"
      });

    };

    window.addEventListener("popstate", handlePopState);

    return () =>
      window.removeEventListener("popstate", handlePopState);

  }, []);


  // ==========================================================================

  // Footer buttons linking to pages (clearing filters for product page)
  const openProducts = () => {
    setSelectedCategories([]);
    setTempCategories([]);
    navigateTo("products");
  };

  // ==========================================================================

  // Home category buttons linking to filtered product page
  const openCategory = (category) => {

    console.log("Opening category:", category);

    // Selects only the selected chosen category
    setSelectedCategories([category]);

    //Updates temporary filter state
    setTempCategories([category]);

    // Navigate to product page
    navigateTo("products");
  };

  // ==========================================================================

  // ==========================================================================


  return (
    <div className="min-h-screen bg-gray-50 px-6">

      {/* --------------------------------------------------------------------*/}
      {/* Notification Message Section */}
      {/* --------------------------------------------------------------------*/}
      {showNotification && (
        <Notifications
          notificationType={notificationType}
          notificationMessage={notificationMessage}
        />
      )}

      {/* --------------------------------------------------------------------*/}
      {/* Navigation bar*/}
      {/* --------------------------------------------------------------------*/}
      <Navbar
        page={page}
        navigateTo={navigateTo}

        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        cart={cart}
        setCartOpen={setCartOpen}

        setSelectedCategories={setSelectedCategories}
        setTempCategories={setTempCategories}

        logo={logo}
        cartIcon={cartIcon}
      />

      {/* --------------------------------------------------------------------*/}
      {/* Filter Drawer */}
      {/* --------------------------------------------------------------------*/}
      <FilterDrawer
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}

        categories={categories}

        tempCategories={tempCategories}
        toggleTempCategories={toggleTempCategories}

        setSelectedCategories={setSelectedCategories}
      />

      {/* --------------------------------------------------------------------*/}
      {/* --------------------------------------------------------------------*/}

      {/* Products Page */}
      {page === "products" && (
        <ProductsPage
          filteredProducts={filteredProducts}
          selectedCategories={selectedCategories}
          tempCategories={tempCategories}
          setTempCategories={setTempCategories}
          setFilterOpen={setFilterOpen}
          toggleCategory={toggleCategory}

          capitalizeFirstLetter={capitalizeFirstLetter}

          handleQuantityChange={handleQuantityChange}
          quantities={quantities}

          cart={cart}
          addToCart={addToCart}

          productMessages={productMessages}
          productMessageTypes={productMessageTypes}
          setProductMessages={setProductMessages}
          setProductMessageTypes={setProductMessageTypes}
        />
      )}

      {/* --------------------------------------------------------------------*/}
      {/* --------------------------------------------------------------------*/}

      {/* Checkout Page */}
      {page === "checkout" && (
        <CheckoutPage
          cart={cart}
          orderNumber={orderNumber}
          checkoutTotal={checkoutTotal}
          itemSubtotal={itemSubtotal}
          vatAmount={vatAmount}
          serviceFee={serviceFee}
          deliveryFee={deliveryFee}

          showStickyCheckout={showStickyCheckout}
          placingOrder={placingOrder}

          handleCheckout={handleCheckout}

          firstName={firstName}
          setFirstName={setFirstName}
          surname={surname}
          setSurname={setSurname}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          email={email}
          setEmail={setEmail}

          checkoutErrors={checkoutErrors}

          deliveryMethod={deliveryMethod}
          setDeliveryMethod={setDeliveryMethod}

          addressType={addressType}
          setAddressType={setAddressType}

          streetAddress={streetAddress}
          setStreetAddress={setStreetAddress}
          unitNumber={unitNumber}
          setUnitNumber={setUnitNumber}
          complexName={complexName}
          setComplexName={setComplexName}
          suburb={suburb}
          setSuburb={setSuburb}
          postalCode={postalCode}
          setPostalCode={setPostalCode}
          deliveryInstructions={deliveryInstructions}
          setDeliveryInstructions={setDeliveryInstructions}

          availableDates={availableDates}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}

          availableTimeSlots={availableTimeSlots}
          selectedTimeSlot={selectedTimeSlot}
          setSelectedTimeSlot={setSelectedTimeSlot}

          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}

          cardName={cardName}
          setCardName={setCardName}
          cardNumber={cardNumber}
          setCardNumber={setCardNumber}
          expiryDate={expiryDate}
          setExpiryDate={setExpiryDate}
          cvv={cvv}
          setCvv={setCvv}

          capitalizeFirstLetter={capitalizeFirstLetter}

          customerDetailsRef={customerDetailsRef}
          deliveryMethodRef={deliveryMethodRef}
          addressDetailsRef={addressDetailsRef}
          dateTimeRef={dateTimeRef}
          paymentRef={paymentRef}
          checkoutFooterRef={checkoutFooterRef}

          paypalLogo={paypalLogo}
          applePayLogo={applePayLogo}
          visaLogo={visaLogo}
          mastercardLogo={mastercardLogo}

          showMessage={showMessage}
        />
      )}

      {/* --------------------------------------------------------------------*/}
      {/* --------------------------------------------------------------------*/}

      {/* Contact Page */}
      {page === "contact" && (
        <ContactPage
          handleContactSubmit={handleContactSubmit}

          contactName={contactName}
          setContactName={setContactName}

          contactEmail={contactEmail}
          setContactEmail={setContactEmail}

          contactSubject={contactSubject}
          setContactSubject={setContactSubject}

          contactMessage={contactMessage}
          setContactMessage={setContactMessage}
        />
      )}

      {/* --------------------------------------------------------------------*/}
      {/* --------------------------------------------------------------------*/}

      {/* Home Page */}
      {page === "home" && (
        <HomePage
          navigateTo={navigateTo}
          openCategory={openCategory}
        />
      )}

      {/* --------------------------------------------------------------------*/}
      {/* --------------------------------------------------------------------*/}

      {/* Confirmation Page */}
      {page === "confirmation" && (
        <ConfirmationPage
          completedOrder={completedOrder}
          orderNumber={orderNumber}

          capitalizeFirstLetter={capitalizeFirstLetter}
          formatPhoneNumber={formatPhoneNumber}

          navigateTo={navigateTo}

          resetApplication={resetApplication}
        />
      )}

      {/* --------------------------------------------------------------------*/}
      {/* --------------------------------------------------------------------*/}

      {/* Cart drawer component */}
      <CartDrawer
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}

        cart={cart}
        setCart={setCart}

        products={products}

        total={total}

        navigateTo={navigateTo}

        capitalizeFirstLetter={capitalizeFirstLetter}

        trashIcon={trashIcon}

        productMessages={productMessages}
        setProductMessages={setProductMessages}

        productMessageTypes={productMessageTypes}
        setProductMessageTypes={setProductMessageTypes}
      />

      {/* --------------------------------------------------------------------*/}
      {/* --------------------------------------------------------------------*/}

      {/* Footer */}
      <Footer
        navigateTo={navigateTo}
        openCategory={openCategory}
        openProducts={openProducts}

        instaIcon={instaIcon}
        facebookIcon={facebookIcon}
        whatsappIcon={whatsappIcon}

        logo={logo}
        visaLogo={visaLogo}
        mastercardLogo={mastercardLogo}
        paypalLogo={paypalLogo}
        applePayLogo={applePayLogo}
      />

    </div >
  );
}

export default App;
