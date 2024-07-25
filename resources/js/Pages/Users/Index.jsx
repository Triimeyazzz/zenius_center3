import { useState } from "react";
import { Link, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";

const UserForm = ({
    data,
    setData,
    handleSubmit,
    roles,
    processing,
    errors,
}) => (
    <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-6 rounded-lg shadow-md mb-6"
        encType="multipart/form-data" // Ensure this is added for file uploads
    >
        <h2 className="text-xl font-semibold mb-4">Create User</h2>

        {/* Profile Picture */}
        <div className="mb-4">
            {data.profile_picture && (
                <img
                src={`/storage/${data.profile_picture}`} // Adjust path as needed
                alt="Profile"
                className="w-12 h-12 object-cover rounded-full mr-4"
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
            onChange={(e) => setData("name", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        {errors.name && <div className="text-red-600 mb-4">{errors.name}</div>}

        <label className="block mb-2">Email:</label>
        <input
            type="email"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        {errors.email && (
            <div className="text-red-600 mb-4">{errors.email}</div>
        )}

        <label className="block mb-2">Password:</label>
        <input
            type="password"
            value={data.password}
            onChange={(e) => setData("password", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        {errors.password && (
            <div className="text-red-600 mb-4">{errors.password}</div>
        )}

        <label className="block mb-2">Confirm Password:</label>
        <input
            type="password"
            value={data.password_confirmation}
            onChange={(e) => setData("password_confirmation", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <label className="block mb-2">Phone:</label>
        <input
            type="text"
            value={data.nomor_hp}
            onChange={(e) => setData("nomor_hp", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <label className="block mb-2">Address:</label>
        <input
            type="text"
            value={data.alamat}
            onChange={(e) => setData("alamat", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <label className="block mb-2">Role:</label>
        <select
            value={data.role}
            onChange={(e) => setData("role", e.target.value)}
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
            Submit
        </button>
    </form>
);

const UserList = ({ users }) => (
    <ul>
        {users.length === 0 ? (
            <li className="text-gray-600">No users found.</li>
        ) : (
            users.map((user) => (
                <li
                    key={user.id}
                    className="bg-white p-4 rounded-lg shadow-md mb-4 hover:bg-gray-50 transition duration-300 flex items-center"
                >
                    {user.profile_picture && (
                        // Periksa dan pastikan path gambar benar
<img
    src={user.profile_picture ? `/storage/${user.profile_picture}` : "/default-profile-picture.png"} 
    alt="Profile" 
    className="w-12 h-12 object-cover rounded-full mr-4"
/>

                    )}
                    <Link
                        href={`/users/${user.id}/edit`}
                        className="text-lg font-medium text-purple-600 hover:underline"
                    >
                        {user.name}
                        <span className="text-gray-600 mx-2">Sebagai</span>
                        {user.role}
                    </Link>
                </li>
            ))
        )}
    </ul>
);

const Index = ({ users, roles, selectedRole, roleCounts }) => {
    const [roleFilter, setRoleFilter] = useState(selectedRole || "");
    const [searchQuery, setSearchQuery] = useState("");

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        nomor_hp: "",
        alamat: "",
        role: "siswa",
        profile_picture: null, // Ensure to handle file input
        showCreateForm: false,
    });

    const filteredUsers = users.filter(
        (user) =>
            (roleFilter === "" || user.role === roleFilter) &&
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission with file upload
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("password_confirmation", data.password_confirmation);
        formData.append("nomor_hp", data.nomor_hp);
        formData.append("alamat", data.alamat);
        formData.append("role", data.role);
        if (data.profile_picture) {
            formData.append("profile_picture", data.profile_picture);
        }
        Inertia.post("/users", formData, {
            forceFormData: true, // Ensure FormData is sent
            onSuccess: () => {
                // Optionally handle successful navigation or other actions
                Inertia.visit(route('users.index')); // Redirect to index page
            }
        });
    };
    
    return (
        <Authenticated
            auth={users.auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Users
                </h2>
            }
        >
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Users
                        </h1>
                        <button
                            onClick={() =>
                                setData({
                                    ...data,
                                    showCreateForm: !data.showCreateForm,
                                })
                            }
                            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition duration-300"
                        >
                            {data.showCreateForm ? "Cancel" : "Create User"}
                        </button>
                    </div>

                    {data.showCreateForm && (
                        <UserForm
                            data={data}
                            setData={setData}
                            handleSubmit={handleSubmit}
                            roles={roles}
                            processing={processing}
                            errors={errors}
                        />
                    )}

                    <div className="mb-6">
                        <label className="block mb-2">Filter by Role:</label>
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">All</option>
                            {roles.map((role) => (
                                <option key={role} value={role}>
                                    {role.charAt(0).toUpperCase() +
                                        role.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2">Search by Name:</label>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">
                            User Counts
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {roles.map((role) => (
                                <div
                                    key={role}
                                    className="bg-white shadow-lg rounded-lg p-6"
                                >
                                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                                        {role.charAt(0).toUpperCase() +
                                            role.slice(1)}
                                    </h3>
                                    <p className="text-3xl font-semibold text-indigo-600">
                                        {roleCounts[role] || 0}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <UserList users={filteredUsers} />
                </div>
            </div>
        </Authenticated>
    );
};

export default Index;
