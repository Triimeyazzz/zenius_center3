import { useState } from "react";
import { Link } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Helmet } from "react-helmet";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="flex bg-gray-100 min-h-screen">
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
            <nav className="bg-white w-64 h-screen border-r border-gray-200 flex flex-col fixed">
                <div className="flex items-center justify-center h-16 border-b border-gray-200">
                    <Link href="/">
                        <img
                            src="./images/Logo color.png"
                            alt="logo"
                            className="h-8 w-auto"
                        />
                    </Link>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className="border-t border-gray-200">
                        <div className="px-4 py-3">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md w-full">
                                        <button
                                            type="button"
                                            className="inline-flex items-center w-full px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-900 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            {user.name}
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
                                    className="block px-4 py-2 rounded-lg hover:bg-gray-200"
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href={route("profile.edit")}
                                    active={route().current("profile.edit")}
                                    className="block px-4 py-2 rounded-lg hover:bg-gray-200"
                                >
                                    Profile
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="flex-1 flex flex-col ml-64">
                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
}
