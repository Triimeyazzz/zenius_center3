import React from 'react';
import StudentLayout from '@/Layouts/StudentLayout';

const Index = ({ ulasan }) => {
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
              <a
                href={route('siswa.ulasan.destroy', item.id)}
                method="delete"
                as="button"
                className="btn btn-sm btn-danger"
              >
                Hapus
              </a>
            </div>
          </div>
        ))}
      </div>
    </StudentLayout>
  );
};

export default Index;