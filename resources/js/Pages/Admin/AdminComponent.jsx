import { useState, useEffect } from "react";
import { usePage, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function AdminComponent() {
    const { admins, flash } = usePage().props;
    const { data, setData, post } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "admin"
    });

    const [isAdding, setIsAdding] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.store"), {
            onSuccess: () => {
                // Handle success message or redirect
                alert("Admin successfully created!");
            },
            onError: () => {
                // Handle error
                alert("Failed to create admin.");
            }
        });
    };

    useEffect(() => {
        if (flash && flash.success) {
            // Display success message
            alert(flash.success);
        }
    }, [flash]);

    console.log(flash); // Debugging line to check flash value

    return (
        <AuthenticatedLayout
            user={usePage().props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Management</h2>}
        >
            <div>
                <h1 className="text-2xl font-semibold mb-6">Admin Management</h1>
                <div className="mb-6">
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="bg-purple-500 text-white px-4 py-2 rounded-lg"
                    >
                        {isAdding ? "Cancel" : "Add Admin"}
                    </button>
                </div>

                {isAdding && (
                    <form onSubmit={submit} className="mb-6 bg-white p-6 border border-gray-200 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Add New Admin</h2>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <input
                                    type="password"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                                <select
                                    id="role"
                                    name="role"
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                    required
                                >
                                    <option value="admin">Admin</option>
                                    <option value="petugas">Petugas</option>
                                    <option value="siswa">Siswa</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="bg-purple-500 text-white px-4 py-2 rounded-lg"
                            >
                                Add Admin
                            </button>
                        </div>
                    </form>
                )}

                <div>
                    <h2 className="text-lg font-semibold mb-4">Admin List</h2>
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-100 border-b border-gray-200">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>

                            </tr>
                        </thead>
                        <tbody>
                            {admins.map((admin) => (
                                <tr key={admin.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{admin.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.user?.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.user?.email}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
