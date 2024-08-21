import { useState } from "react";
import { Link } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Helmet } from "react-helmet";
import Draggable from 'react-draggable';


export default function Authenticated({ user, header, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
            <Helmet>
                <title>NewPrimagama Fatmawati</title>
                <meta
                    name="description"
                    content="Bimble Terbaik di Indonesia"
                />
                <link
                    rel="shortcut icon"
                    href="/images/Reverse.png"
                    type="image/x-icon"
                />
            </Helmet>

            {/* Mobile Menu Button */}
            <Draggable >
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-4 md:hidden fixed top-4 left-4 z-50 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
                <svg
                    className="h-6 w-6 text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
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
            </Draggable>
            {/* Sidebar */}
            <nav
                className={`bg-white w-64 h-screen shadow-lg transform transition-transform duration-500 ease-in-out fixed top-0 left-0 z-30  ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0`}
            >
                <div className="flex items-center justify-center h-16 border-b border-gray-200 bg-gray-100">
                    <Link href="/">
                        <img
                            src="/images/Logo color.png"
                            alt="logo"
                            className="h-10 w-auto transition-transform duration-500 hover:scale-110"
                        />
                    </Link>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className="border-t border-gray-200">
                        <div className="px-4 py-6 flex items-center space-x-4 hover:bg-gray-50 transition-colors duration-300">
                            <img
                                src={`storage/${user.profile_picture}`}
                                alt={user.nama}
                                className="w-14 h-14 object-cover rounded-full border-2 border-gray-200 shadow-sm transition-transform duration-500 hover:scale-105"
                            />
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md w-full">
                                        <button
                                            type="button"
                                            className="flex items-center w-full px-4 py-2 border border-transparent text-sm font-semibold rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-300"
                                        >
                                            {user && user.name
                                                ? user.name
                                                : "Guest"}
                                            <svg
                                                className="ml-auto h-4 w-4 transform transition-transform duration-200"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route("profile.edit")}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="py-6">
                        <ul className="space-y-2">
                            <li>
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                    className="block px-6 py-3 rounded-lg text-gray-700 bg-gradient-to-r from-white to-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out"
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href={route("profile.edit")}
                                    active={route().current("profile.edit")}
                                    className="block px-6 py-3 rounded-lg text-gray-700 bg-gradient-to-r from-white to-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out"
                                >
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href={route("users.index")}
                                    active={route().current("users.index")}
                                    className="block px-6 py-3 rounded-lg text-gray-700 bg-gradient-to-r from-white to-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out"
                                >
                                    Admin
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href={route("adminsiswa.index")}
                                    active={route().current("adminsiswa.index")}
                                    className="block px-6 py-3 rounded-lg text-gray-700 bg-gradient-to-r from-white to-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out"
                                >
                                    Siswa
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href={route("tryout.index")}
                                    active={route().current("tryout.index")}
                                    className="block px-6 py-3 rounded-lg text-gray-700 bg-gradient-to-r from-white to-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out"
                                >
                                    Data Try Out
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href={route("absensi.index")}
                                    active={route().current("absensi.index")}
                                    className="block px-6 py-3 rounded-lg text-gray-700 bg-gradient-to-r from-white to-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out"
                                >
                                    Data absensi
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href={route("messages.index")}
                                    active={route().current("messages.index")}
                                    className="block px-6 py-3 rounded-lg text-gray-700 bg-gradient-to-r from-white to-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out"
                                >
                                    Pesan
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href={route("pembayaran.index")}
                                    active={route().current("pembayaran.index")}
                                    className="block px-6 py-3 rounded-lg text-gray-700 bg-gradient-to-r from-white to-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out"
                                >
                                    Pembayaran
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href={route("ulasan.createAdmin")}
                                    active={route().current(
                                        "ulasan.createAdmin"
                                    )}
                                    className="block px-6 py-3 rounded-lg text-gray-700 bg-gradient-to-r from-white to-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out"
                                >
                                    Ulasan
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Main content area */}
            <div
                className={`flex-1 flex flex-col transition-all duration-500 ease-in-out ${
                    sidebarOpen ? "ml-64" : "ml-0"
                } md:ml-64`}
            >
                {header && (
                    <header className="bg-white shadow-md sticky top-0 ">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                <main className="flex-1 overflow-y-auto p-8 bg-gradient-to-b from-white to-gray-50 rounded-tl-3xl shadow-inner">
                    {children}
                </main>
            </div>
        </div>
    );
}
