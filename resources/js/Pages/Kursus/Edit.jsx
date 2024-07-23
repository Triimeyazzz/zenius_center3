// resources/js/Pages/Kursus/Edit.jsx
import React from 'react';
import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

const Edit = ({ kursus }) => {
    const { data, setData, put, processing, errors } = useForm({
        judul: kursus.judul,
        deskripsi: kursus.deskripsi,
        gambar: null,
    });

    const handleFileChange = (e) => {
        setData('gambar', e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/kursus/${kursus.id}`, { 
            onSuccess: () => setData({ judul: '', deskripsi: '', gambar: null }),
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Kursus</h1>
            <Link href="/kursus" className="text-blue-500 mb-4 inline-block">Kembali</Link>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">Judul</label>
                    <input
                        type="text"
                        value={data.judul}
                        onChange={(e) => setData('judul', e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    {errors.judul && <p className="text-red-500">{errors.judul}</p>}
                </div>
                <div>
                    <label className="block mb-2">Deskripsi</label>
                    <textarea
                        value={data.deskripsi}
                        onChange={(e) => setData('deskripsi', e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    {errors.deskripsi && <p className="text-red-500">{errors.deskripsi}</p>}
                </div>
                <div>
                    <label className="block mb-2">Gambar</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded"
                    />
                    {errors.gambar && <p className="text-red-500">{errors.gambar}</p>}
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
    );
};

export default Edit;
