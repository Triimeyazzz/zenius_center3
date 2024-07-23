import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/AuthenticatedLayout';

const Index = ({ pendaftarans }) => {
    return (
        <Authenticated>
            <div className="p-8 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-6">Daftar Pendaftaran</h1>
                <div className="mb-6">
                    <Link 
                        href="/pendaftaran/create" 
                        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
                    >
                        Tambah Pendaftaran
                    </Link>
                </div>
                <ul className="space-y-4">
                    {pendaftarans.map(pendaftaran => (
                        <li key={pendaftaran.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold mb-2">
                                {pendaftaran.user.name} - {pendaftaran.kursus.title}
                            </h2>
                            <p className="text-gray-700 mb-4">
                                Terdaftar pada: {new Date(pendaftaran.terdaftar_pada).toLocaleDateString()}
                            </p>
                            {pendaftaran.selesai_pada && (
                                <p className="text-gray-700 mb-4">
                                    Selesai pada: {new Date(pendaftaran.selesai_pada).toLocaleDateString()}
                                </p>
                            )}
                            <div className="flex space-x-4">
                                <Link 
                                    href={`/pendaftaran/${pendaftaran.id}/edit`} 
                                    className="text-blue-500 hover:underline"
                                >
                                    Edit
                                </Link>
                                <Link 
                                    href={`/pendaftaran/${pendaftaran.id}`} 
                                    method="delete" 
                                    as="button" 
                                    className="text-red-500 hover:underline"
                                >
                                    Delete
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Authenticated>
    );
};

export default Index;
