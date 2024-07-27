import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
const Create = (auth) => {
    const { data, setData, post, processing, errors } = useForm({
        nama_program: '',
        keuntungan: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/program-bimbingan');
    };

    return (
        <AuthenticatedLayout
            auth={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Program Bimbingan</h2>}
        >
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Tambah Program Bimbingan</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nama Program</label>
                    <input 
                        type="text" 
                        value={data.nama_program} 
                        onChange={(e) => setData('nama_program', e.target.value)} 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.nama_program && <p className="text-red-500 text-xs italic">{errors.nama_program}</p>}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Keuntungan</label>
                    <textarea 
                        value={data.keuntungan} 
                        onChange={(e) => setData('keuntungan', e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    ></textarea>
                    {errors.keuntungan && <p className="text-red-500 text-xs italic">{errors.keuntungan}</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button 
                        type="submit" 
                        disabled={processing} 
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {processing ? 'Menyimpan...' : 'Simpan'}
                    </button>
                </div>
            </form>
        </div>
        </AuthenticatedLayout>
    );
};

export default Create;
