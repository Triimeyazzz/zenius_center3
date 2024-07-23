import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const Create = ({ users }) => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        user_ids: [], // Ensure this is an array
    });

    // Handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        post('/kelas');
    };

    // Handle changes in the select box
    const handleSelectChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setData('user_ids', selectedOptions);
    };

    return (
        <Authenticated header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Kelas</h2>}>
            <div className="container mx-auto p-4">
                <Head title="Tambah Kelas" />
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2">Nama</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="block mb-2">Slug</label>
                        <input
                            type="text"
                            value={data.slug}
                            onChange={e => setData('slug', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        {errors.slug && <p className="text-red-500">{errors.slug}</p>}
                    </div>
                    <div>
                        <label className="block mb-2">Users</label>
                        <select
                            multiple
                            value={data.user_ids}
                            onChange={handleSelectChange}
                            className="w-full p-2 border rounded"
                        >
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        {errors.user_ids && <p className="text-red-500">{errors.user_ids}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        {processing ? 'Mengirim...' : 'Kirim'}
                    </button>
                </form>
            </div>
        </Authenticated>
    );
};

export default Create;
