import React from 'react';
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
                        <div key={kursusItem.id} className="border p-4 rounded shadow">
                            <h2 className="text-xl font-semibold mb-2">{kursusItem.judul}</h2>
                            <p className="mb-2">{kursusItem.deskripsi}</p>
                            {kursusItem.gambar && (
                                <img src={`/storage/${kursusItem.gambar}`} alt={kursusItem.judul} className="w-full h-auto mb-2" />
                            )}
                            <Link href={`/kursus/${kursusItem.id}`} className="text-blue-500">Detail</Link>
                            <button
                                onClick={() => handleDelete(kursusItem.id)}
                                className="text-red-500 mt-2 inline-block"
                            >
                                Hapus
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </Authenticated>
    );
};

export default Index;
