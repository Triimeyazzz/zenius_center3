import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { Helmet } from "react-helmet";
import Draggable from "react-draggable";
import Footer from "@/Components/Footer";

const StudentLayout = ({ children, siswa }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Helmet>
        <title>Student Dashboard - NewPrimagama Fatmawati</title>
        <meta name="description" content="Student Dashboard for NewPrimagama Fatmawati" />
        <link rel="shortcut icon" href="/images/Reverse.png" type="image/x-icon" />
      </Helmet>

      <nav className="bg-gradient-to-r from-purple-950 to-blue-800 p-4 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center relative">
          <Link href="/Home" className="text-white text-lg font-bold flex items-center">
            <img src="/images/Logo White.png" className="h-11" alt="Logo" />
          </Link>

          {/* Draggable and Animated Menu Button */}
          <Draggable defaultPosition={{ x: -100, y: 60 }}>
            <button
              onClick={toggleMenu}
              className="lg:hidden p-3 bg-gradient-to-r from-purple-700 to-blue-600 text-white rounded-full shadow-lg transform transition-transform duration-300 hover:scale-110 focus:outline-none z-50"
            >
              <svg
                className={`w-6 h-6 transition-transform ${menuOpen ? "transform rotate-90" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </Draggable>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-4">
            <Link href="/siswa/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
            <Link href="/siswa/messages" className="text-white hover:text-gray-300">Messages</Link>
            <Link href="/siswa/ulasan" className="text-white hover:text-gray-300">Ulasan</Link>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-white flex items-center hover:text-gray-300 focus:outline-none"
            >
              {siswa && siswa.foto ? (
                <img src={`/storage/fotos/${siswa.foto}`} alt="Profile" className="w-12 h-12 object-cover rounded-full mr-4" />
              ) : (
                <img src="/images/default-profile-picture.png" alt="Profile" className="w-12 h-12 object-cover rounded-full mr-4" />
              )}
              <span className="mr-2">{siswa ? siswa.nama : "Loading..."}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? "transform rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black border border-gray-300 rounded shadow-lg">
                <a href="/siswa/edit" className="block px-4 py-2 hover:bg-gray-100" onClick={closeDropdown}>
                  Profile
                </a>
                <a href={route("logout")} method="post" as="button" className="block px-4 py-2 hover:bg-gray-100 w-full text-left" onClick={closeDropdown}>
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu with Slide Animation */}
        <div
          className={`lg:hidden fixed inset-0 z-40 transition-transform duration-300 ease-in-out bg-purple-950 bg-opacity-90 ${menuOpen ? "transform translate-x-0" : "transform -translate-x-full"}`}
        >
          <div className="flex flex-col space-y-4 p-6">
            <Link href="/siswa/dashboard" className="text-white text-lg hover:text-gray-300" onClick={closeMenu}>
              Dashboard
            </Link>
            <Link href="/siswa/messages" className="text-white text-lg hover:text-gray-300" onClick={closeMenu}>
              Messages
            </Link>
            <Link href="/siswa/ulasan" className="text-white text-lg hover:text-gray-300" onClick={closeMenu}>
              Ulasan
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto p-6">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default StudentLayout;
