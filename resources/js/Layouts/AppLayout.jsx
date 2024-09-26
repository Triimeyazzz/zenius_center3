import React, { useState, useEffect } from 'react';
import Navbar from "@/Components/Navbar";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Footer from '@/Components/Footer';

const AppLayout = ({ children }) => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.pageYOffset > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Helmet>
                <title>NewPrimagama Fatmawati</title>
                <meta name="description" content="Bimble Terbaik di Indonesia" />
                <link rel="shortcut icon" href="/images/Reverse.png" type="image/x-icon" />
            </Helmet>
            <style>
                {`
                    /* ... (previous styles) ... */

                    /* Additional modern styles */
                    body {
                        font-family: 'Inter', sans-serif;
                        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                    }

                    .content-wrapper {
                        min-height: calc(100vh - 64px); /* Adjust based on your navbar height */
                        padding: 2rem;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        background-color: rgba(255, 255, 255, 0.8);
                        backdrop-filter: blur(10px);
                        border-radius: 1rem;
                        margin: 1rem;
                    }

                    .scroll-top-button {
                        position: fixed;
                        bottom: 2rem;
                        right: 2rem;
                        background: linear-gradient(135deg, #a4508b 0%, #5f2c91 100%);
                        color: white;
                        border: none;
                        border-radius: 50%;
                        width: 50px;
                        height: 50px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                    }

                    .scroll-top-button:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
                    }
                `}
            </style>
            <Navbar />
            <motion.main
                className="content-wrapper"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {children}
            </motion.main>
            <Footer />
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        className="scroll-top-button"
                        onClick={scrollToTop}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ArrowUp size={24} />
                    </motion.button>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default AppLayout;