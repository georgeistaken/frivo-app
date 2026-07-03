import React from "react";
function CheckoutPage({
    cart,
    orderNumber,
    checkoutTotal,
    itemSubtotal,
    vatAmount,
    serviceFee,
    deliveryFee,

    showStickyCheckout,
    placingOrder,

    handleCheckout,

    firstName,
    setFirstName,
    surname,
    setSurname,
    phoneNumber,
    setPhoneNumber,
    email,
    setEmail,

    checkoutErrors,

    deliveryMethod,
    setDeliveryMethod,

    addressType,
    setAddressType,

    streetAddress,
    setStreetAddress,
    unitNumber,
    setUnitNumber,
    complexName,
    setComplexName,
    suburb,
    setSuburb,
    postalCode,
    setPostalCode,
    deliveryInstructions,
    setDeliveryInstructions,

    availableDates,
    selectedDate,
    setSelectedDate,

    availableTimeSlots,
    selectedTimeSlot,
    setSelectedTimeSlot,

    paymentMethod,
    setPaymentMethod,

    cardName,
    setCardName,
    cardNumber,
    setCardNumber,
    expiryDate,
    setExpiryDate,
    cvv,
    setCvv,

    capitalizeFirstLetter,

    customerDetailsRef,
    deliveryMethodRef,
    addressDetailsRef,
    dateTimeRef,
    paymentRef,
    checkoutFooterRef,

    paypalLogo,
    applePayLogo,
    visaLogo,
    mastercardLogo,

    showMessage
}) {
    return (
        <div className="max-w-5xl mx-auto mt-6">

            {/* ===================================================================== */}
            {/* Sticky Bar */}
            {/* ===================================================================== */}
            <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200
                    shadow-lg px-6 py-3 z-40 transition-all duration-700 ease-in-out
                    ${showStickyCheckout
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }
            `}>
                <div className="max-w-6xl mx-auto flex justify-between items-center">

                    {/* Running checkout total on the sticky bar */}
                    <div>
                        <p className="text-xs text-gray-500">
                            Total
                        </p>
                        <p className="text-xl font-bold text-orange-500">
                            €{checkoutTotal.toFixed(2)}
                        </p>
                    </div>

                    {/* The pay now button on the sticky bar */}
                    <button
                        onClick={handleCheckout}
                        className="bg-orange-500 text-white px-6 py-3 rounded-xl font-medium"
                    >
                        Pay Now
                    </button>
                </div>
            </div>

            {/* the white checkout card where all the input fields and selectors will be placed*/}
            <div className="bg-white rounded-2xl shadow-sm p-6">

                {/* Title */}
                <h1 className="text-3xl font-medium text-gray-800 mb-6">
                    Checkout
                </h1>

                {/* ===================================================================== */}
                {/* Login Section */}
                {/* ===================================================================== */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold">
                                Returning Customer
                            </h2>

                            <p className="text-gray-500 text-sm">
                                Log in to automatically fill your details
                            </p>
                        </div>

                        <button
                            onClick={() =>
                                showMessage(
                                    "Login functionality coming soon",
                                    "success"
                                )
                            }
                            className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50"
                        >
                            Log In
                        </button>
                    </div>
                </div>

                {/* ===================================================================== */}
                {/* Customer Details */}
                {/* ===================================================================== */}
                <div
                    ref={customerDetailsRef}
                    className="bg-white rounded-2xl shadow-sm p-6 mt-6"
                >
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Customer Details
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">

                        {/* Firstname input field */}
                        <input
                            type="text"
                            placeholder="Firstname  (Required)"
                            value={firstName}
                            onChange={(e) =>
                                setFirstName(e.target.value)
                            }
                            className={`border rounded-xl p-3
                                ${checkoutErrors.firstName
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }
                            `}
                        />

                        {/* Surname input field */}
                        <input
                            type="text"
                            placeholder="Surname  (Required)"
                            value={surname}
                            onChange={(e) =>
                                setSurname(e.target.value)
                            }
                            className={`border rounded-xl p-3
                                ${checkoutErrors.surname
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }
                            `}
                        />

                        {/* Contact number input field */}
                        <input
                            type="tel"
                            placeholder="Contact Number  (Required)"
                            value={phoneNumber}
                            onChange={(e) =>
                                setPhoneNumber(e.target.value)
                            }
                            className={`border rounded-xl p-3
                                ${checkoutErrors.phoneNumber
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }
                            `}
                        />

                        {/* Email address input field */}
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="border rounded-xl p-3"
                        />

                    </div>
                </div>

                {/* Subtle section divider */}
                <div className="border-t border-gray-200 my-8"></div>

                {/* ===================================================================== */}
                {/* Delivery Method Section */}
                {/* ===================================================================== */}
                <div
                    ref={deliveryMethodRef}
                    className="bg-white rounded-2xl shadow-sm p-6"
                >
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Delivery Method
                    </h2>

                    <div className="flex flex-col gap-3">

                        {/* Collection */}
                        <label className={`flex items-center gap-4 border rounded-2xl p-4 
                            cursor-pointer transition
                            ${deliveryMethod === "collection"
                                ? "border-orange-400 bg-orange-50"
                                : "border-gray-200"
                            }
                        `}>
                            <input
                                type="radio"
                                name="deliveryMethod"
                                checked={deliveryMethod === "collection"}
                                onChange={() =>
                                    setDeliveryMethod("collection")
                                }
                                className="w-6 h-6 accent-orange-400"
                            />

                            <div>
                                <p className="font-medium">
                                    Collection
                                </p>
                                <p className="text-sm text-gray-500">
                                    Collect your order from the store
                                </p>
                            </div>

                        </label>

                        {/* Delivery */}
                        <label className={`flex items-center gap-4 border rounded-2xl p-4
                            cursor-pointer transition
                            ${deliveryMethod === "delivery"
                                ? "border-orange-400 bg-orange-50"
                                : "border-gray-200"
                            }
                        `}>
                            <input
                                type="radio"
                                name="deliveryMethod"
                                checked={deliveryMethod === "delivery"}
                                onChange={() =>
                                    setDeliveryMethod("delivery")
                                }
                                className="w-6 h-6 accent-orange-400"
                            />

                            <div>
                                <p className="font-medium">
                                    Delivery
                                </p>
                                <p className="text-sm text-gray-500">
                                    Have your groceries delivered
                                </p>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Subtle section divider */}
                <div className="border-t border-gray-200 my-8"></div>

                {/* ===================================================================== */}
                {/* Delivery Address - Only appears if delivery is selected */}
                {/* ===================================================================== */}
                {deliveryMethod === "delivery" && (
                    <div
                        ref={addressDetailsRef}
                        className="mt-8 border-t border-gray-200 pt-8"
                    >
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Delivery Address
                        </h2>

                        {/* ===================================================================== */}
                        {/* Address type selection fields */}
                        {/* ===================================================================== */}
                        <div className="flex flex-col gap-3 mb-6">

                            <label className={`flex items-center gap-4 border rounded-2xl p-4 
                                cursor-pointer
                                ${addressType === "house"
                                    ? "border-orange-400 bg-orange-50"
                                    : "border-gray-200"
                                }
                            `}>
                                <input
                                    type="radio"
                                    name="addressType"
                                    checked={addressType === "house"}
                                    onChange={() =>
                                        setAddressType("house")
                                    }
                                    className="w-6 h-6 accent-orange-400"
                                />
                                <span>House</span>
                            </label>

                            <label className={`flex items-center gap-4 border rounded-2xl p-4 
                                cursor-pointer
                                ${addressType === "complex"
                                    ? "border-orange-400 bg-orange-50"
                                    : "border-gray-200"
                                }
                            `}>
                                <input
                                    type="radio"
                                    name="addressType"
                                    checked={addressType === "complex"}
                                    onChange={() =>
                                        setAddressType("complex")
                                    }
                                    className="w-6 h-6 accent-orange-400"
                                />
                                <span>Complex</span>
                            </label>

                            <label className={`flex items-center gap-4 border rounded-2xl p-4 
                                cursor-pointer
                                ${addressType === "office"
                                    ? "border-orange-400 bg-orange-50"
                                    : "border-gray-200"
                                }
                            `}>
                                <input
                                    type="radio"
                                    name="addressType"
                                    checked={addressType === "office"}
                                    onChange={() =>
                                        setAddressType("office")
                                    }
                                    className="w-6 h-6 accent-orange-400"
                                />
                                <span> Office </span>
                            </label>
                        </div>

                        {/* ===================================================================== */}
                        {/* Address Fields */}
                        {/* ===================================================================== */}

                        <div className="grid md:grid-cols-2 gap-4">

                            <input
                                type="text"
                                placeholder="Street Address"
                                value={streetAddress}
                                onChange={(e) =>
                                    setStreetAddress(e.target.value)
                                }
                                className={`border rounded-xl p-3
                                    ${checkoutErrors.streetAddress
                                        ? "border-red-500"
                                        : "border-gray-300"
                                    }
                                `}
                            />

                            <input
                                type="text"
                                placeholder="Unit / House Number"
                                value={unitNumber}
                                onChange={(e) =>
                                    setUnitNumber(e.target.value)
                                }
                                className={`border rounded-xl p-3
                                    ${checkoutErrors.unitNumber
                                        ? "border-red-500"
                                        : "border-gray-300"
                                    }
                                `}
                            />

                            {addressType === "complex" && (
                                <input
                                    type="text"
                                    placeholder="Complex Name"
                                    value={complexName}
                                    onChange={(e) =>
                                        setComplexName(e.target.value)}
                                    className={`border rounded-xl p-3
                                        ${checkoutErrors.complexName
                                            ? "border-red-500"
                                            : "border-gray-300"
                                        }
                                    `}
                                />
                            )}

                            <input
                                type="text"
                                placeholder="Suburb"
                                value={suburb}
                                onChange={(e) =>
                                    setSuburb(e.target.value)
                                }
                                className={`border rounded-xl p-3 md:col-span-2
                                    ${checkoutErrors.suburb
                                        ? "border-red-500"
                                        : "border-gray-300"
                                    }
                                `}
                            />

                            <input
                                type="text"
                                placeholder="Postal Code"
                                value={postalCode}
                                onChange={(e) =>
                                    setPostalCode(e.target.value)
                                }
                                className={`border rounded-xl p-3
                                    ${checkoutErrors.postalCode
                                        ? "border-red-500"
                                        : "border-gray-300"
                                    }
                                `}
                            />

                            {/* Delivery Instructions */}
                            <textarea
                                placeholder="Delivery Instructions (Optional)"
                                value={deliveryInstructions}
                                onChange={(e) =>
                                    setDeliveryInstructions(e.target.value)
                                }
                                rows="4"
                                className="border rounded-xl p-3 md:col-span-2 resize-none"
                            />

                        </div>
                    </div>
                )}

                {/* Subtle section divider */}
                <div className="border-t border-gray-200 my-8"></div>

                {/* ===================================================================== */}
                {/* Date Selector section */}
                {/* ===================================================================== */}
                <div
                    ref={dateTimeRef}
                    className="bg-white rounded-2xl shadow-sm p-6 mt-6"
                >

                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Select Date
                    </h2>

                    {/* Scrollable container with dates + makes each date option a button */}
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {availableDates.map((date) => (
                            <button
                                key={date.value}
                                onClick={() => setSelectedDate(date.value)}
                                className={`min-w-[120px] rounded-xl border px-4 py-3 shadow-sm 
                                    hover:shadow-md transition-all duration-200 
                                    focus:border-orange-400 focus:ring-2 focus:ring-orange-300 
                                    focus:outline-none appearance-none cursor-pointer
                                    ${selectedDate === date.value
                                        ? "border-orange-400 bg-white"
                                        : "border-gray-300 bg-white"}
                                `}
                            >
                                {date.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Subtle section divider */}
                <div className="border-t border-gray-200 my-8"></div>

                {/* ===================================================================== */}
                {/* Time Slot Selection */}
                {/* ===================================================================== */}
                <div className="mt-8">

                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Select Time Slot
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {/* Scrollable selector */}
                        <select
                            value={selectedTimeSlot}
                            onChange={(e) => setSelectedTimeSlot(e.target.value)}
                            className="w-full rounded-2xl border border-gray-300 bg-white px-4 
                                py-3 text-gray-700 shadow-sm transition-all duration-200 
                                focus:border-orange-400 focus:ring-2 focus:ring-orange-300 
                                focus:outline-none appearance-none cursor-pointer"
                        >
                            <option value="">
                                Select a collection time
                            </option>

                            {availableTimeSlots.map(time => (
                                <option
                                    key={time}
                                    value={time}
                                >
                                    {time}
                                </option>
                            ))}
                        </select>

                        {/* If there are no time slots, a message is diplayed for the user 
                        {availableTimeSlots.length === 0 ? (
                            <div className="col-span-full">
                                <p className="text-center text-gray-500 italic py-4">
                                    No time slots available for the selected date.
                                </p>
                            </div>
                        ) : (
                            // Displays the available time slots as buttons
                            availableTimeSlots.map((slot) => (
                                <button
                                    key={slot}
                                    onClick={() => setSelectedTimeSlot(slot)}
                                    className={`p-3 rounded-xl border shadow-sm hover:shadow-md transition
                                        ${selectedTimeSlot === slot
                                            ? "border-orange-400 bg-orange-50"
                                            : "border-gray-300 bg-white"
                                        }
                                    `}
                                >
                                    {slot}
                                </button>
                            ))
                        )}  */}
                    </div>
                </div>

                {/* Subtle section divider */}
                <div className="border-t border-gray-200 my-8"></div>

                {/* ===================================================================== */}
                {/* Order Summary Section */}
                {/* ===================================================================== */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">

                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Order Summary
                    </h2>

                    {/* Displays the order number for customer reference */}
                    <p className="text-sm text-gray-500 mb-4">
                        Order Number: {orderNumber}
                    </p>

                    {/* Subtle divider */}
                    <div className="border-t border-gray-200 mb-4"></div>

                    {/* Displays all the cart items and their information */}
                    {cart.length === 0 ? (
                        <p className="text-gray-500">
                            There are no items in the cart.
                        </p>
                    ) : (
                        cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-4 py-4 border-b border-gray-100"
                            >
                                {/* Product Image */}
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-14 w-14 rounded-lg object-cover"
                                />

                                {/* Product Information */}
                                <div className="flex-1">

                                    {/* Product Name */}
                                    <p className="font-medium text-gray-800">
                                        {capitalizeFirstLetter(item.name)}
                                    </p>

                                    {/* Quantity and price */}
                                    <div className="flex justify-between items-center mt-1">
                                        <span className="text-sm text-gray-500">
                                            Qty: {item.quantity}
                                        </span>
                                        <span className="text-m font-medium text-gray-700">
                                            €{((item.price ?? 0) * (item.quantity ?? 0)).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}

                    {/* Subtle divider */}
                    <div className="border-t border-gray-300 mb-4"></div>

                    {/* ===================================================================== */}
                    {/* Price Breakdown Section */}
                    {/* ===================================================================== */}

                    {/* The subtotal before VAT and fees */}
                    <div className="flex justify-between py-2 mt-6">
                        <span className="text-gray-600">
                            Subtotal
                        </span>
                        <span className="font-medium">
                            €{itemSubtotal.toFixed(2)}
                        </span>
                    </div>

                    {/* VAT amount */}
                    <div className="flex justify-between py-2">
                        <span className="text-gray-600">
                            VAT (15%)
                        </span>
                        <span className="font-medium">
                            €{vatAmount.toFixed(2)}
                        </span>
                    </div>

                    {/* Service fee */}
                    <div className="flex justify-between py-2">
                        <span className="text-gray-600">
                            Service Fee
                        </span>
                        <span className="font-medium">
                            €{serviceFee.toFixed(2)}
                        </span>
                    </div>

                    {/* Delivery fee */}
                    <div className="flex justify-between py-2">
                        <span className="text-gray-600">
                            Delivery Fee
                        </span>
                        <span className="font-medium">
                            {deliveryMethod === "delivery"
                                ? `€${deliveryFee.toFixed(2)}`
                                : "€0.00"}
                        </span>
                    </div>

                    {/* Divider before total */}
                    <div className="border-t border-gray-200 my-4"></div>

                    {/* Grand Total */}
                    <div
                        ref={checkoutFooterRef}
                        className="flex justify-between items-center"
                    >
                        <span className="text-lg font-bold text-gray-800">
                            Total
                        </span>
                        <span className="text-xl font-bold text-orange-500">
                            €{checkoutTotal.toFixed(2)}
                        </span>
                    </div>
                </div>

                {/* ===================================================================== */}
                {/* Payment Section */}
                {/* ===================================================================== */}

                {/* Payment Methods */}
                <div
                    ref={paymentRef}
                    className="bg-white rounded-2xl shadow-sm p-6 mt-6"
                >

                    <h2 className="text-xl font-semibold text-gray-800">
                        Payment Method
                    </h2>

                    {/* Subtle Divider */}
                    <div className="border-t border-gray-200 my-4"></div>

                    {/* Payment Options */}
                    <div className="space-y-4">

                        {/* PayPal */}
                        <div
                            onClick={() => setPaymentMethod("paypal")}
                            className={`border rounded-xl p-4 cursor-pointer transition
                                ${paymentMethod === "paypal"
                                    ? "border-gray-400 bg-gray-50"
                                    : "border-gray-200"
                                }
                            `}
                        >
                            <div className="flex items-center gap-4">

                                {/* Selection Circle */}
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                                    ${paymentMethod === "paypal"
                                        ? "border-orange-400"
                                        : "border-gray-300"
                                    }
                                `}>
                                    {paymentMethod === "paypal" && (
                                        <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                                    )}
                                </div>

                                {/* Logo */}
                                <img
                                    src={paypalLogo}
                                    alt="PayPal"
                                    className="h-10 object-contain"
                                />

                            </div>
                        </div>

                        {/* Apple Pay */}
                        <div
                            onClick={() => setPaymentMethod("applepay")}
                            className={`border rounded-xl p-4 cursor-pointer transition
                                ${paymentMethod === "applepay"
                                    ? "border-gray-400 bg-gray-50"
                                    : "border-gray-200"
                                }
                            `}
                        >
                            <div className="flex items-center gap-4">
                                {/* Selection Circle */}
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                                    ${paymentMethod === "applepay"
                                        ? "border-orange-400"
                                        : "border-gray-300"
                                    }
                                `}
                                >
                                    {paymentMethod === "applepay" && (
                                        <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                                    )}
                                </div>

                                {/* Logo */}
                                <img
                                    src={applePayLogo}
                                    alt="Apple Pay"
                                    className="h-10 object-contain"
                                />

                            </div>
                        </div>

                        {/* Card */}
                        <div
                            onClick={() => setPaymentMethod("card")}
                            className={`border rounded-xl p-4 cursor-pointer transition
                                ${paymentMethod === "card"
                                    ? "border-gray-400 bg-gray-50"
                                    : "border-gray-200"
                                }
                            `}
                        >
                            <div className="flex items-center gap-4">
                                {/* Selection Circle */}
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                                    ${paymentMethod === "card"
                                        ? "border-orange-400"
                                        : "border-gray-300"
                                    }
                                `}>
                                    {paymentMethod === "card" && (
                                        <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                                    )}
                                </div>

                                {/* Logo */}
                                <img
                                    src={visaLogo}
                                    alt="Visa"
                                    className="h-8 object-contain"
                                />
                                <img
                                    src={mastercardLogo}
                                    alt="Mastercard"
                                    className="h-8 object-contain"
                                />
                            </div>

                            {/* Card info fields for when the card payment method is selected */}
                            {paymentMethod === "card" && (
                                <div className="mt-5 space-y-4">
                                    {/* Cardholder's Name */}
                                    <input
                                        type="text"
                                        placeholder="Name on Card"
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value)}
                                        className={`w-full border rounded-lg p-3
                                            ${checkoutErrors.cardName
                                                ? "border-red-500"
                                                : "border-gray-300"
                                            }
                                        `}
                                    />
                                    {/* Card Number */}
                                    <input
                                        type="text"
                                        placeholder="Card Number"
                                        value={cardNumber}
                                        autoComplete="off"
                                        onChange={(e) => setCardNumber(e.target.value)}
                                        className={`w-full border rounded-lg p-3
                                            ${checkoutErrors.cardNumber
                                                ? "border-red-500"
                                                : "border-gray-300"
                                            }
                                        `}
                                    />

                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Card Expiry Date */}
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            value={expiryDate}
                                            onChange={(e) => setExpiryDate(e.target.value)}
                                            className={`border rounded-lg p-3
                                                ${checkoutErrors.expiryDate
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                                }
                                            `}
                                        />
                                        {/* Card CVV Number */}
                                        <input
                                            type="password"
                                            placeholder="CVV"
                                            autoComplete="off"
                                            value={cvv}
                                            onChange={(e) => setCvv(e.target.value)}
                                            className={`border rounded-lg p-3
                                                ${checkoutErrors.cvv
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                                }
                                            `}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* EFT */}
                        <div // Selection Circle
                            onClick={() => setPaymentMethod("eft")}
                            className={`border rounded-xl p-4 cursor-pointer transition
                                ${paymentMethod === "eft"
                                    ? "border-gray-400 bg-gray-50"
                                    : "border-gray-200"
                                }
                            `}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                                    ${paymentMethod === "eft"
                                        ? "border-orange-400"
                                        : "border-gray-300"
                                    }
                                `}>
                                    {paymentMethod === "eft" && (
                                        <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                                    )}
                                </div>

                                <span className="font-medium">
                                    EFT / Bank Transfer
                                </span>

                            </div>
                            {/* Fake temp bank info for efts */}
                            {paymentMethod === "eft" && (
                                <div className="mt-4 text-sm text-gray-600 space-y-1">
                                    <p><strong>Bank:</strong> Random Bank</p>
                                    <p><strong>Account:</strong> 123456789</p>
                                    <p><strong>Branch:</strong> 250655</p>
                                    <p><strong>Reference:</strong> Use your order number</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ===================================================================== */}
                {/* Pay Now Section */}
                {/* ===================================================================== */}
                <div className="mt-10 bg-white rounded-2xl shadow-md border border-gray-100 p-6">

                    {/* This div holds the total checkout price */}
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600">
                            Order Total
                        </span>
                        <span className="text-3xl font-bold text-orange-500">
                            €{checkoutTotal.toFixed(2)}
                        </span>
                    </div>

                    {/* Subtle divider */}
                    <div className="border-t border-gray-200 my-4"></div>

                    {/* The checkout pay now button */}
                    <button
                        onClick={handleCheckout}
                        disabled={placingOrder}
                        className={`w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-500
                             text-white font-medium transition
                            ${placingOrder
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-orange-500 hover:bg-orange-600 text-white"
                            }
                        `}
                    >
                        {placingOrder ? "Processing..." : "Pay Now"}
                    </button>

                    {/* Message for the user on payment security */}
                    <p className="text-xs text-gray-400 mt-3 text-center">
                        Secure checkout   •   Your payment information is encrypted
                    </p>

                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;