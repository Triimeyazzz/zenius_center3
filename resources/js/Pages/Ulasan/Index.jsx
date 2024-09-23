import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ ulasan, auth }){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUlasanId, setSelectedUlasanId] = useState(null);

  const handleDelete = (id) => {
    Inertia.delete(route('ulasan.destroy', id), {
      onSuccess: () => {
        // Optionally, you could add a success message here if needed
        closeModal(); // Close the modal after deletion
      },
      onError: () => {
        // Handle any errors if needed
        closeModal(); // Close the modal on error as well
      }
    });
  };

  const openModal = (id) => {
    setSelectedUlasanId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUlasanId(null);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Ulasan</h2>}
    >
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-center text-purple-600">Manajemen Ulasan</h1>
        <a href="ulasan/create" className="mb-6 inline-block px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 transition duration-300">
          Tambah Ulasan
        </a>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ulasan.map((item) => {
            const [isExpanded, setIsExpanded] = useState(false);

            const toggleExpand = () => {
              setIsExpanded(!isExpanded);
            };

            return (
              <div key={item.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  {item.foto_profile ? (
                    <img
                      src={`/storage/${item.foto_profile}`}
                      alt={`${item.nama_pemberi_ulasan || item.siswa?.name} Profile`}
                      className="w-12 h-12 rounded-full mr-4 border-2 border-yellow-400"
                    />
                  ) : item.siswa?.foto ? (
                    <img
                      src={`/storage/fotos/${item.siswa.foto}`}
                      alt={`${item.siswa.nama} Profile`}
                      className="w-12 h-12 rounded-full mr-4 border-2 border-yellow-400"
                    />
                  ) : null}
                  <div>
                    <h2 className="font-bold text-lg text-purple-800">
                      {item.nama_pemberi_ulasan || item.siswa?.name}
                    </h2>
                    <p className="text-sm text-gray-600">{item.tipe_pemberi_ulasan}</p>
                  </div>
                </div>
                <div className="mb-4">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`text-2xl ${index < item.penilaian ? 'text-yellow-500' : 'text-gray-300'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="mb-4 text-gray-700">
                  {isExpanded ? item.komentar : item.komentar.length > 100 ? `${item.komentar.substring(0, 100)}...` : item.komentar}
                  {item.komentar.length > 100 && (
                    <button
                      onClick={toggleExpand}
                      className="text-purple-600 hover:text-purple-700 transition duration-300 ml-1"
                      aria-label={isExpanded ? 'Collapse comment' : 'Expand comment'}
                    >
                      {isExpanded ? 'Lihat Lebih Sedikit' : 'Lihat Selengkapnya'}
                    </button>
                  )}
                </p>
                <div className="flex justify-end">

                  {/* Hapus Button */}
                  <button
                    onClick={() => openModal(item.id)}
                    className="rounded-md px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition duration-300"
                    aria-label="Delete review"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
            <p>Apakah Anda yakin ingin menghapus ulasan ini?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(selectedUlasanId)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  );
};
