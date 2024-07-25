import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const Index = ({ kursus }) => {

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus kursus ini?')) {
            fetch(`/kursus/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
            })
            .then(response => response.json())
            .then(() => {
                window.location.reload();
            })
            .catch(error => console.error('Error:', error));
        }
    };

    return (
        <Authenticated
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Kursus</h2>}
        >
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Daftar Kursus</h1>
                <Link href="/kursus/create" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Tambah Kursus</Link>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {kursus.map(kursusItem => (
                        <KursusItem key={kursusItem.id} kursusItem={kursusItem} handleDelete={handleDelete} />
                    ))}
                </div>
            </div>
        </Authenticated>
    );
};

const KursusItem = ({ kursusItem, handleDelete }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const MAX_DESCRIPTION_LENGTH = 100;

    return (
        <div className="border p-4 rounded shadow">
            {kursusItem.gambar && (
                <img src={`/storage/${kursusItem.gambar}`} alt={kursusItem.judul} className="w-full h-auto mb-2" />
            )}
            <h2 className="text-xl font-semibold mb-2">{kursusItem.judul}</h2>
            <p className="mb-2">
                {showFullDescription ? kursusItem.deskripsi : `${kursusItem.deskripsi.substring(0, MAX_DESCRIPTION_LENGTH)}...`}
            </p>
            {kursusItem.deskripsi.length > MAX_DESCRIPTION_LENGTH && (
                <button onClick={toggleDescription} className="text-blue-500">
                    {showFullDescription ? 'View Less' : 'View More'}
                </button>
            )}
            <Link href={`/kursus/${kursusItem.id}`} className="text-blue-500 block mt-2">Detail</Link>
            <button
                onClick={() => handleDelete(kursusItem.id)}
                className="text-red-500 mt-2 inline-block"
            >
                Hapus
            </button>
        </div>
    );
};

export default Index;
