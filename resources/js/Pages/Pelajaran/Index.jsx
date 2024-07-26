// resources/js/Pages/Pelajaran/Index.jsx

import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/AuthenticatedLayout';

const Index = ({ auth,pelajarans }) => {
    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Pelajaran</h2>}
        >
            <div className="p-8 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-6">Daftar Pelajaran</h1>
                <div className="mb-6">
                    <Link 
                        href="/pelajaran/create" 
                        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
                    >
                        Tambah Pelajaran
                    </Link>
                </div>
                <ul className="space-y-4">
                    {pelajarans.map(pelajaran => (
                        <li key={pelajaran.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold mb-2">{pelajaran.judul}</h2>
                            <p className="text-gray-700 mb-4">{pelajaran.deskripsi}</p>
                            {pelajaran.url_video && (
                                <div className="mb-4">
                                    <video 
                                        className="w-full rounded-lg border-2 border-gray-200" 
                                        controls
                                    >
                                        <source src={`/storage/${pelajaran.url_video}`} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            )}
                            <Link 
                                href={`/pelajaran/${pelajaran.id}/edit`} 
                                className="text-blue-500 hover:underline"
                            >
                                Edit
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </Authenticated>
    );
};

export default Index;
