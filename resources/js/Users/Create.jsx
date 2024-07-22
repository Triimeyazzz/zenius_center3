import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import Layout from '@/Layouts/AuthenticatedLayout';

const Create = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        nomor_hp: '',
        alamat: '',
        role: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('users.store')); // Pastikan ini menggunakan metode POST
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto py-10">
                <h1 className="text-2xl font-semibold mb-6">Create User</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="w-full mt-2 p-2 border border-gray-300 rounded"
                        />
                        {errors.name && <div className="text-red-600">{errors.name}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            className="w-full mt-2 p-2 border border-gray-300 rounded"
                        />
                        {errors.email && <div className="text-red-600">{errors.email}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                            className="w-full mt-2 p-2 border border-gray-300 rounded"
                        />
                        {errors.password && <div className="text-red-600">{errors.password}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nomor HP</label>
                        <input
                            type="text"
                            value={data.nomor_hp}
                            onChange={e => setData('nomor_hp', e.target.value)}
                            className="w-full mt-2 p-2 border border-gray-300 rounded"
                        />
                        {errors.nomor_hp && <div className="text-red-600">{errors.nomor_hp}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Alamat</label>
                        <input
                            type="text"
                            value={data.alamat}
                            onChange={e => setData('alamat', e.target.value)}
                            className="w-full mt-2 p-2 border border-gray-300 rounded"
                        />
                        {errors.alamat && <div className="text-red-600">{errors.alamat}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Role</label>
                        <select
                            value={data.role}
                            onChange={e => setData('role', e.target.value)}
                            className="w-full mt-2 p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="petugas">Petugas</option>
                            <option value="siswa">Siswa</option>
                        </select>
                        {errors.role && <div className="text-red-600">{errors.role}</div>}
                    </div>
                    <div className="mb-4">
                        <button type="submit" disabled={processing} className="px-4 py-2 bg-blue-600 text-white rounded">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default Create;
