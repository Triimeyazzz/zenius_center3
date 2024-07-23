import React from "react";
import { useForm, usePage } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/AuthenticatedLayout";

const EditUser = ({ user, roles }) => {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
        password_confirmation: "",
        nomor_hp: user.nomor_hp || "",
        alamat: user.alamat || "",
        role: user.role || "siswa",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/users/${user.id}`);
    };

    return (
        <Authenticated
            auth={user.auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit User
                </h2>
            }
        >
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-gray-50 p-6 rounded-lg shadow-md mb-6"
                    >
                        <h2 className="text-xl font-semibold mb-4">
                            Edit User
                        </h2>
                        <label className="block mb-2">Name:</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        />
                        {errors.name && <div className="text-red-600 mb-4">{errors.name}</div>}

                        <label className="block mb-2">Email:</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        />
                        {errors.email && <div className="text-red-600 mb-4">{errors.email}</div>}

                        <label className="block mb-2">Password:</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        />
                        {errors.password && <div className="text-red-600 mb-4">{errors.password}</div>}

                        <label className="block mb-2">Confirm Password:</label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        />

                        <label className="block mb-2">Phone:</label>
                        <input
                            type="text"
                            value={data.nomor_hp}
                            onChange={(e) => setData('nomor_hp', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        />

                        <label className="block mb-2">Address:</label>
                        <input
                            type="text"
                            value={data.alamat}
                            onChange={(e) => setData('alamat', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        />

                        <label className="block mb-2">Role:</label>
                        <select
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        >
                            {roles.map(role => (
                                <option key={role} value={role}>
                                    {role.charAt(0).toUpperCase() + role.slice(1)}
                                </option>
                            ))}
                        </select>

                        <button 
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition duration-300"
                        >
                            Update
                        </button>
                        <div className="mt-4">
                            <a
                                href="/users"
                                className="text-purple-600 hover:text-purple-800 transition duration-300"
                            >
                                Back
                            </a>
                        </div>
                    </form>
                </div>
            </div>
            <footer className="bg-white border-t border-gray-200 shadow py-8 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-gray-500">
                    &copy; 2024 Admin Dashboard - Made with ❤️ by Zema
                </p>
            </footer>
        </Authenticated>
    );
};

export default EditUser;
