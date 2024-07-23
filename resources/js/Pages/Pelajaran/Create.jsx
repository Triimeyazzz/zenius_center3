// resources/js/Pages/Pelajaran/Create.jsx

import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/AuthenticatedLayout';

const Create = () => {
    const { data, setData, post, reset } = useForm({
        kursus_id: '',
        judul: '',
        deskripsi: '',
        url_video: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/pelajaran');
    };

    const handleFileChange = (e) => {
        setData('url_video', e.target.files[0]);
    };

    return (
        <Authenticated>
            <div className="p-8 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-6">Tambah Pelajaran</h1>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="judul">Judul</label>
                        <input
                            id="judul"
                            type="text"
                            value={data.judul}
                            onChange={(e) => setData('judul', e.target.value)}
                            placeholder="Masukkan judul"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="deskripsi">Deskripsi</label>
                        <textarea
                            id="deskripsi"
                            value={data.deskripsi}
                            onChange={(e) => setData('deskripsi', e.target.value)}
                            placeholder="Masukkan deskripsi"
                            rows="4"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="url_video">Video</label>
                        <input
                            id="url_video"
                            type="file"
                            onChange={handleFileChange}
                            className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm file:py-2 file:px-4 file:border file:border-transparent file:bg-blue-500 file:text-white file:cursor-pointer hover:file:bg-blue-600"
                        />
                    </div>
                    <div className="flex items-center justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
};

export default Create;
