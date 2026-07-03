import React from "react";
function ConfirmationPage({
    completedOrder,
    orderNumber,
    paymentMethod,

    capitalizeFirstLetter,
    formatPhoneNumber,

    resetApplication
}) {
    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="bg-white rounded-xl shadow-lg p-8">

                {/* Success Tick */}
                <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-green-100
                        flex items-center justify-center"
                    >
                        <span className="text-5xl text-green-600 font-bold">
                            ✓
                        </span>
                    </div>
                </div>

                {/* Thank you message */}
                <h1 className="text-4xl font-bold text-center text-green-700">
                    Thank You!
                </h1>

                <p className="text-center text-gray-600 mt-3 text-lg">
                    Your order has been placed successfully and is now being prepared.
                </p>

                <hr className="my-8" />

                {/* Order Information */}
                <h2 className="text-2xl font-bold mb-5">
                    Order Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">

                    {/* Order Number */}
                    <div>
                        <p>
                            Order Number
                        </p>

                        <p className="font-semibold">
                            {orderNumber}
                        </p>

                    </div>

                    {/* Order date */}
                    <div>
                        <p className="text-sm text-gray-500">
                            Order Date
                        </p>

                        <p className="font-semibold">
                            {new Date().toLocaleDateString()}
                        </p>
                    </div>

                    {/* Order Time */}
                    <div>
                        <p className="text-sm text-gray-500">
                            Time Placed
                        </p>

                        <p className="font-semibold">
                            {new Date().toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                        </p>
                    </div>

                    {/* Payment */}
                    <div>
                        <p className="text-sm text-gray-500">
                            Payment Method
                        </p>

                        <p className="font-semibold capitalize">
                            {completedOrder.paymentMethod}
                        </p>
                    </div>
                </div>

                <hr className="my-8" />

                {/* Customer Information */}
                <h2>
                    Customer Details
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Customer Name */}
                    <div>
                        <p className="text-sm text-gray-500">
                            Name
                        </p>

                        <p className="font-semibold">
                            {completedOrder.customer.firstName}{" "}
                            {completedOrder.customer.surname}
                        </p>
                    </div>

                    {/* Phone Number */}
                    <div>
                        <p className="text-sm text-gray-500">
                            Phone Number
                        </p>

                        <p className="font-semibold">
                            {formatPhoneNumber(completedOrder.customer.phoneNumber)}
                        </p>
                    </div>
                </div>

                <hr className="my-8" />

                {/* Delivery / Collection */}
                <h2 className="text-2xl font-bold mb-5">
                    {completedOrder.deliveryMethod === "delivery"
                        ? "Delivery Details"
                        : "Collection Details"}
                </h2>

                {/* Delivery */}

                {completedOrder.deliveryMethod === "delivery" && (
                    <div className="space-y-4">

                        {/* Address Type */}
                        <div>
                            <p className="text-sm text-gray-500">
                                Address Type
                            </p>

                            <p className="font-semibold capitalize">
                                {completedOrder.address.addressType}
                            </p>
                        </div>

                        {/* Complex Name */}
                        {completedOrder.address.addressType === "complex" && (
                            <div>
                                <p className="text-sm text-gray-500">
                                    Complex Name
                                </p>

                                <p className="font-semibold">
                                    {completedOrder.address.complexName}
                                </p>
                            </div>
                        )}

                        {/* Street Address */}
                        <div>
                            <p className="text-sm text-gray-500">
                                Street Address
                            </p>

                            <p className="font-semibold">
                                {completedOrder.address.streetAddress}
                            </p>
                        </div>

                        {/* House / Unit */}
                        <div>
                            <p className="text-sm text-gray-500">
                                House / Unit Number
                            </p>

                            <p className="font-semibold">
                                {completedOrder.address.unitNumber}
                            </p>
                        </div>

                        {/* Suburb */}
                        <div>
                            <p className="text-sm text-gray-500">
                                Suburb
                            </p>

                            <p className="font-semibold">
                                {completedOrder.address.suburb}
                            </p>
                        </div>

                        {/* Postal Code */}
                        <div>
                            <p className="text-sm text-gray-500">
                                Postal Code
                            </p>

                            <p className="font-semibold">
                                {completedOrder.address.postalCode}
                            </p>
                        </div>

                    </div>
                )}

                {/* Collection */}
                {completedOrder.deliveryMethod === "collection" && (
                    <div className="grid md:grid-cols-2 gap-6">

                        {/* Collection Date */}
                        <div>
                            <p className="text-sm text-gray-500">
                                Collection Date
                            </p>

                            <p className="font-semibold">
                                {completedOrder.selectedDate}
                            </p>
                        </div>

                        {/* Collection Time */}
                        <div>
                            <p className="text-sm text-gray-500">
                                Collection Time
                            </p>

                            <p className="font-semibold">
                                {completedOrder.selectedTimeSlot}
                            </p>
                        </div>
                    </div>
                )}

                <hr className="my-8" />

                {/* Order Summary */}
                <h2 className="text-2xl font-bold mb-5">
                    Order Summary
                </h2>

                {/* Table Heading */}
                <div className="grid grid-cols-12 font-semibold border-b pb-2 mb-3">
                    <div className="col-span-6">
                        Product
                    </div>

                    <div className="col-span-2 text-center">
                        Qty
                    </div>

                    <div className="col-span-4 text-right">
                        Total
                    </div>
                </div>

                {/* Ordered Products */}
                {completedOrder.items.map((item) => (
                    <div
                        key={item.productId}
                        className="grid grid-cols-12 py-2 border-b"
                    >
                        <div className="col-span-6">
                            {capitalizeFirstLetter(item.name)}
                        </div>

                        <div className="col-span-2 text-center">
                            {item.quantity}
                        </div>

                        <div className="col-span-4 text-right">
                            €{(item.price * item.quantity).toFixed(2)}
                        </div>
                    </div>
                ))}

                <hr className="my-8" />

                {/* Order Totals */}
                <div className="max-w-md ml-auto space-y-3">

                    {/* Subtotal */}
                    <div className="flex justify-between">
                        <span>
                            Subtotal
                        </span>

                        <span>
                            €{completedOrder.subTotal.toFixed(2)}
                        </span>
                    </div>

                    {/* Delivery Fee */}
                    <div className="flex justify-between">
                        <span>
                            Delivery Fee
                        </span>

                        <span>
                            €{completedOrder.deliveryFee.toFixed(2)}
                        </span>
                    </div>

                    {/* Service Fee */}
                    <div className="flex justify-between">
                        <span>
                            Service Fee
                        </span>

                        <span>
                            €{completedOrder.serviceFee.toFixed(2)}
                        </span>
                    </div>

                    <hr />

                    {/* Grand Total */}
                    <div className="flex justify-between text-2xl font-bold text-green-700">
                        <span>
                            Total Paid
                        </span>

                        <span>
                            €{completedOrder.checkoutTotal.toFixed(2)}
                        </span>
                    </div>
                </div>

                <hr className="my-8" />

                {/* Continue Shopping Button */}
                <div className="flex justify-center">
                    <button
                        onClick={resetApplication}
                        className=" bg-orange-500 hover:bg-orange-600
                             text-white px-10 py-3 rounded-lg
                            text-lg font-semibold transition"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationPage;