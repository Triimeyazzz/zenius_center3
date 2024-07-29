
import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteConfirmationModal from "@/Components/DeleteConfirmationModal"; // Adjust the path as needed
import axios from "axios";

const kelasOptions = [
    '4SD', '5SD', '6SD', '7SMP', '8SMP', '9SMP', '10SMA', '11SMA', '12SMA', 'Persiapan UTBK'
];

export default function Index({
    siswa = [],
    programBimbingans = [],
    dataBimbingan = [],
    auth,
}) {
    const [selectedKelas, setSelectedKelas] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(() => {
        console.log('Siswa:', siswa);
        console.log('Program Bimbingans:', programBimbingans);
        console.log('Data Bimbingan:', dataBimbingan);
    }, [siswa, programBimbingans, dataBimbingan]);

    const handleFilterChange = (event) => {
        setSelectedKelas(event.target.value);
        window.location.href = `/data_bimbingan?kelas=${event.target.value}`;
    };

    const openDeleteModal = (item) => {
        setItemToDelete(item);
        setIsModalOpen(true);
    };

    const handleDelete = () => {
        axios.delete(`/databimbingan/${itemToDelete.id}`)
            .then(response => {
                if (response.status === 200) {
                    window.location.reload();
                }
            })
            .catch(error => {
                console.error('There was an error deleting the item:', error);
                alert('Gagal menghapus data. Cek console untuk detail.');
            })
            .finally(() => {
                closeDeleteModal();
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
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Tambah Data Bimbingan
                                </a>
                                <div className="ml-4">
                                    <select
                                        value={selectedKelas}
                                        onChange={handleFilterChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    >
                                        <option value="">Semua Kelas</option>
                                        {kelasOptions.map((kelas) => (
                                            <option key={kelas} value={kelas}>
                                                {kelas}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                ID
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Siswa
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Program Bimbingan
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Kelas
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Mulai Bimbingan
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Jam Bimbingan
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Hari Bimbingan
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                                                const siswaName =
                                                    siswa.find(
                                                        (s) =>
                                                            s.id ===
                                                            item.id_siswa
                                                    )?.nama || "Unknown";
                                                const programBimbinganName =
                                                    programBimbingans.find(
                                                        (p) =>
                                                            p.id ===
                                                            item.id_program_bimbingan
                                                    )?.nama || "Unknown";
                                                console.log('Finding program:', item.id_program_bimbingan, programBimbingans);
                                                return (
                                                    <tr key={item.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {item.id}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {siswaName}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {programBimbinganName}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {item.kelas}
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
                                                            <a href={`/data_bimbingan/${item.id}/edit`} className="text-blue-600 hover:text-blue-900">
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
