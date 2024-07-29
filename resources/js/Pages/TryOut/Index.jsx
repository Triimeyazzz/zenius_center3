import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Index = () => {
    const { siswas, auth } = usePage().props;
    const [search, setSearch] = useState('');

    // Filter the list of students based on the search input
    const filteredSiswas = siswas.filter((siswa) =>
        siswa.nama.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Try Out</h2>
            }
        >
            <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Pilih Siswa</h1>
                
                {/* Search Bar */}
                <div className="mb-6">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari nama siswa..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Student List */}
                <ul className="space-y-4">
                    {filteredSiswas.length > 0 ? (
                        filteredSiswas.map((siswa) => (
                            <li key={siswa.id} className="flex items-center p-4 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50">
                                {/* Profile Picture */}
                                <img
                                    src={siswa.foto ? `/storage/${siswa.foto}` : '/images/default-avatar.png'}
                                    alt={`${siswa.nama}'s profile`}
                                    className="w-16 h-w-16 rounded-lg mr-4 object-cover"
                                    onError={(e) => e.target.src = '/images/default-avatar.png'}
                                />
                                <a
                                    href={`/try_out/${siswa.id}`}
                                    className="text-lg font-medium text-purple-600 hover:underline"
                                >
                                    {siswa.nama}
                                </a>
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-500">Tidak ada siswa yang ditemukan</li>
                    )}
                </ul>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
