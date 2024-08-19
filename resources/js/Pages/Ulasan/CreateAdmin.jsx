// resources/js/Pages/Ulasan/CreateAdmin.jsx
import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function CreateAdmin({ auth, ulasans }) { // Receive ulasans as props
    const { data, setData, post, processing, errors } = useForm({
        penilaian: 0,
        komentar: '',
        photo: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('ulasan.storeAdmin'));
    };

    return (
        <AuthenticatedLayout user={auth}>
            <Head title="Buat Ulasan" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h1 className="text-2xl font-semibold mb-4">Buat Ulasan</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Penilaian (1-5 bintang)
                                    </label>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setData('penilaian', star)}
                                                className={`text-3xl ${
                                                    star <= data.penilaian ? 'text-yellow-400' : 'text-gray-300'
                                                }`}
                                            >
                                                ★
                                            </button>
                                        ))}
                                    </div>
                                    {errors.penilaian && <div className="text-red-500">{errors.penilaian}</div>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Komentar
                                    </label>
                                    <textarea
                                        value={data.komentar}
                                        onChange={(e) => setData('komentar', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        rows="4"
                                    ></textarea>
                                    {errors.komentar && <div className="text-red-500">{errors.komentar}</div>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Foto Profil (Opsional)
                                    </label>
                                    <input
                                        type="file"
                                        onChange={(e) => setData('photo', e.target.files[0])}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    {errors.photo && <div className="text-red-500">{errors.photo}</div>}
                                </div>
                                <div className="flex items-center justify-between">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Kirim Ulasan
                                    </button>
                                </div>
                            </form>

                            {/* Display All Ulasans */}
                            <div className="mt-8">
                                <h2 className="text-xl font-semibold mb-4">Semua Ulasan</h2>
                                <div className="space-y-4">
                                    {ulasans.map((ulasan) => (
                                        <div key={ulasan.id} className="bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200">
                                            <div className="flex items-center">
                                                {ulasan.photo && (
                                                    <img
                                                        src={`storage/${ulasan.photo}`}
                                                        alt={`${ulasan.siswa.nama}'s photo`}
                                                        className="w-12 h-12 rounded-full mr-4"
                                                    />
                                                )}
                                                <div>
                                                    <p className="text-lg font-bold">{ulasan.siswa.nama}</p>
                                                    <p className="text-sm text-gray-600">{ulasan.komentar}</p>
                                                    <div className="flex mt-2">
                                                        {[...Array(ulasan.penilaian)].map((_, i) => (
                                                            <span key={i} className="text-yellow-400 text-xl">★</span>
                                                        ))}
                                                        {[...Array(5 - ulasan.penilaian)].map((_, i) => (
                                                            <span key={i} className="text-gray-300 text-xl">★</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
