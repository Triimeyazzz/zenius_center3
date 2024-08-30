import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { Helmet } from "react-helmet";
import Footer from "@/Components/Footer";

const StudentLayout = ({ children, siswa }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Student Dashboard - NewPrimagama Fatmawati</title>
        <meta name="description" content="Student Dashboard for NewPrimagama Fatmawati" />
        <link rel="shortcut icon" href="/images/Reverse.png" type="image/x-icon" />
      </Helmet>

      <nav className="bg-gradient-to-r from-purple-950 to-blue-800 p-4 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/Home" className="text-white text-lg font-bold flex items-center">
            <img src="/images/Logo White.png" className="h-11" alt="Logo" />
          </Link>

          <button onClick={toggleMenu} className="lg:hidden text-white flex items-center">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="hidden lg:flex space-x-4">
            <Link href="/siswa/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
            <Link href="/siswa/messages" className="text-white hover:text-gray-300">Messages</Link>
            <Link href="/siswa/ulasan" className="text-white hover:text-gray-300">Ulasan</Link>
          </div>

          <div className="relative">
  <button onClick={toggleDropdown} className="text-white flex items-center hover:text-gray-300">
    {siswa && siswa.foto ? (
      <img src={`/storage/fotos/${siswa.foto}`} alt="Profile" className="w-12 h-12 object-cover rounded-full mr-4" />
    ) : (
      <img src="/images/default-profile-picture.png" alt="Profile" className="w-12 h-12 object-cover rounded-full mr-4" />
    )}
    <span className="mr-2">{siswa ? siswa.nama : "Loading..."}</span>
    <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? "transform rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  {dropdownOpen && (
    <div className="absolute right-0 mt-2 w-48 bg-white text-black border border-gray-300 rounded shadow-lg">
      <Link href="/siswa/edit" className="block px-4 py-2 hover:bg-gray-100" onClick={closeDropdown}>
        Profile
      </Link>
      <Link href={route("logout")} method="post" as="button" className="block px-4 py-2 hover:bg-gray-100 w-full text-left" onClick={closeDropdown}>
        Logout
      </Link>
    </div>
  )}
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
