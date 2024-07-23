// resources/js/Pages/Pendaftaran/Edit.jsx

import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/AuthenticatedLayout';

const Edit = ({ pendaftaran }) => {
    const { data, setData, put, reset } = useForm({
        users_id: pendaftaran.users_id,
        kursus_id: pendaftaran.kursus_id,
        terdaftar_pada: pendaftaran.terdaftar_pada,
        selesai_pada: pendaftaran.selesai_pada,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/pendaftaran/${pendaftaran.id}`);
    };

    return (
        <Authenticated>
            <div className="p-8 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-6">Edit Pendaftaran</h1>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="users_id">User</label>
                        <input
                            id="users_id"
                            type="text"
                            value={data.users_id}
                            onChange={(e) => setData('users_id', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="kursus_id">Kursus</label>
                        <input
                            id="kursus_id"
                            type="text"
                            value={data.kursus_id}
                            onChange={(e) => setData('kursus_id', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="terdaftar_pada">Terdaftar Pada</label>
                        <input
                            id="terdaftar_pada"
                            type="date"
                            value={data.terdaftar_pada}
                            onChange={(e) => setData('terdaftar_pada', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="selesai_pada">Selesai Pada (Opsional)</label>
                        <input
                            id="selesai_pada"
                            type="date"
                            value={data.selesai_pada}
                            onChange={(e) => setData('selesai_pada', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="flex items-center justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
};

export default Edit;
