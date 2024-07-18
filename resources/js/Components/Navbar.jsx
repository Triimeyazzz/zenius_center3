import React, { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import NavLink from '@/Components/NavLink';
import './wallpaper.css';  // Pastikan untuk mengimpor file CSS di sini
import NotFound from './NotFound';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const closeNavbar = () => {
        setIsOpen(false);
    };

    const scrollToContact = (e) => {
        e.preventDefault();  // Mencegah perilaku default dari event klik
        const contactSection = document.getElementById('Contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        closeNavbar();  // Menutup navbar setelah scroll
    };

    return (
        <nav className="bg-gradient-to-r from-purple-950 to-blue-800 p-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold pl-4">
                    <Link href="/Home">
                        <img src="images/Logo White.png" className="h-11" alt="" />
                    </Link>
                </div>
                <div className="lg:hidden">
                    <button
                        onClick={toggleNavbar}
                        className="text-white focus:outline-none focus:text-white"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div>
                <div className={`lg:flex lg:flex-grow items-center ${isOpen ? 'block' : 'hidden'}`}>
                    <div className="lg:flex lg:items-center lg:justify-end lg:flex-grow">
                        <div className="flex flex-col lg:flex-row lg:space-x-8 lg:items-center lg:space-y-4 space-y-4">
                            <NavLink
                                className='text-yellow-400 hover:text-yellow-800'
                                href="/Home"
                                active={route().current('Home')}
                                onClick={closeNavbar}
                                
                            >
                                Home
                            </NavLink>
                            <NavLink
                                className='text-yellow-400 hover:text-yellow-800'
                                href="/About"
                                active={route().current('About')}
                                onClick={closeNavbar}
                            >
                                About Us
                            </NavLink>
                            <NavLink
                                className='text-yellow-400 hover:text-yellow-800    '
                                onClick={scrollToContact}
                            >
                                Contact
                            </NavLink>
                            <NavLink component={NotFound} /> {/* Route untuk halaman 404 */}

                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
