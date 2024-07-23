// resources/js/Pages/Kursus/Show.jsx
import React from 'react';
import { Link } from '@inertiajs/react';

const Show = ({ kursus }) => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{kursus.judul}</h1>
            <p className="mb-4">{kursus.deskripsi}</p>
            {kursus.gambar && (
                <img src={`/storage/${kursus.gambar}`} alt={kursus.judul} className="w-full h-auto mb-4" />
            )}
            <Link href={`/kursus/${kursus.id}/edit`} className="bg-blue-500 text-white px-4 py-2 rounded">Edit Kursus</Link>
            <Link href="/kursus" className="text-blue-500 ml-4">Kembali</Link>
        </div>
    );
};

export default Show;
