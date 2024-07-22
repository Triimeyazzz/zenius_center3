import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Index = ({ users }) => {
    return (
<AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>}
        >            <div className="max-w-7xl mx-auto py-10">
                <h1 className="text-2xl font-semibold mb-6">User List</h1>
                <Link href={route('users.create')} className="mb-4 inline-block px-4 py-2 bg-blue-600 text-white rounded">Create User</Link>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Nomor HP</th>
                            <th className="py-2 px-4 border-b">Alamat</th>
                            <th className="py-2 px-4 border-b">Role</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="py-2 px-4 border-b">{user.id}</td>
                                <td className="py-2 px-4 border-b">{user.name}</td>
                                <td className="py-2 px-4 border-b">{user.email}</td>
                                <td className="py-2 px-4 border-b">{user.nomor_hp}</td>
                                <td className="py-2 px-4 border-b">{user.alamat}</td>
                                <td className="py-2 px-4 border-b">{user.role}</td>
                                <td className="py-2 px-4 border-b">
                                    <Link href={route('users.edit', user.id)} className="px-4 py-2 bg-yellow-400 text-white rounded mr-2">Edit</Link>
                                    <button className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
