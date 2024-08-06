import React, { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import axios from 'axios';
import { useForm } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from './Modal';

const Index = ({ auth, programBimbingans }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [programToDelete, setProgramToDelete] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        nama_program: '',
        keuntungan: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/program-bimbingan', {
            onSuccess: () => {
                setIsFormVisible(false);
                setData({ nama_program: '', keuntungan: '' });
            }
        });
    };

    const openModal = (program) => {
        setProgramToDelete(program);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setProgramToDelete(null);
    };

    const handleDelete = () => {
        axios.delete(`/program-bimbingan/${programToDelete.id}`).then(() => {
            window.location.reload();
        });
        closeModal();
    };

    return (
        <AuthenticatedLayout 
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Program Bimbingan</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h1 className="text-2xl font-bold mb-4">Program Bimbingan</h1>
                            <button 
                                onClick={() => setIsFormVisible(!isFormVisible)} 
                                className="btn btn-primary mb-4 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                            >
                                {isFormVisible ? 'Tutup Formulir' : 'Tambah Program'}
                            </button>
                            {isFormVisible && (
                                <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mb-6">
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
                            )}
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border">
                                    <thead className="bg-gray-100 border-b">
                                        <tr>
                                            <th className="text-left py-3 px-4">Nama Program</th>
                                            <th className="text-left py-3 px-4">Keuntungan</th>
                                            <th className="text-left py-3 px-4">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {programBimbingans.map(program => (
                                            <tr key={program.id} className="border-b hover:bg-gray-50">
                                                <td className="py-3 px-4">{program.nama_program}</td>
                                                <td className="py-3 px-4">{program.keuntungan}</td>
                                                <td className="py-3 px-4">
                                                    <Link href={`/program-bimbingan/${program.id}/edit`} className="btn btn-warning mr-2 inline-block px-4 py-2 bg-yellow-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-500 hover:shadow-lg focus:bg-yellow-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-600 active:shadow-lg transition duration-150 ease-in-out">Edit</Link>
                                                    <button 
                                                        onClick={() => openModal(program)}
                                                        className="btn btn-danger inline-block px-4 py-2 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                                                    >
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleDelete}
            />
        </AuthenticatedLayout>
    );
};

export default Index;
