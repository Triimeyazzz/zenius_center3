// resources/js/Layouts/StudentLayout.jsx
import React, { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { Helmet } from 'react-helmet'; // For adding metadata

const StudentLayout = ({ children, user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <div>
      <Helmet>
        <title>Student Dashboard - NewPrimagama Fatmawati</title>
        <meta name="description" content="Student Dashboard for NewPrimagama Fatmawati" />
        <link rel="shortcut icon" href="/images/Reverse.png" type="image/x-icon" />
      </Helmet>

      {/* Navbar */}
      <nav className="bg-gradient-to-r from-purple-950 to-blue-800 p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold pl-4">
            <Link href="/Home">
              <img src="/images/Logo White.png" className="h-11" alt="" />
            </Link>
          </div>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-white flex items-center hover:text-gray-300"
            >
              <span className="mr-2">
                {user ? user.name : 'Loading...'}
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${dropdownOpen ? 'transform rotate-180' : ''}`}
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
                <button
                  href={route("logout")}
                  method="post"
                  as="button"
                  className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                  onClick={closeDropdown}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; {new Date().getFullYear()} NewPrimagama Fatmawati. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default StudentLayout;
