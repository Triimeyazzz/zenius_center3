import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteConfirmationModal from "@/Components/DeleteConfirmationModal";

const Index = ({ siswa = [], program_bimbingan = [], auth }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSiswaId, setSelectedSiswaId] = useState(null);
    const [search, setSearch] = useState("");

    const openModal = (id) => {
        setSelectedSiswaId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSiswaId(null);
    };

    const handleDelete = () => {
        Inertia.delete(`/adminsiswa/${selectedSiswaId}`, {
            onSuccess: () => {
                // Optionally add logic to refresh the data or handle success
                closeModal();
            },
            onError: () => {
                alert("Gagal menghapus siswa. Cek console untuk detail.");
            }
        });
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const filteredSiswa = siswa.filter(item => 
        item.nama.toLowerCase().includes(search.toLowerCase()) || 
        item.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Daftar Siswa
                </h2>
            }
        >
            <div className="p-6 bg-white shadow-md sm:rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Daftar Siswa</h1>
                    <a
                        href={route("adminsiswa.create")}
                        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Tambah Siswa
                    </a>
                </div>
                <div className="mb-4 flex items-center">
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Cari siswa..."
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
                <div className="mb-4 p-4 bg-white border border-gray-200 shadow-md rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Total Siswa
                    </h3>
                    <p className="text-2xl font-bold text-gray-900">
                        {siswa.length}
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Foto
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nama
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Kelas
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Program Bimbingan
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredSiswa.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-6 py-4 text-center text-sm text-gray-500"
                                    >
                                        No Data Available
                                    </td>
                                </tr>
                            ) : (
                                filteredSiswa.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-100"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img
                                                src={`storage/fotos/${item.foto}`}
                                                alt={item.nama}
                                                className="w-16 h-16 object-cover rounded-full border-2 border-gray-200"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {item.nama}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {item.kelas}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {item.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {
                                                program_bimbingan.find(
                                                    (p) =>
                                                        p.id ===
                                                        item.id_program_bimbingan
                                                )?.nama_program || 'N/A'
                                            }
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <a
                                                href={route("adminsiswa.edit", item.id)}
                                                className="text-purple-600 hover:text-purple-900 mr-4"
                                            >
                                                Edit
                                            </a>
                                            <a
                                                href={route("adminsiswa.show", item.id)}
                                                className="text-purple-600 hover:text-purple-900 mr-4"
                                            >
                                                Show
                                            </a>
                                            <button
                                                onClick={() => openModal(item.id)}
                                                className="btn btn-danger inline-block px-4 py-2 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                                            >
                                                Hapus
                                            </button>
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
