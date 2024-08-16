import React from 'react';
import { useForm } from '@inertiajs/inertia-react';

const Edit = ({ programBimbingan }) => {
    const { data, setData, put, processing, errors } = useForm({
        nama_program: programBimbingan.nama_program,
        keuntungan: programBimbingan.keuntungan,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/program-bimbingan/${programBimbingan.id}`);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Program Bimbingan</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
                <a href="/program-bimbingan" className="inline-block mb-4 px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition duration-300">Kembali</a>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Nama Program</label>
                    <input 
                        type="text" 
                        value={data.nama_program} 
                        onChange={(e) => setData('nama_program', e.target.value)} 
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {errors.nama_program && <span className="text-red-500 text-sm">{errors.nama_program}</span>}
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Keuntungan</label>
                    <textarea 
                        value={data.keuntungan} 
                        onChange={(e) => setData('keuntungan', e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                    ></textarea>
                    {errors.keuntungan && <span className="text-red-500 text-sm">{errors.keuntungan}</span>}
                </div>
                <button 
                    type="submit" 
                    disabled={processing} 
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                >
                    {processing ? 'Simpan...' : 'Simpan'}
                </button>
            </form>
        </div>
    );
};

export default Edit;
