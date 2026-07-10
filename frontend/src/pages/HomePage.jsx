import React, { useRef } from "react";

import banner from "./assets/hero_banner.png";
import bannerMobile from "./assets/hero_banner-mobile.png";

import delIcon from "./assets/Delivery_Icon.png";
import prodIcon from "./assets/Produce_Icon.png";
import payIcon from "./assets/Payment_Icon.png";

import dairy from "./assets/Dairy_Icon.png";
import fruit from "./assets/Fruit_Icon.png";
import veg from "./assets/Veg_Icon.png";
import pantry from "./assets/Pantry_Icon.png";
import spice from "./assets/Spice_Icon.png";
import meat from "./assets/Meat_Icon.png";
import bakery from "./assets/Bakery_Icon.png";

function HomePage({
    navigateTo,
    openCategory,

}) {
    // -------------------- Start of constants ------------------

    const categoryScrollRef = useRef(null);

    // -------------------- End of constants ------------------

    // -------------------- Start of helper functions ------------------

    const scrollCategories = (direction) => {

        if (!categoryScrollRef.current) return;

        categoryScrollRef.current.scrollBy({
            left: direction * 250,
            behavior: "smooth"
        });

    };

    // -------------------- End of helper functions ------------------

    return (
        <>
            {/* ===================================================================== */}
            {/* Hero Banner */}
            {/* ===================================================================== */}
            <div className="mt-3 relative rounded-2xl overflow-hidden">
                {/* Desktop image */}
                <img
                    src={banner}
                    alt="Home page welcome banner"
                    className="hidden sm:block w-full object-cover object-left rounded-2xl"
                />

                {/* Mobile image */}
                <img
                    src={bannerMobile}
                    alt="Home page welcome banner"
                    className="block sm:hidden w-full object-cover object-left rounded-2xl"
                />

                {/* ===================================================================== */}
                {/* Banner Text */}
                {/* ===================================================================== */}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange/70
                    via-orange/70 to-transparent"
                />

                {/* Banner Text */}
                <div className="absolute left-[7%] top-1/2 -translate-y-1/2 flex flex-col
                    items-start gap-1 sm:gap-4"
                >

                    {/* Main Heading */}
                    <h1 className="font-extrabold leading-none tracking-tight text-[21px] sm:text-[5vw]">
                        <span className="block text-gray-900">
                            Store Groceries
                        </span>
                        <span className="block text-orange-500">
                            Delivered to You
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-[9px] sm:text-[2vw] text-gray-700 font-medium">
                        Straight from our shelves to your door.
                    </p>

                    {/* ===================================================================== */}
                    {/* Banner Button */}
                    {/* ===================================================================== */}
                    <button
                        onClick={() => navigateTo("products")}
                        className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg 
                            transition rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl
                            hover:scale-105 active:scale-95 px-7 py-1.5 sm:px-[10vw] sm:py-[1.6vw]
                            lg:px-[10vw] lg:py-[1.2vw] lg:mt-3 text-[10px] sm:text-[15px] md:text-[20px] 
                            lg:text-[25px] xl:text-[27px] mt-1"
                    >
                        Shop Now
                    </button>
                </div>
            </div>

            {/* ===================================================================== */}
            {/* Welcome Section */}
            {/* ===================================================================== */}
            <section className="mt-5 text-center max-w-4xl mx-auto">
                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                    Welcome to Frivo
                </h2>

                {/* Orange divider */}
                <div className="w-24 h-1 bg-orange-500 rounded-full mx-auto mt-4 mb-4 sm:mb-6"></div>

                {/* Description */}
                <p className="text-gray-600 leading-6 sm:leading-8 text-md sm:text-lg">
                    Enjoy the convenience of shoppoing from your couch by browsing your
                    closest grocery store from you phone.
                    <br></br>
                    <br></br>
                    Receive your groceries without leaving the house. Just choose a date and
                    time, and it will be there.
                </p>
            </section>

            {/* ===================================================================== */}
            {/* 'Why shop with us' section */}
            {/* ===================================================================== */}
            <section className=" mt-8 sm:mt-20">
                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
                    Why Shop With Us
                </h2>

                {/* Orange divider */}
                <div className="w-24 h-1 bg-orange-500 rounded-full mx-auto mt-4 mb-4 sm:mb-6"></div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 mt-6 sm:mt-10">

                    {/* Card 1 */}
                    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl p-6 md:p-8 hover:-translate-y-2 
                        transition-all duration-300 flex flex-col items-center text-center h-full"
                    >
                        <div className="mb-5">
                            <img
                                src={delIcon}
                                alt="delivery icon"
                                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 
                                    object-contain flex-shrink-0 rounded-full"
                            />
                        </div>

                        <div>
                            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900">
                                Fast Delivery
                            </h3>

                            <p className="text-gray-600 mt-4 leading-7 max-w-xs">
                                Receive your groceries quickly with reliable delivery
                                straight to your doorstep.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl p-6 md:p-8 hover:-translate-y-2 
                        transition-all duration-300 flex flex-col items-center text-center h-full"
                    >
                        <div className="mb-5">
                            <img
                                src={prodIcon}
                                alt="produce icon"
                                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 
                                    object-contain flex-shrink-0 rounded-full"
                            />
                        </div>

                        <div>
                            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900">
                                Fresh Produce
                            </h3>

                            <p className="text-gray-600 mt-4 leading-7 max-w-xs">
                                Carefully selected fruit, vegetables and groceries packed
                                with quality and freshness.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl p-6 md:p-8 hover:-translate-y-2 
                        transition-all duration-300 flex flex-col items-center text-center h-full"
                    >
                        <div className="mb-5">
                            <img
                                src={payIcon}
                                alt="produce icon"
                                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 
                                    object-contain flex-shrink-0 rounded-full"
                            />
                        </div>

                        <div>
                            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900">
                                Secure Payment
                            </h3>

                            <p className="text-gray-600 mt-4 leading-7 max-w-xs">
                                Shop confidently using our secure and trusted online
                                checkout process.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================================================================== */}
            {/* Categories */}
            {/* ===================================================================== */}
            <section className="mt-20">
                {/* Heading */}
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    Shop by Category
                </h2>

                {/* Orange divider */}
                <div className="w-24 h-1 bg-orange-500 rounded-full mx-auto mt-4 mb-6"></div>

                {/* Categories */}
                <div className="relative">
                    <button
                        onClick={() => scrollCategories(-1)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 md:hidden 
                            h-10 w-10 rounded-full bg-white/70 backdrop-blur-md shadow-xl 
                            border border-white/60 flex items-center justify-center 
                            hover:scale-110 transition"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                        </svg>
                    </button>

                    <div
                        ref={categoryScrollRef}
                        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth 
                            snap-x snap-mandatory pb-2 px-14"
                    >
                        {/* Category map */}
                        {[
                            {
                                icon: <img
                                    src={fruit}
                                    alt="fruit icon"
                                    className="w-36 h-36 sm:w-40 sm:h-40 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain 
                                    rounded-full"
                                />,
                                title: "Fruit"
                            },
                            {
                                icon: <img
                                    src={veg}
                                    alt="vegetable icon"
                                    className="w-36 h-36 sm:w-40 sm:h-40 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain
                                    rounded-full"
                                />,
                                title: "Vegetables"
                            },
                            {
                                icon: <img
                                    src={dairy}
                                    alt="dairy icon"
                                    className="w-36 h-36 sm:w-40 sm:h-40 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain
                                    rounded-full"
                                />,
                                title: "Dairy"
                            },
                            {
                                icon: <img
                                    src={bakery}
                                    alt="bakery icon"
                                    className="w-36 h-36 sm:w-40 sm:h-40 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain
                                    rounded-full"
                                />,
                                title: "Bakery"
                            },
                            {
                                icon: <img
                                    src={meat}
                                    alt="meat icon"
                                    className="w-36 h-36 sm:w-40 sm:h-40 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain
                                    rounded-full"
                                />,
                                title: "Meat"
                            },
                            {
                                icon: <img
                                    src={pantry}
                                    alt="pantry icon"
                                    className="w-36 h-36 sm:w-40 sm:h-40 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain
                                    rounded-full"
                                />,
                                title: "Pantry"
                            },
                            {
                                icon: <img
                                    src={spice}
                                    alt="spice icon"
                                    className="w-36 h-36 sm:w-40 sm:h-40 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain
                                    rounded-full"
                                />,
                                title: "Spices"
                            }].map(category => (
                                <div
                                    key={category.title}
                                    onClick={() => openCategory(category.title)}
                                    className="flex-shrink-0 snap-start w-32 sm:w-36 md:w-44 cursor-pointer bg-white 
                                        rounded-2xl shadow-md p-3 text-center hover:-translate-y-2 hover:shadow-2xl 
                                        hover:scale-[1.02] transition-all duration-300"
                                >
                                    <div className="flex justify-center items-center w-full">
                                        {category.icon}
                                    </div>

                                    <h3 className="mt-4 font-semibold text-lg">
                                        {category.title}
                                    </h3>
                                </div>
                            ))
                        }
                    </div>

                    <button
                        onClick={() => scrollCategories(1)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 md:hidden 
                            h-10 w-10 rounded-full bg-white/70 backdrop-blur-md shadow-xl 
                            border border-white/60 flex items-center justify-center 
                            hover:scale-110 transition"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5L15.75 12l-7.5 7.5"
                            />
                        </svg>
                    </button>
                </div>
            </section>

            {/* ===================================================================== */}
            {/* Store statistics */}
            {/* ===================================================================== */}
            <section className="mt-20">
                <div className="bg-orange-500 rounded-3xl p-10 text-white">
                    {/* 4 Boxes (div) of stats - NOT 100% accurate - just filler information for now */}
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        {/* Box 1 */}
                        <div>
                            <h2 className="text-4xl font-bold">
                                100+
                            </h2>
                            <p className="mt-2">
                                Products
                            </p>
                        </div>

                        {/* Box 2 */}
                        <div>
                            <h2 className="text-4xl font-bold">
                                Fresh
                            </h2>
                            <p className="mt-2">
                                Daily Stock
                            </p>
                        </div>

                        {/* Box 3 */}
                        <div>
                            <h2 className="text-4xl font-bold">
                                Same Day
                            </h2>
                            <p className="mt-2">
                                Delivery
                            </p>
                        </div>

                        {/* Box 4 */}
                        <div>
                            <h2 className="text-4xl font-bold">
                                100%
                            </h2>
                            <p className="mt-2">
                                Secure Checkout
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}

export default HomePage;