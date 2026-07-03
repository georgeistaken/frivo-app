import React from "react";

function Notifications({
    notificationType,
    notificationMessage
}) {

    // -------------------- Start of helper functions ------------------



    // -------------------- End of helper functions ------------------

    return (
        <>
            <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-[9999] min-w-[320px] max-w-[500px] 
                px-6 py-4 rounded-xl shadow-2xl border flex items-center gap-3 animated-fade-in
                ${notificationType === "success"
                    ? "bg-green-50 border-green-300 text-green-700"
                    : notificationType === "error"
                        ? "bg-red-50 border-red-300 text-red-700"
                        : notificationType === "warning"
                            ? "bg-yellow-50 border-yellow-300 text-yellow-700"
                            : "bg-blue-50 border-blue-300 text-blue-700"
                }
            `}>
                {/* Icons */}
                <span className="text-2xl">
                    {notificationType === "success"
                        ? "✔"
                        : notificationType === "error"
                            ? "✖"
                            : notificationType === "warning"
                                ? "⚠"
                                : "ℹ"
                    }
                </span>

                {/* Message */}
                <span className="font-medium">
                    {notificationMessage}
                </span>
            </div>
        </>
    );
}

export default Notifications;