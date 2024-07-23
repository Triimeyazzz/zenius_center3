import React from 'react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

const Show = ({ kelas }) => {
    return (
        <Authenticated header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detail Kelas</h2>}>
            <div className="container mx-auto p-4">
                <Head title="Detail Kelas" />
                <div className="border p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">{kelas.name}</h2>
                    <p className="mb-2">Slug: {kelas.slug}</p>
                    <p className="mb-2">User ID: {kelas.user_id}</p>
                    <Link href={`/kelas/${kelas.id}/edit`} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</Link>
                </div>
            </div>
        </Authenticated>
    );
};

export default Show;
