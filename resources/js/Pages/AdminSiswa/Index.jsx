
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteConfirmationModal from '@/Components/DeleteConfirmationModal'; // Import the modal component

const Index = ({ siswa, auth }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSiswaId, setSelectedSiswaId] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const searchQuery = params.get('search') || '';
        setSearch(searchQuery);
    }, []);

    const openModal = (id) => {
        setSelectedSiswaId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSiswaId(null);
    };

    const handleDelete = () => {
        axios.delete(`/adminsiswa/${selectedSiswaId}`)
            .then(response => {
                if (response.status === 200) {
                    window.location.reload();
                }
            })
            .catch(error => {
                console.error('There was an error deleting the student:', error);
                alert('Gagal menghapus siswa. Cek console untuk detail.');
            })
            .finally(() => {
                closeModal();
            });
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        window.location.href = `/adminsiswa?search=${event.target.value}`;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Daftar Siswa</h2>}
        >
            <div className="p-6 bg-white shadow-md sm:rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Daftar Siswa</h1>
                    <a href={route('adminsiswa.create')} className="btn btn-primary">Tambah Siswa</a>
                </div>
                <div className="mb-4 flex items-center">
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Search by name or email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program Bimbingan</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {siswa.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                        No Data Available
                                    </td>
                                </tr>
                            ) : (
                                siswa.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img src={`storage/${item.foto}`} alt={item.nama} className="w-16 h-16 object-cover rounded-full border-2 border-gray-200" />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.nama}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.program_bimbingan}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <a href={route('adminsiswa.edit', item.id)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</a>
                                            <button
                                                onClick={() => openModal(item.id)}
                                                className="btn btn-danger inline-block px-4 py-2 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                                            >
                                                Hapus
                                            </button>
                                            <a href={route('adminsiswa.show', item.id)} className="text-blue-600 hover:text-blue-900 ml-4">Show</a>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Render the modal */}
            <DeleteConfirmationModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleDelete}
            />
        </AuthenticatedLayout>
    );
};

export default Index;
