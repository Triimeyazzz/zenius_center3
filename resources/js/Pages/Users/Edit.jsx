import React from "react";
import { useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/AuthenticatedLayout";

const Edit = ({ user, roles, auth }) => {
    const { data, setData, put, delete: destroy, processing, errors } = useForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
        password_confirmation: "",
        nomor_hp: user.nomor_hp || "",
        alamat: user.alamat || "",
        role: user.role || "",
        profile_picture: null, // Add this to manage file input
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/users/${user.id}`, {
            data: data.profile_picture ? { ...data, profile_picture: data.profile_picture } : data
        });
    };

    const handleDelete = (e) => {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this user?")) {
            destroy(`/users/${user.id}`, {
                onSuccess: () => {
                    // Redirect or perform any other action on success
                    window.location.href = '/users'; // Redirect to users list or wherever appropriate
                },
            });
        }
    };
console.log(data)
    return (
        <Authenticated user={auth.user} header={<h2>Edit Page</h2>}>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-gray-50 p-6 rounded-lg shadow-md mb-6"
                        encType="multipart/form-data" // Add this attribute for file uploads
                    >
                        <h2 className="text-xl font-semibold mb-4">Edit User</h2>

                        {/* Profile Picture */}
                        <div className="mb-4">
                            {user.profile_picture && (
                                <img
                                    src={`/users/${user.id}/profile_pictures/${user.profile_picture}`}
                                    alt="Profile"
                                    className="w-24 h-24 object-cover rounded-full mb-2"
                                />
                            )}
                            <label className="block mb-2">Profile Picture:</label>
                            <input
                                type="file"
                                onChange={(e) => setData("profile_picture", e.target.files[0])}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

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
                            {roles.map((role) => (
                                <option key={role} value={role}>
                                    {role.charAt(0).toUpperCase() + role.slice(1)}
                                </option>
                            ))}
                        </select>

                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition duration-300"
                        >
                            Save Changes
                        </button>

                        <button
                            onClick={handleDelete}
                            className="ml-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition duration-300"
                        >
                            Delete User
                        </button>
                        <a href="/users" className="ml-4 px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow hover:bg-gray-700 transition duration-300">
                        Kembali
                        </a>
                    </form>
                </div>
            </div>
        </Authenticated>
    );
};

export default Edit;
