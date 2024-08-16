import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/inertia-react';
import NavLink from '@/Components/NavLink';
import './wallpaper.css';  // Ensure the CSS file is imported
import NotFound from './NotFound';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Example of checking authentication status from local storage
        const checkAuth = () => {
            const token = localStorage.getItem('authToken'); // Replace with your auth token check
            setIsAuthenticated(!!token);
        };
        checkAuth();
    }, []);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const closeNavbar = () => {
        setIsOpen(false);
    };

    const scrollToContact = (e) => {
        e.preventDefault();  // Prevent default click behavior
        const contactSection = document.getElementById('Contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        closeNavbar();  // Close the navbar after scrolling
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
                                className='text-yellow-400 hover:text-yellow-200'
                                href="/Home"
                                active={route().current('Home')}
                                onClick={closeNavbar}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                className='text-yellow-400 hover:text-yellow-200'
                                href="/About"
                                active={route().current('About')}
                                onClick={closeNavbar}
                            >
                                About Us
                            </NavLink>
                            <NavLink
                                className='text-yellow-400 hover:text-yellow-200'
                                onClick={scrollToContact}
                            >
                                Contact
                            </NavLink>
                            {isAuthenticated ? (
                                <NavLink
                                    className='text-yellow-400 hover:text-yellow-200'
                                    href="/siswa/dashboard"
                                    onClick={closeNavbar}
                                >
                                    Siswa Dashboard
                                </NavLink>
                            ) : (
                                <NavLink
                                    className='text-yellow-400 hover:text-yellow-200'
                                    href="/login"
                                    active={route().current('Login')}
                                    onClick={closeNavbar}
                                >
                                    Login
                                </NavLink>
                            )}
                            <NavLink component={NotFound} /> {/* Route for 404 page */}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
