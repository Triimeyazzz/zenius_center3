import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteConfirmationModal from "@/Components/DeleteConfirmationModal";
import { CSVLink } from "react-csv";
import { Link } from "@inertiajs/react";
import { Search, Download, Edit, Eye, Trash2, Plus } from "lucide-react";

export default function Index({ siswa = [], auth }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSiswaId, setSelectedSiswaId] = useState(null);
  const [search, setSearch] = useState("");
  const [kelasFilter, setKelasFilter] = useState("");

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
    const matchesSearch =
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase());
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
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Daftar Siswa</h1>
              <Link
                href={route("adminsiswa.create")}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring focus:ring-indigo-300 disabled:opacity-25 transition"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Siswa
              </Link>
            </div>

            <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Cari siswa..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <select
                  value={kelasFilter}
                  onChange={handleKelasFilterChange}
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
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
              </div>
              <div className="bg-indigo-100 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-indigo-800">Total Siswa</h3>
                  <p className="text-3xl font-bold text-indigo-600">{filteredSiswa.length}</p>
                </div>
                <CSVLink
                  data={generateCSVData()}
                  filename={"siswa-data.csv"}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring focus:ring-indigo-300 disabled:opacity-25 transition"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download CSV
                </CSVLink>
              </div>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
              <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
                <thead>
                  <tr className="text-left">
                    <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">Foto</th>
                    <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">QR</th>
                    <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">Nama</th>
                    <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">Kelas</th>
                    <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">Email</th>
                    <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">Tgl. Lahir</th>
                    <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSiswa.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="border-t px-6 py-4 text-center text-gray-500">
                        No Data Available
                      </td>
                    </tr>
                  ) : (
                    filteredSiswa.map((item, index) => (
                      <tr key={item.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <td className="border-t px-6 py-4">
                          <img
                            src={`/storage/fotos/${item.foto}`}
                            alt={item.nama}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            <Link href={route('adminsiswa.cetakqr', item.id)} className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-sm hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 transition duration-150 ease-in-out">Cetak Qr</Link>
                                        </td>
                        <td className="border-t px-6 py-4">{item.nama}</td>
                        <td className="border-t px-6 py-4">{item.kelas}</td>
                        <td className="border-t px-6 py-4">{item.email}</td>
                        <td className="border-t px-6 py-4">{item.tanggal_lahir}</td>
                        <td className="border-t px-6 py-4">
                          <div className="flex space-x-2">
                            <Link
                              href={route("adminsiswa.edit", item.id)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit className="w-5 h-5" />
                            </Link>
                            <Link
                              href={route("adminsiswa.show", item.id)}
                              className="text-green-600 hover:text-green-900"
                            >
                              <Eye className="w-5 h-5" />
                            </Link>
                            <button
                              onClick={() => openModal(item.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
      />
    </AuthenticatedLayout>
  );
}