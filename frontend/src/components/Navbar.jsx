import React from "react";

function NavButton({
    label,
    targetPage,
    page,
    navigateTo,
    setMenuOpen,

    setSelectedCategories,
    setTempCategories
}) {

    // -------------------- Start of helper functions ------------------

    // Determine whether this button represents the current page.
    const isActive = page === targetPage;

    // -------------------- End of helper functions ------------------

    return (
        <button
            onClick={() => {
                if (targetPage === "products") {
                    setSelectedCategories([]);
                    setTempCategories([]);
                }

                navigateTo(targetPage);
                setMenuOpen(false); // Close the mobile menu after navigating.
            }}
            className={`group relative font-medium transition-all duration-300 px-2 py-1 hover:-translate-y-0.5
                ${isActive
                    ? "text-orange-500"
                    : "text-gray-700 hover:text-orange-500"
                }
            `}
        >
            {label}
            {/* Orange underline on active page */}
            <span className={`absolute left-1/2 -translate-x-1/2 -bottom-1 h-0.5 bg-orange-500 
                rounded-full transition-all duration-300
                ${isActive
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }
            `} />
        </button>
    );
}

{/* =====================================================================================================================*/ }
{/* =====================================================================================================================*/ }

function Navbar({
    page,
    navigateTo,

    menuOpen,
    setMenuOpen,
    cart,
    setCartOpen,

    setSelectedCategories,
    setTempCategories,

    logo,
    cartIcon
}) {

    // -------------------- Start of contants ------------------

    const navLinks = [
        {
            label: "Home",
            targetPage: "home"
        },
        {
            label: "Products",
            targetPage: "products"
        },
        {
            label: "Contact",
            targetPage: "contact"
        }
    ];

    // -------------------- End of constants ------------------

    return (

        <>
            <div className="sticky bg-white/80 backdrop-blur-md shadow-md rounded-2xl px-5 sm:px-7 
                py-3 flex items-center transition-all duration-300 top-0 left-0 right-0 mt-6 mb-6 z-30"
            >
                {/* Left Side */}
                <div className="w-1/3 flex justify-start items-center gap-1">

                    {/* Mobile Hamburger Nav */}
                    <button
                        className="text-2xl md:hidden "
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle navigation menu"
                    >
                        {/* SVG for a less generic hamburger nav icon */}
                        {menuOpen ? (
                            // X icon
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-7 h-7"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            // Hamburger icon
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-7 h-7"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h12M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Dropdown Menu */}
                {menuOpen && (
                    <div className="fixed top-20 left-6 right-6 z-40 md:hidden flex flex-col 
                        items-center gap-4 p-5 rounded-2xl bg-white/100 backdrop-blur-md shadow-xl 
                        animate-fadeIn"
                    >
                        {navLinks.map(link => (
                            <NavButton
                                key={link.targetPage}

                                label={link.label}
                                targetPage={link.targetPage}

                                page={page}
                                navigateTo={navigateTo}

                                menuOpen={menuOpen}
                                setMenuOpen={setMenuOpen}

                                setSelectedCategories={setSelectedCategories}
                                setTempCategories={setTempCategories}
                            />
                        ))}
                    </div>
                )}

                {/* Center */}
                <div className="w-1/3 flex justify-center">

                    {/* Clickable Logo icon */}
                    <button
                        onClick={() => {
                            navigateTo("home");
                            setMenuOpen(false); // Closes the mobile menu if it's open
                        }}
                        className="transition-all duration-300 hover:scale-105 hover:drop-shadow-lg 
                            focus:outline-none"
                        aria-label="Go to Home Page"
                    >
                        <img
                            src={logo}
                            alt="Frivo Logo"
                            className="h-12 sm:h-14 md:h-[72px] max-w-[170px] sm:max-w-[210px] 
                                md:max-w-[240px] object-contain transition-transform duration-300 "
                        />
                    </button>
                </div>

                {/* Right Side */}
                <div className="w-1/3 flex justify-end items-center gap-3">

                    {/* Desktop navigation - hidden on smaller screens */}
                    <div className="hidden lg:flex gap-4 items-center">
                        {navLinks.map(link => (
                            <NavButton
                                key={link.targetPage}

                                label={link.label}
                                targetPage={link.targetPage}

                                page={page}
                                navigateTo={navigateTo}

                                menuOpen={menuOpen}
                                setMenuOpen={setMenuOpen}

                                setSelectedCategories={setSelectedCategories}
                                setTempCategories={setTempCategories}
                            />
                        ))}
                    </div>

                    {/* Desktop Hamburger Nav */}
                    <button
                        className="hidden md:block lg:hidden text-2xl"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle navigation menu"
                    >
                        {/* SVG for a less generic hamburger nav icon */}
                        {menuOpen ? (
                            // X icon
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-7 h-7"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            // Hamburger icon
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-7 h-7"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h12M4 18h16"
                                />
                            </svg>
                        )}
                    </button>

                    {/* Interactive cart icon - shows cart count */}
                    <button
                        onClick={() => setCartOpen(true)}
                        className="relative flex items-center justify-center p-2 rounded-full 
                            hover:bg-orange-100 transition-all duration-300"
                    >
                        <img
                            src={cartIcon}
                            alt="Cart"
                            className="h-6 w-6 transition-transform duration-300 hover:scale-110"
                        />
                        <span className="absolute -top-1 -right-1 flex items-center justify-center
                            w-5 h-5 rounded-full bg-orange-500 text-white text-xs font-bold"
                        >
                            {cart.reduce((sum, item) => sum + (item.quantity || 0), 0)}
                        </span>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Navbar;