import React from 'react';
import { useForm } from '@inertiajs/inertia-react';

const Edit = ({ user, roles }) => {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        nomor_hp: user.nomor_hp,
        alamat: user.alamat,
        role: user.role,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/users/${user.id}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit User</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2">Name:</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        {errors.name && <div className="text-red-600 mt-2">{errors.name}</div>}
                    </div>

                    <div>
                        <label className="block mb-2">Email:</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        {errors.email && <div className="text-red-600 mt-2">{errors.email}</div>}
                    </div>

                    <div>
                        <label className="block mb-2">Password:</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        {errors.password && <div className="text-red-600 mt-2">{errors.password}</div>}
                    </div>

                    <div>
                        <label className="block mb-2">Confirm Password:</label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block mb-2">Phone:</label>
                        <input
                            type="text"
                            value={data.nomor_hp}
                            onChange={(e) => setData('nomor_hp', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block mb-2">Address:</label>
                        <input
                            type="text"
                            value={data.alamat}
                            onChange={(e) => setData('alamat', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block mb-2">Role:</label>
                        <select
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            {roles.map(role => (
                                <option key={role} value={role}>
                                    {role.charAt(0).toUpperCase() + role.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button 
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition duration-300"
                    >
                        Update User
                    </button>
                </form>

                <div className="mt-6">
                    <Link 
                        href={`/users/${user.id}`}
                        className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow hover:bg-gray-700 transition duration-300"
                    >
                        Back to User Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Edit;
