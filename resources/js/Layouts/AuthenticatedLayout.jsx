import { useState } from "react";
import { Link } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Helmet } from "react-helmet";
import Draggable from 'react-draggable';
import { MdDashboard, MdAdminPanelSettings, MdPayments, MdOutlineReviews } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { PiStudent } from "react-icons/pi";
import { FaBookBookmark } from "react-icons/fa6";
import { FaRegAddressBook } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";

export default function Authenticated({ user, header, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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

            <Draggable>
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

            <nav
                className={`bg-white h-screen shadow-lg transform transition-transform duration-500 ease-in-out fixed top-0 left-0 z-30 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 ${sidebarCollapsed ? "w-20" : "w-64"} `}
            >
                <div className="flex items-center justify-between h-16 border-b border-gray-200 bg-gray-100 px-4">
                    <Link href="/">
                        <img
                            src="/images/Logo color.png"
                            alt="logo"
                            className={`h-10 w-auto transition-transform duration-500 hover:scale-110 ${
                                sidebarCollapsed ? "hidden" : ""
                            }`}
                        />
                    </Link>
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="hidden md:block p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300"
                    >
                        {sidebarCollapsed ? (
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
                        ) : (
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
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        )}
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className="border-t border-gray-200">
                        <div className="px-4 py-6 flex items-center space-x-4 hover:bg-gray-50 transition-colors duration-300">
                            <img
                                src={`/storage/${user.profile_picture}`}
                                alt={user.nama}
                                className={`w-14 h-14 object-cover rounded-full border-2 border-gray-200 shadow-sm transition-transform duration-500 hover:scale-105 ${
                                    sidebarCollapsed ? "w-14 h-14" : ""
                                }`}
                            />
                            {!sidebarCollapsed && (
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md w-full">
                                            <button
                                                type="button"
                                                className="flex items-center w-full px-4 py-2 border border-transparent text-sm font-semibold rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition ease-in-out duration-300"
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
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
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
                            )}
                        </div>
                    </div>
                    <div className="py-6">
                        <ul className="space-y-2">
                            <li>
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                    className={`block px-6 py-3 rounded-lg text-gray-700 bg-gradient-to-r from-white to-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out ${
                                        sidebarCollapsed ? "text-center" : ""
                                    }`}
                                >
                                    <MdDashboard />
                                    {!sidebarCollapsed && (
                                        <span className="ml-3">Dashboard</span>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href={route("profile.edit")}
                                    active={route().current("profile.edit")}
                                    className={`block px-6 py-3 rounded-lg text-gray-700 bg-gradient-to-r from-white to-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out ${
                                        sidebarCollapsed ? "text-center" : ""
                                    }`}
                                >
                                    <ImProfile />
                                    {!sidebarCollapsed && (
                                        <span className="ml-3">Profile</span>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href={route("users.index")}
                                    active={route().current("users.index")}
                                    className={`block px-6 py-3 rounded-lg text-gray-700 bg-gradient-to-r from-white to-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out ${
                                        sidebarCollapsed ? "text-center" : ""
                                    }`}
                                >
                                    <MdAdminPanelSettings />
                                    {!sidebarCollapsed && (
                                        <span className="ml-3">Admin</span>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href={route("adminsiswa.index")}
                                    active={route().current("adminsiswa.index")}
                                    className={`block px-6 py-3 rounded-lg text-gray-700 bg-gradient-to-r from-white to-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out ${
                                        sidebarCollapsed ? "text-center" : ""
                                    }`}
                                >
                                    <PiStudent />
                                    {!sidebarCollapsed && (
                                        <span className="ml-3">Siswa</span>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href={route("tryout.index")}
                                    active={route().current("tryout.index")}
                                    className={`block px-6 py-3 rounded-lg text-gray-700 bg-gradient-to-r from-white to-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out ${
                                        sidebarCollapsed ? "text-center" : ""
                                    }`}
                                >
                                    <FaBookBookmark />
                                    {!sidebarCollapsed && (
                                        <span className="ml-3">Tryout</span>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href={route("pembayaran.index")}
                                    active={route().current("pembayaran.index")}
                                    className={`block px-6 py-3 rounded-lg text-gray-700 bg-gradient-to-r from-white to-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out ${
                                        sidebarCollapsed ? "text-center" : ""
                                    }`}
                                >
                                    <MdPayments />
                                    {!sidebarCollapsed && (
                                        <span className="ml-3">Pembayaran </span>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href={route("ulasan.index")}
                                    active={route().current("ulasan.index")}
                                    className={`block px-6 py-3 rounded-lg text-gray-700 bg-gradient-to-r from-white to-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out ${
                                        sidebarCollapsed ? "text-center" : ""
                                    }`}
                                >
                                    <MdOutlineReviews />
                                    {!sidebarCollapsed && (
                                        <span className="ml-3">Ulasan</span>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href={route("messages.index")}
                                    active={route().current("messages.index")}
                                    className={`block px-6 py-3 rounded-lg text-gray-700 bg-gradient-to-r from-white to-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out ${
                                        sidebarCollapsed ? "text-center" : ""
                                    }`}
                                >
                                    <AiFillMessage />
                                    {!sidebarCollapsed && (
                                        <span className="ml-3">Pesan</span>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href={route("absensi.index")}
                                    active={route().current("absensi.index")}
                                    className={`block px-6 py-3 rounded-lg text-gray-700 bg-gradient-to-r from-white to-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out ${
                                        sidebarCollapsed ? "text-center" : ""
                                    }`}
                                >
                                    <FaRegAddressBook />
                                    {!sidebarCollapsed && (
                                        <span className="ml-3">Absensi</span>
                                    )}
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div
                className={`flex-1 transition-all duration-500 ease-in-out ${
                    sidebarCollapsed ? "ml-20" : "ml-64"
                }`}
            >
                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main className="p-6 bg-gray-50 min-h-screen">
                    {children}
                </main>
            </div>
        </div>
    );
}
