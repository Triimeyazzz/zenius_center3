import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Index = ({ siswas, auth }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSiswas = siswas.filter(siswa =>
        siswa.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Try Out</h2>}
        >
            <div className="p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Pilih Siswa</h1>

                {/* Search Bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Cari Siswa..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Student List */}
                {filteredSiswas.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {filteredSiswas.map(siswa => (
                            <li key={siswa.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg shadow-sm">
                                {/* Student Photo */}
                                <img
                                    src={`/storage/${siswa.foto}`}
                                    alt={siswa.nama}
                                    className="w-16 h-16 object-cover rounded-full"
                                />
                                {/* Student Name */}
                                <a href={route('tryout.progress', siswa.id)} className="text-lg font-medium text-purple-600 hover:underline">
                                    {siswa.nama}
                                </a>
                                <p className="text-gray-600 ">{siswa.kelas}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">Tidak ada siswa yang ditemukan.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
