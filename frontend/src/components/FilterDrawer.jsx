import React from "react";

function FilterDrawer({

    filterOpen,
    setFilterOpen,

    categories,
    tempCategories,
    toggleTempCategories,
    setSelectedCategories

}) {

    // -------------------- Start of helper functions ------------------

    const applySelection = () => {
        setSelectedCategories(tempCategories);
        setFilterOpen(false);
    };

    // -------------------- End of helper functions ------------------

    return (
        <>
            {/* Filter Overlay */}
            <div
                className={`fixed inset-0 bg-black/40 transition-opacity duration-300
                    ${filterOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }
                `}
                onClick={() => setFilterOpen(false)}
            />

            {/* Filter Drawer */}
            <div className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 p-4 transform 
                transition-transform duration-300
                ${filterOpen
                    ? "translate-x-0"
                    : "-translate-x-full"}
                `}
            >
                {/* Close button on filter drawer */}
                <button onClick={() => setFilterOpen(false)}>
                    ✖
                </button>

                {/* Filter Title */}
                <h2 className="text-lg font-bold mt-4 mb-2">
                    Categories:
                </h2>

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
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center 
                                    justify-center transition duration-200
                                    ${tempCategories.includes(categ)
                                    ? "bg-orange-400 border-orange-400"
                                    : "border-gray-400"
                                }
                            `}>
                                {/* Affect when selected */}
                                {tempCategories.includes(categ) && (
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                )}
                            </div>

                            {/* Label text */}
                            <span>{categ}</span>

                        </label>
                    ))}
                </div>

                {/* Subtle line */}
                <div className="border-t border-gray-400 mt-7 opacity-55"></div>

                {/* Applying changes button */}
                <button
                    className="mt-6 w-full bg-orange-400 text-white py-2 rounded"
                    onClick={applySelection}
                >
                    Apply Selection
                </button>
            </div>
        </>
    );
}

export default FilterDrawer;