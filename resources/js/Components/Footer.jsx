import React from "react";
import { Link } from "@inertiajs/inertia-react";

const Footer = () => {
    const phoneNumber = "62818936487"; // Nomor WhatsApp tanpa karakter '+'
    const message = "Halo aku sudah melihat Penawaran yang ada dan aku sangat tertarik dengan New Primagama Fatmawati"; // Pesan yang ingin dikirim

    // Membuat URL WhatsApp dengan nomor telepon dan pesan
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
    )}`;
    return (
        <footer className="bg-gradient-to-r from-purple-950 to-blue-800 text-white py-8 mt-2">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0 text-center md:text-left">
                    <Link href="/Home">
                        <img
                            src="/images/Logo White.png"
                            className="h-11 mx-auto md:mx-0"
                            alt="Company Logo"
                        />
                    </Link>
                    <p className="text-sm mt-4">
                        © 2024 New Primagama Fatmawati. All rights reserved.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row md:space-x-8 mb-6 md:mb-0 text-center md:text-left">
                    <div className="mb-6 md:mb-0">
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul>
                            <li>
                                <a
                                    href="/About"
                                    className="hover:text-gray-400"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/Services"
                                    className="hover:text-gray-400"
                                >
                                    Services
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#Contact"
                                    className="hover:text-gray-400"
                                >
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/FAQ"
                                    className="hover:text-gray-400"
                                >
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.zenius.net/blog/"
                                    className="hover:text-gray-400"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Zenius Blog
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                        <ul>
                            <li>
                                Email:{" "}
                                <a
                                    href="mailto:npfatmawati@gmail.com"
                                    className="hover:text-gray-400"
                                    target="_blank"
                                >
                                    npfatmawati@gmail.com
                                </a>
                            </li>
                            <li>
                                Nomor Telpon:{" "}
                                <a
                                href={url}
                                className="hover:text-gray-400"
                                    target="_blank"
                                >
                                    +62818-936-487
                                </a>
                            </li>
                            <li>
                                Alamat: Jl. RS. Fatmawati Raya No.4J, RT.3/RW.5,
                                Cilandak Bar., Kec. Cilandak, Kota Jakarta
                                Selatan, Daerah Khusus Ibukota Jakarta 12430
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex space-x-6">
                    <a
                        href="https://www.instagram.com/newprimagamafatmawati?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                        target="_blank"
                        className="hover:text-gray-400"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M7.75 2.5h8.5a5.25 5.25 0 015.25 5.25v8.5a5.25 5.25 0 01-5.25 5.25h-8.5A5.25 5.25 0 012.5 16.25v-8.5A5.25 5.25 0 017.75 2.5zm0 1.5a3.75 3.75 0 00-3.75 3.75v8.5a3.75 3.75 0 003.75 3.75h8.5a3.75 3.75 0 003.75-3.75v-8.5a3.75 3.75 0 00-3.75-3.75h-8.5zm6.99 1.5h.01c.69 0 1.25.56 1.25 1.25v.01c0 .69-.56 1.25-1.25 1.25h-.01a1.25 1.25 0 01-1.25-1.25v-.01c0-.69.56-1.25 1.25-1.25zm-5.24 3.74a4.25 4.25 0 110 8.5 4.25 4.25 0 010-8.5zm0 1.5a2.75 2.75 0 100 5.5 2.75 2.75 0 000-5.5z" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
