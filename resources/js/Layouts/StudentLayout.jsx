// resources/js/Layouts/StudentLayout.jsx
import React, { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import { Helmet } from "react-helmet"; // For adding metadata
import Footer from "@/Components/Footer";

const StudentLayout = ({ children, user }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
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
                    <Link href="/Home" className="text-white text-lg font-bold flex items-center">
                        <img
                            src="/images/Logo White.png"
                            className="h-11"
                            alt="Logo"
                        />
                    </Link>
                    <ul className="flex space-x-4">
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
                                <Link
                                    href="/siswa/profile"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                    onClick={closeDropdown}
                                >
                                    Profile
                                </Link>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                                    onClick={closeDropdown}
                                >
                                    Logout
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow container mx-auto p-6">{children}</main>

            <Footer />
        </div>
    );
};

export default StudentLayout;
