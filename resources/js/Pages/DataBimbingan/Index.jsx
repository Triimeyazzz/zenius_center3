import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteConfirmationModal from "@/Components/DeleteConfirmationModal";

export default function Index({
    siswa = [],
    programBimbingan = [],
    dataBimbingan = [],
    auth,
    kelas_options = [],
}) {
    const [selectedKelas, setSelectedKelas] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [siswaNames, setSiswaNames] = useState({});

    useEffect(() => {
        console.log('Siswa:', siswa);
        console.log('Program Bimbingans:', programBimbingan);
        console.log('Data Bimbingan:', dataBimbingan);

        const siswaNamesMap = siswa.reduce((map, siswa) => {
            map[siswa.id] = siswa.nama;
            return map;
        }, {});
        setSiswaNames(siswaNamesMap);
    }, [siswa, programBimbingan, dataBimbingan]);

    const handleFilterChange = (event) => {
        setSelectedKelas(event.target.value);
        window.location.href = `/data_bimbingan?kelas=${event.target.value}`;
    };

    const openDeleteModal = (item) => {
        setItemToDelete(item);
        setIsModalOpen(true);
    };

    const handleDelete = () => {
        console.log(`Attempting to delete item with ID: ${itemToDelete.id}`);
        Inertia.delete(`/databimbingan/${itemToDelete.id}`, {
            onSuccess: () => {
                console.log('Item successfully deleted');
                closeDeleteModal();
            },
            onError: (errors) => {
                console.error('Error deleting item:', errors);
                alert("Gagal menghapus siswa. Cek console untuk detail.");
            }
        });
    };

    const closeDeleteModal = () => {
        setIsModalOpen(false);
        setItemToDelete(null);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Data Bimbingan
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h1 className="text-2xl font-bold mb-4">
                                Data Bimbingan
                            </h1>
                            <div className="mb-4 flex items-center">
                                <a
                                    href="/data_bimbingan/create"
                                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Tambah Data Bimbingan
                                </a>
                                <div className="ml-4">
                                    {/* Other content */}
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 bg-white border border-gray-200 shadow-md rounded-lg">
                            <thead className="bg-purple-600 text-white">
                                <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b border-gray-200">
                                                ID
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b border-gray-200">
                                                Siswa
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b border-gray-200">
                                                Mulai Bimbingan
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b border-gray-200">
                                                Jam Bimbingan
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b border-gray-200">
                                                Hari Bimbingan
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b border-gray-200">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {dataBimbingan.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan="8"
                                                    className="px-6 py-4 text-center text-sm text-gray-500"
                                                >
                                                    No Data Available
                                                </td>
                                            </tr>
                                        ) : (
                                            dataBimbingan.map((item) => {
                                                const siswaName = siswaNames[item.id_siswa] || "Unknown";
                                                return (
                                                    <tr key={item.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {item.id}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {siswaName}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {item.mulai_bimbingan}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {item.jam_bimbingan}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {Array.isArray(item.hari_bimbingan) ? item.hari_bimbingan.join(", ") : JSON.parse(item.hari_bimbingan).join(", ")}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <a href={`/data_bimbingan/${item.id}/edit`} className="text-purple-600 hover:text-purple-900">
                                                                Edit
                                                            </a>
                                                            <button 
                                                                onClick={() => openDeleteModal(item)}
                                                                className="text-red-600 hover:text-red-900 ml-4"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DeleteConfirmationModal
                isOpen={isModalOpen}
                onClose={closeDeleteModal}
                onConfirm={handleDelete}
            />
        </AuthenticatedLayout>
    );
}
