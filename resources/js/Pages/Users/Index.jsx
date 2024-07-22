import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
const Index = ({ users, roles, selectedRole }) => {
    const [roleFilter, setRoleFilter] = useState(selectedRole || '');

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        nomor_hp: '',
        alamat: '',
        role: 'siswa',
    });

    const handleFilterChange = (e) => {
        setRoleFilter(e.target.value);
        window.location.href = `/users?role=${e.target.value}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/users');
    };

    return (
        <Authenticated
            auth={users.auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>}
            >
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Users</h1>
                    <button 
                        onClick={() => setData({...data, showCreateForm: !data.showCreateForm})}
                        className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition duration-300"
                    >
                        {data.showCreateForm ? 'Cancel' : 'Create User'}
                    </button>
                </div>

                {data.showCreateForm && (
                    <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-xl font-semibold mb-4">Create User</h2>
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
                            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition duration-300"
                        >
                            Submit
                        </button>
                    </form>
                )}

                <div className="mb-6">
                    <label className="block mb-2">Filter by Role:</label>
                    <select
                        value={roleFilter}
                        onChange={handleFilterChange}
                        className="p-2 border border-gray-300 rounded-md"
                    >
                        <option value="">All</option>
                        {roles.map(role => (
                            <option key={role} value={role}>
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <ul>
                    {users.length === 0 ? (
                        <li className="text-gray-600">No users found.</li>
                    ) : (
                        users.map(user => (
                            <li key={user.id} className="bg-white p-4 rounded-lg shadow-md mb-4 hover:bg-gray-50 transition duration-300">
                                <Link 
                                    href={`/users/${user.id}`} 
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
            </div>
        </div>
        </Authenticated>
    );
};

export default Index;
