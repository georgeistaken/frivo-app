import React from "react";
function ContactPage({
    handleContactSubmit,

    contactName,
    setContactName,

    contactEmail,
    setContactEmail,

    contactSubject,
    setContactSubject,

    contactMessage,
    setContactMessage
}) {
    return (
        <div className="max-w-6xl mx-auto mt-10">
            <h1 className="text-5xl font-bold text-center text-gray-800">
                Contact Us
            </h1>

            {/* Orange divider */}
            <div className="w-28 h-1 bg-orange-500 mx-auto rounded-full mt-4 mb-12" />

            <div className="grid lg:grid-cols-2 gap-10">

                {/* Contact Information */}
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl text-center">
                    <h2 className="text-3xl font-bold mb-8">
                        Get In Touch
                    </h2>

                    <div className="space-y-6 text-lg">
                        <div>
                            <p className="text-gray-600">
                                support@frivo.com
                            </p>
                            <p>
                                +49 176 3456789
                            </p>
                        </div>

                        <div>
                            <p className="font-semibold text-xl">
                                Suport Contact Hours
                            </p>

                            {/* Subltle divider */}
                            <div className="w-56 h-[1px] bg-gray-500 mx-auto rounded-full mt-2 mb-6" />

                            <p className="text-gray-600 font-semibold">
                                Monday - Saturday
                            </p>

                            <p className="text-gray-600">
                                08:00 - 18:00
                            </p>

                            <p className="text-gray-600 mt-2 font-semibold">
                                Sunday
                            </p>

                            <p className="text-gray-600">
                                Closed
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-3xl shadow-lg p-8">
                    <h2 className="text-3xl font-bold mb-8">
                        Send us a Message
                    </h2>

                    <form
                        onSubmit={handleContactSubmit}
                        className="space-y-5"
                    >
                        <input
                            type="text"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            placeholder="Your Name"
                            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-400 
                                outline-none"
                        />
                        <input
                            type="email"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            placeholder="Your Email"
                            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-400 
                                outline-none"
                        />
                        <input
                            type="text"
                            value={contactSubject}
                            onChange={(e) => setContactSubject(e.target.value)}
                            placeholder="Subject"
                            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-400 
                                outline-none"
                        />
                        <textarea
                            rows="6"
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="w-full border rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-orange-400 
                                outline-none"
                        />

                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl 
                                py-3 transition-all duration-300 hover:scale-[1.02] active:scale-95"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;