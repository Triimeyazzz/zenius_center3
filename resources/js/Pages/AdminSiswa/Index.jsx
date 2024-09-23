import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteConfirmationModal from "@/Components/DeleteConfirmationModal";
import { CSVLink } from "react-csv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/react";

export default function Index({siswa = [], auth}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSiswaId, setSelectedSiswaId] = useState(null);
    const [search, setSearch] = useState("");
    const [kelasFilter, setKelasFilter] = useState(""); // State untuk filter kelas

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
                closeModal();
            },
            onError: () => {
                alert("Gagal menghapus siswa. Cek console untuk detail.");
            },
        });
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleKelasFilterChange = (event) => {
        setKelasFilter(event.target.value);
    };

    const filteredSiswa = siswa.filter((item) => {
        const matchesSearch = item.nama.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase());
        const matchesKelas = kelasFilter === "" || item.kelas === kelasFilter;
        return matchesSearch && matchesKelas;
    });

    const generateCSVData = () => {
        return siswa.map((item) => ({
            ID: item.id,
            Nama: item.nama,
            Email: item.email,
            JenisKelamin: item.jenis_kelamin,
            Kelas: item.kelas,
            Email: item.email,
            TglLahir: item.tanggal_lahir,
            Alamat: item.alamat,
            NoTelp: item.no_telpon,
        }));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Daftar Siswa
                </h2>
            }
        >
            <div className="p-6 bg-white shadow-md sm:rounded-lg ">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Daftar Siswa</h1>
                    <a
                        href={route("adminsiswa.create")}
                        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Tambah Siswa
                    </a>
                </div>

                <div className="mb-4 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
    <div className="relative w-full sm:w-auto">
        <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Cari siswa..."
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-3 pl-10 transition duration-300 ease-in-out transform hover:scale-105"
        />
        <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M16.65 7a9 9 0 110-9 9 9 0 010 9z"></path>
        </svg>
    </div>
    <div className="relative w-full sm:w-auto">
        <select
            value={kelasFilter}
            onChange={handleKelasFilterChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-3 transition duration-300 ease-in-out transform hover:scale-105"
        >
            <option value="">Semua Kelas</option>
            <option value="Kelas 4 SD">Kelas 4 SD</option>
            <option value="Kelas 5 SD">Kelas 5 SD</option>
            <option value="Kelas 6 SD">Kelas 6 SD</option>
            <option value="Kelas 7 SMP">Kelas 7 SMP</option>
            <option value="Kelas 8 SMP">Kelas 8 SMP</option>
            <option value="Kelas 9 SMP">Kelas 9 SMP</option>
            <option value="Kelas 10 SMA">Kelas 10 SMA</option>
            <option value="Kelas 11 SMA">Kelas 11 SMA</option>
            <option value="Kelas 12 SMA">Kelas 12 SMA</option>
            <option value="Alumni SMA">Alumni SMA</option>
        </select>
        <svg
            className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
    </div>
</div>


                <div className="mb-4 p-4 bg-white border border-gray-200 shadow-md rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Total Siswa
                    </h3>
                    <p className="text-2xl font-bold text-gray-900">
                        {filteredSiswa.length}
                    </p>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <CSVLink
                        data={generateCSVData()}
                        filename={"siswa-data.csv"}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Download CSV
                    </CSVLink>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 bg-white border border-gray-200 shadow-md rounded-lg">
                        <thead className="bg-purple-600 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b border-gray-200">
                                    Foto
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b border-gray-200">
                                    QrCode
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b border-gray-200">
                                    Nama
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b border-gray-200">
                                    Kelas
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b border-gray-200">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b border-gray-200">
                                    Tgl. Lahir
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b border-gray-200">
                                    Alamat
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b border-gray-200">
                                    No. Telp
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b border-gray-200">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredSiswa.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="9"
                                        className="px-6 py-4 text-center text-sm text-gray-500"
                                    >
                                        No Data Available
                                    </td>
                                </tr>
                            ) : (
                                filteredSiswa.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className={`hover:bg-gray-50 transition duration-150 ${
                                            index % 2 === 0
                                                ? "bg-gray-50"
                                                : "bg-white"
                                        }`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img
                                                src={`/storage/${item.foto}`}
                                                alt={item.nama}
                                                className="mx-auto object-cover rounded-full border-2 border-gray-200"
                                                width={"100"}
                                                height={"100"}
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            <Link href={route('adminsiswa.cetakqr', item.id)} className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-sm hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 transition duration-150 ease-in-out">Cetak Qr</Link>
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
                                            {item.tanggal_lahir}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {item.alamat}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {item.no_telpon}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center space-x-4">
                                            <a
                                                href={route(
                                                    "adminsiswa.edit",
                                                    item.id
                                                )}
                                                className="text-purple-600 hover:text-purple-800 flex items-center"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 512 512"
                                                    className="w-5 h-5 fill-current transition-transform duration-150 ease-in-out transform hover:scale-110"
                                                >
                                                    <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" />
                                                </svg>
                                                <span className="sr-only">
                                                    Edit
                                                </span>
                                            </a>
                                            <a
                                                href={route(
                                                    "adminsiswa.show",
                                                    item.id
                                                )}
                                                className="text-purple-600 hover:text-purple-800 flex items-center"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 576 512"
                                                    className="w-5 h-5 fill-current transition-transform duration-150 ease-in-out transform hover:scale-110"
                                                >
                                                    <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                                                </svg>
                                                <span className="sr-only">
                                                    Show
                                                </span>
                                            </a>
                                            <button
                                                onClick={() =>
                                                    openModal(item.id)
                                                }
                                                className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-sm hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 transition duration-150 ease-in-out"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 448 512"
                                                    className="w-5 h-5 fill-current"
                                                >
                                                    <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                                </svg>
                                                <span className="sr-only">
                                                    Delete
                                                </span>
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

