import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/inertia-react';
import NavLink from '@/Components/NavLink';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('authToken');
            setIsAuthenticated(!!token);
        };
        checkAuth();

        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleNavbar = () => setIsOpen(!isOpen);
    const closeNavbar = () => setIsOpen(false);

    const scrollToContact = (e) => {
        e.preventDefault();
        const contactSection = document.getElementById('Contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        closeNavbar();
    };

    const navbarVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const linkVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    return (
        <motion.nav
            initial="hidden"
            animate="visible"
            variants={navbarVariants}
            className={`fixed w-full top-0 z-50 transition-all duration-300 ${
                scrolled ? 'bg-purple-900 shadow-lg' : 'bg-transparent'
            }`}
        >
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link href="/Home" className="flex items-center space-x-2">
                    <img src="/images/Logo White.png" className="h-10" alt="Logo" />
                    <span className="text-white text-xl font-bold">NewPrimagama</span>
                </Link>

                <div className="hidden lg:flex space-x-8 items-center">
                    {['/Home', '/About', 'Contact', isAuthenticated ? 'Dashboard' : 'Login'].map((item, index) => (
                        <motion.div key={item} variants={linkVariants}>
                            <NavLink
                                href={item === 'Contact' ? '#' : `/${item.toLowerCase().replace(' ', '-')}`}
                                className="text-white hover:text-yellow-300 transition-colors duration-300"
                                onClick={item === 'Contact' ? scrollToContact : undefined}
                            >
                                {item}
                            </NavLink>
                        </motion.div>
                    ))}
                </div>

                <div className="lg:hidden">
                    <button onClick={toggleNavbar} className="text-white focus:outline-none">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden bg-purple-900"
                    >
                        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                            {['Home', 'About Us', 'Contact', isAuthenticated ? 'Dashboard' : 'Login'].map((item) => (
                                <NavLink
                                    key={item}
                                    href={item === 'Contact' ? '#' : `/${item.toLowerCase().replace(' ', '-')}`}
                                    className="text-white hover:text-yellow-300 transition-colors duration-300"
                                    onClick={item === 'Contact' ? scrollToContact : closeNavbar}
                                >
                                    {item}
                                </NavLink>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;