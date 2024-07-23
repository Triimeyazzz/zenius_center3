import React from 'react';
import { Link } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const Index = ({ kelas }) => {
    return (
        <Authenticated header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Kelas</h2>}>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Daftar Kelas</h1>
                <Link href="/kelas/create" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Tambah Kelas</Link>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {kelas.map(kelasItem => (
                        <div key={kelasItem.id} className="border p-4 rounded shadow">
                            <h2 className="text-xl font-semibold mb-2">{kelasItem.name}</h2>
                            <p className="mb-2">Slug: {kelasItem.slug}</p>
                            <Link href={`/kelas/${kelasItem.id}`} className="text-blue-500">Detail</Link>
                            <Link href={`/kelas/${kelasItem.id}/edit`} className="text-yellow-500 ml-2">Edit</Link>
                            <form
                                action={`/kelas/${kelasItem.id}`}
                                method="POST"
                                onSubmit={e => {
                                    e.preventDefault();
                                    if (confirm('Apakah Anda yakin ingin menghapus kelas ini?')) {
                                        e.target.submit();
                                    }
                                }}
                                className="inline"
                            >
                                @csrf
                                @method('DELETE')
                                <button type="submit" className="text-red-500 ml-2">Hapus</button>
                            </form>
                        </div>
                    ))}
                </div>
            </div>
        </Authenticated>
    );
};

export default Index;
