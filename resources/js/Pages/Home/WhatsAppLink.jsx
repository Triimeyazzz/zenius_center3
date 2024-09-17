import React, { useState } from "react";
import axios from "axios"; // Import axios for making API requests

const WhatsAppLink = () => {
    const phoneNumber = "62818936487"; // WhatsApp number without '+'
    const message = "Halo aku sudah melihat Penawaran yang ada dan aku sangat tertarik dengan New Primagama Fatmawati"; // Message to send

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            // Send POST request to the ContactController
            await axios.post("/api/contact", formData);
            setSuccess(true); // Set success state to true
            // Optionally, redirect or perform other actions here
        } catch (error) {
            console.error("Error sending message:", error);
            // Handle error here
        }
    };

    return (
        <div className="bg-gray-100 py-16 relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-center mb-12">Hubungi Kami</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="col-span-2 bg-white rounded-lg shadow-md p-6" data-aos="fade-right">
                        <h2 className="text-2xl font-semibold mb-4">Kirim Pesan</h2>
                        <form id="Contact" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-600 focus:border-purple-600 sm:text-sm"
                                    placeholder="Nama Anda"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-600 focus:border-purple-600 sm:text-sm"
                                    placeholder="Email Anda"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Pesan</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-600 focus:border-purple-600 sm:text-sm"
                                    placeholder="Pesan Anda"
                                ></textarea>
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                >
                                    Kirim Pesan
                                </button>
                            </div>
                        </form>
                        {success && (
                            <p className="text-green-500 mt-4 text-center">
                                Pesan telah dikirim! Anda akan dialihkan ke WhatsApp.
                            </p>
                        )}
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center" data-aos="fade-left">
                        <h2 className="text-2xl font-semibold mb-4">Hubungi langsung</h2>
                        <p className="text-lg mb-4">
                            Telepon: +62 818936487
                            <br />
                            Email: example@example.com
                            <br />
                            Alamat: Jl. RS. Fatmawati Raya No.3, RT.3/RW.5, Cilandak Bar., Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12430
                        </p>
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mt-2"
                        >
                            WhatsApp Kami
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhatsAppLink;
