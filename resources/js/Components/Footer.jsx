import React from "react";
import { Link } from "@inertiajs/inertia-react";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
    const phoneNumber = "62818936487";
    const message = "Halo, saya tertarik dengan New Primagama Fatmawati. Bisakah Anda memberikan informasi lebih lanjut?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <footer className="bg-gradient-to-r from-purple-950 to-blue-800 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link href="/Home">
                            <img
                                src="/images/Logo White.png"
                                className="h-12"
                                alt="New Primagama Fatmawati Logo"
                            />
                        </Link>
                        <p className="text-sm text-gray-300">
                            Mewujudkan potensi terbaik setiap siswa melalui pendidikan berkualitas.
                        </p>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {['About', 'Services', 'Contact', 'FAQ'].map((item) => (
                                <li key={item}>
                                    <a
                                        href={`/${item}`}
                                        className="hover:text-blue-300 transition duration-300"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a
                                    href="https://www.zenius.net/blog/"
                                    className="hover:text-blue-300 transition duration-300"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Zenius Blog
                                </a>
                            </li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-bold mb-4">Hubungi Kami</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center">
                                <Mail size={18} className="mr-2" />
                                <a
                                    href="mailto:npfatmawati@gmail.com"
                                    className="hover:text-blue-300 transition duration-300"
                                >
                                    npfatmawati@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center">
                                <Phone size={18} className="mr-2" />
                                <a
                                    href={whatsappUrl}
                                    className="hover:text-blue-300 transition duration-300"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    +62818-936-487
                                </a>
                            </li>
                            <li className="flex items-start">
                                <MapPin size={18} className="mr-2 mt-1" />
                                <span className="text-sm">
                                    Jl. RS. Fatmawati Raya No.4J, RT.3/RW.5, Cilandak Bar., 
                                    Kec. Cilandak, Jakarta Selatan, DKI Jakarta 12430
                                </span>
                            </li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-bold mb-4">Ikuti Kami</h3>
                        <a
                            href="https://www.instagram.com/newprimagamafatmawati"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block hover:opacity-80 transition duration-300"
                        >
                            <Instagram size={24} />
                        </a>
                    </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} New Primagama Fatmawati. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;