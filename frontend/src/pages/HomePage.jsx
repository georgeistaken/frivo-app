import banner from "./assets/home-banner-3.png";

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
    return (
        <>
            {/* ===================================================================== */}
            {/* Hero Banner */}
            {/* ===================================================================== */}
            <div className="mt-3 relative rounded-2xl overflow-hidden">
                <img
                    src={banner}
                    alt="Home page welcome banner"
                    className="w-full object-cover object-left rounded-2xl"
                />

                {/* ===================================================================== */}
                {/* Banner Text */}
                {/* ===================================================================== */}

                {/* Banner Text */}
                <div className="absolute left-[6%] top-[36%] -translate-y-1/2 
                max-w-[42%] z-20"
                >

                    {/* Main Heading */}
                    <h1 className="font-extrabold leading-none tracking-tight text-[4vw]">
                        <span className="block text-gray-900">
                            Store Groceries
                        </span>
                        <span className="block text-orange-500 mt-[0.3vw]">
                            Delivered to You
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-[1vw] text-[1.3vw] text-gray-700 font-medium">
                        Straight from our shelves to your door.
                    </p>
                </div>

                {/* ===================================================================== */}
                {/* Banner Button */}
                {/* ===================================================================== */}
                <button
                    onClick={() => navigateTo("products")}
                    className="absolute left-[5.7%] bottom-[9%] bg-orange-500 hover:bg-orange-600 
                        text-white shadow-lg transition rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl
                        hover:scale-105 active:scale-95 px-[4.2vw] py-[1vw] text-[1.2vw] sm:text-[11px] md:text-[14px] lg:text-[19px]"
                >
                    Shop Now
                </button>

            </div>

            {/* ===================================================================== */}
            {/* Welcome Section */}
            {/* ===================================================================== */}
            <section className="mt-12 text-center max-w-4xl mx-auto">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Welcome to Frivo
                </h2>

                {/* Orange divider */}
                <div className="w-24 h-1 bg-orange-500 rounded-full mx-auto mt-4 mb-6"></div>

                {/* Description */}
                <p className="text-gray-600 leading-8 text-lg">
                    Grocery shopping made simple.
                    <br />
                    <br />
                    Enjoy the convenience of shoppoing from your couch by browsing your
                    closest grocery store from you phone.
                    Receive your groceries without leaving the house. Just choose a date and
                    time, and it will be there.
                    <br />
                    <br />
                    At Frivo, convenience and efficiency come together to make every
                    shopping trip effortless.
                </p>
            </section>

            {/* ===================================================================== */}
            {/* 'Why shop with us' section */}
            {/* ===================================================================== */}
            <section className="mt-20">
                {/* Heading */}
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    Why Shop With Us
                </h2>

                {/* Orange divider */}
                <div className="w-24 h-1 bg-orange-500 rounded-full mx-auto mt-4 mb-6"></div>

                {/* Info Cards */}
                <div className="grid md:grid-cols-3 gap-8 mt-10">

                    {/* Card 1 */}
                    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl p-6 md:p-8 hover:-translate-y-1 
                        transition-all duration-300 flex flex-col md:flex-row items-center gap-6"
                    >
                        <div>
                            <img
                                src={delIcon}
                                alt="delivery icon"
                                className="w-40 h-40 sm:w-44 sm:h-44 md:w-36 md:h-36 lg:w-44 lg:h-44 object-contain 
                                    rounded-full flex-shrink-0"
                            />
                        </div>

                        <h3 className="text-xl font-semibold text-center mt-5">
                            Fast Delivery
                        </h3>

                        <p className="text-gray-600 text-center mt-3">
                            Receive your groceries quickly with reliable delivery
                            straight to your doorstep.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl p-6 md:p-8 hover:-translate-y-1 
                        transition-all duration-300 flex flex-col md:flex-row items-center gap-6"
                    >
                        <div>
                            <img
                                src={prodIcon}
                                alt="produce icon"
                                className="w-40 h-40 sm:w-44 sm:h-44 md:w-36 md:h-36 lg:w-44 lg:h-44 object-contain rounded-full flex-shrink-0"
                            />
                        </div>

                        <h3 className="text-xl font-semibold text-center mt-5">
                            Fresh Produce
                        </h3>

                        <p className="text-gray-600 text-center mt-3">
                            Carefully selected fruit, vegetables and groceries packed
                            with quality and freshness.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl p-6 md:p-8 hover:-translate-y-1 
                        transition-all duration-300 flex flex-col md:flex-row items-center gap-6"
                    >
                        <div>
                            <img
                                src={payIcon}
                                alt="secure payment icon"
                                className="w-40 h-40 sm:w-44 sm:h-44 md:w-36 md:h-36 lg:w-44 lg:h-44 object-contain 
                                    rounded-full flex-shrink-0"
                            />
                        </div>

                        <h3 className="text-xl font-semibold text-center mt-5">
                            Secure Payments
                        </h3>

                        <p className="text-gray-600 text-center mt-3">
                            Shop confidently using our secure and trusted online
                            checkout process.
                        </p>
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
                <div className="flex flex-wrap justify-center gap-6 mt-10">
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
                                    rounded-ful"
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
                                className="w-[280px] cursor-pointer bg-white rounded-2xl shadow-md p-8 text-center 
                                    hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
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