import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import StudentLayout from '@/Layouts/StudentLayout';

const Index = ({ ulasan }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const openModal = (id) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedId(null);
  };

  const handleDelete = () => {
    if (selectedId) {
        console.log(selectedId); // Tambahkan ini untuk debug
        Inertia.delete(route('siswa.ulasan.destroy', selectedId));
        closeModal();
    }
};


  return (
    <StudentLayout>
      <h1 className="text-3xl font-bold mb-4">Ulasan Saya</h1>
      <a href="/siswa/ulasan/create" className="btn btn-primary mb-4">
        Tambah Ulasan
      </a>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ulasan.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow">
            <div className="mb-2">
              {[...Array(5)].map((_, index) => (
                <span key={index} className={`text-2xl ${index < item.penilaian ? 'text-yellow-400' : 'text-gray-300'}`}>
                  ★
                </span>
              ))}
            </div>
            <p className="mb-2">{item.komentar}</p>
            <div className="flex justify-end">
              <a href={route('siswa.ulasan.edit', item.id)} className="btn btn-sm btn-secondary mr-2">
                Edit
              </a>
              <button
                onClick={() => openModal(item.id)}
                className="btn btn-sm btn-danger"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Konfirmasi Hapus */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
          <div className="bg-white rounded-lg shadow-lg p-6 z-10">
            <h2 className="text-xl font-bold mb-4">Konfirmasi Hapus</h2>
            <p>Apakah Anda yakin ingin menghapus ulasan ini?</p>
            <div className="flex justify-end mt-4">
              <button onClick={closeModal} className="btn btn-sm btn-secondary mr-2">
                Batal
              </button>
              <button onClick={handleDelete} className="btn btn-sm btn-danger">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </StudentLayout>
  );
};

export default Index;
