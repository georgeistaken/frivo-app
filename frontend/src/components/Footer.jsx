import React from "react";

function Footer({
    navigateTo,
    openCategory,
    openProducts,

    instaIcon,
    facebookIcon,
    whatsappIcon,

    logo,
    visaLogo,
    mastercardLogo,
    paypalLogo,
    applePayLogo
}) {

    // -------------------- Start of helper functions ------------------

    // -------------------- End of helper functions ------------------

    return (
        <>
            <footer className="mt-8 bg-gradient-to-br from-orange-50 via-white to-orange-100 
                rounded-3xl shadow-lg px-6 md:px-8 py-8 md:py-12"
            >
                {/* Logo */}
                <div className="mb-5 ">
                    <img
                        src={logo}
                        alt="Frivo logo"
                        className="h-10 transition-transform duration-300 hover:scale-105"
                    />
                </div>

                {/* Subtle divider */}
                <div className="border-t mt-4 pt-4"></div>

                {/* Footer content */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-5">

                    {/* Quick links */}
                    <div>
                        <h3 className="font-bold text-md mb-4">
                            Quick Links
                        </h3>

                        <div className="flex flex-col gap-1">
                            <button
                                onClick={() => navigateTo("home")}
                                className="text-left text-sm transition-all duration-300 
                                hover:text-orange-500 hover:translate-x-1"
                            >
                                Home
                            </button>

                            <button
                                onClick={openProducts}
                                className="text-left text-sm transition-all duration-300 
                                hover:text-orange-500 hover:translate-x-1"
                            >
                                Products
                            </button>

                            <button
                                onClick={() => navigateTo("contact")}
                                className="text-left text-sm transition-all duration-300 
                                hover:text-orange-500 hover:translate-x-1"
                            >
                                Contact Us
                            </button>
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="font-bold text-md mb-4">
                            Categories
                        </h3>

                        <div className="flex flex-col gap-1">
                            {[
                                "Fruit",
                                "Vegetables",
                                "Dairy",
                                "Bakery",
                                "Meat",
                                "Pantry",
                                "Spices"
                            ].map(category => (
                                <button
                                    key={category}
                                    onClick={() => openCategory(category)}
                                    className="text-left text-sm transition-all duration-300
                                    hover:text-orange-500 hover:translate-x-1"
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <div>
                            <h3 className="font-bold text-md mb-4">
                                Contact Us
                            </h3>

                            <div className="space-y-3 text-gray-600 text-sm">
                                <p>
                                    +49 176 3456789
                                    <br />
                                    support@frivo.com
                                </p>
                                <p>
                                    Monday - Saturday
                                    <br />
                                    08:00 - 18:00
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3 text-gray-600 text-md mt-6 font-semibold">
                            <p>
                                Follow Us
                            </p>

                            {/* Social Media Icons */}
                            <div className="grid grid-cols-4">
                                <img
                                    src={instaIcon}
                                    alt="Instagram logo"
                                    className="h-7 mt-1 transition-transform duration-300 hover:scale-105"
                                />
                                <img
                                    src={facebookIcon}
                                    alt="Facebook logo"
                                    className="h-7 mt-1 border transition-transform duration-300 
                                        hover:scale-105 rounded-full"
                                />
                                <img
                                    src={whatsappIcon}
                                    alt="Whatsapp logo"
                                    className="h-9 transition-transform duration-300 hover:scale-105 
                                        rounded-full"
                                />
                            </div>
                        </div>

                    </div>

                    {/* Supported Payment Methods */}
                    <div className="mt-5">
                        <p className="font-semibold mb-2">
                            Supported Payment Option
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                            <img src={visaLogo} alt="visa logo" className="h-7" />
                            <img src={mastercardLogo} alt="mastercard logo" className="h-7" />
                            <img src={paypalLogo} alt="paypal logo" className="h-7" />
                            <img src={applePayLogo} alt="apple pay logo" className="h-7" />
                        </div>
                    </div>

                </div> {/* End of footer mid */}

                {/* Bottom Bar */}
                <div className="border-t mt-5 pt-5">
                    <p className="text-center text-sm text-gray-500">
                        © 2026 Frivo. All Rights Reserved.
                        <br />
                        Built for educational purposes.
                    </p>
                </div>
            </footer>
        </>
    );
}

export default Footer;