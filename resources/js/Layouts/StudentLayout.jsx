import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { Helmet } from "react-helmet"; // For adding metadata
import Footer from "@/Components/Footer";

const StudentLayout = ({ children, user }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Helmet>
                <title>Student Dashboard - NewPrimagama Fatmawati</title>
                <meta
                    name="description"
                    content="Student Dashboard for NewPrimagama Fatmawati"
                />
                <link
                    rel="shortcut icon"
                    href="/images/Reverse.png"
                    type="image/x-icon"
                />
            </Helmet>

            {/* Navbar */}
            <nav className="bg-gradient-to-r from-purple-950 to-blue-800 p-4 sticky top-0 z-50 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <Link
                        href="/Home"
                        className="text-white text-lg font-bold flex items-center"
                    >
                        <img
                            src="/images/Logo White.png"
                            className="h-11"
                            alt="Logo"
                        />
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden text-white flex items-center"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    {/* Desktop Menu */}
                    <ul className="hidden lg:flex space-x-4">
                        <li>
                            <a
                                href={route("siswa.dashboard")}
                                className="text-white px-4 py-2 rounded-lg hover:bg-gray-200"
                            >
                                Dashboard
                            </a>
                        </li>
                    </ul>

                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="text-white flex items-center hover:text-gray-300"
                        >
                            <img
                                src={
                                    user.profile_picture ? `/storage/${user.profile_picture}`
                                        : "/default-profile-picture.png"
                                }
                                alt="Profile"
                                className="w-12 h-12 object-cover rounded-full mr-4"
                            />{" "}
                            <span className="mr-2">
                                {user ? user.name : "Loading..."}
                            </span>
                            <svg
                                className={`w-4 h-4 transition-transform ${
                                    dropdownOpen ? "transform rotate-180" : ""
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white text-black border border-gray-300 rounded shadow-lg">
                                <a
                                    href="/siswa/profile"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                    onClick={closeDropdown}
                                >
                                    Profile
                                </a>
                                <a
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                                    onClick={closeDropdown}
                                >
                                    Logout
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="lg:hidden absolute top-16 left-0 right-0 bg-gradient-to-r from-purple-950 to-blue-800 text-white border border-gray-300 rounded-b shadow-lg">
                        <a
                            href={route("siswa.dashboard")}
                            className="block px-4 py-2 hover:bg-gray-200"
                            onClick={closeMenu}
                        >
                            Dashboard
                        </a>
                        <a
                            href="/siswa/profile"
                            className="block px-4 py-2 hover:bg-gray-200"
                            onClick={closeMenu}
                        >
                            Profile
                        </a>
                        <a
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                            onClick={closeMenu}
                        >
                            Logout
                        </a>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="flex-grow container mx-auto p-6">{children}</main>

            <Footer />
        </div>
    );
};

export default StudentLayout;
