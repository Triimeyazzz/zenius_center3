import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import StudentLayout from '@/Layouts/StudentLayout';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        penilaian: 0,
        komentar: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('ulasan.store'));
    };

    // Function to get label, color, and emoticon based on rating
    const getRatingDetails = (rating) => {
        switch (rating) {
            case 1:
                return { label: 'Sangat Buruk (Mewakili emosi anda)', color: 'text-red-600', emoticon: '😠' };
            case 2:
                return { label: 'Buruk (Mewakili emosi anda)', color: 'text-orange-600', emoticon: '😕' };
            case 3:
                return { label: 'Cukup (Mewakili emosi anda)', color: 'text-yellow-500', emoticon: '😐' };
            case 4:
                return { label: 'Baik (Mewakili emosi anda)', color: 'text-green-500', emoticon: '😊' };
            case 5:
                return { label: 'Sangat Baik (Mewakili emosi anda)', color: 'text-teal-500', emoticon: '😁' };
            default:
                return { label: '', color: '', emoticon: '' };
        }
    };

    const { label, color, emoticon } = getRatingDetails(data.penilaian);

    return (
        <StudentLayout user={auth}>
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
                                    <div className="flex mb-2">
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
                                    <div className={`text-sm font-bold ${color}`}>
                                        <span className="mr-2">{emoticon}</span>
                                        {label}
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
                        </div>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}
