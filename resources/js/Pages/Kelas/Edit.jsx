import React from 'react';
import { useForm } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const Edit = ({ kelas }) => {
    const { data, setData, put, processing, errors } = useForm({
        name: kelas.name,
        slug: kelas.slug,
        user_id: kelas.user_id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/kelas/${kelas.id}`);
    };

    return (
        <Authenticated header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Kelas</h2>}>
            <div className="container mx-auto p-4">
                <Head title="Edit Kelas" />
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2">Nama</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="block mb-2">Slug</label>
                        <input
                            type="text"
                            value={data.slug}
                            onChange={e => setData('slug', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        {errors.slug && <p className="text-red-500">{errors.slug}</p>}
                    </div>
                    <div>
                        <label className="block mb-2">User ID</label>
                        <input
                            type="text"
                            value={data.user_id}
                            onChange={e => setData('user_id', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        {errors.user_id && <p className="text-red-500">{errors.user_id}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        {processing ? 'Mengirim...' : 'Kirim'}
                    </button>
                </form>
            </div>
        </Authenticated>
    );
};

export default Edit;
