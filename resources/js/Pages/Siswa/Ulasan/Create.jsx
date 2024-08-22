import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import StudentLayout from '@/Layouts/StudentLayout';
const Create = () => {
  const { data, setData, post, errors, reset } = useForm({
    penilaian: '',
    komentar: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('siswa.ulasan.store'), {
      onSuccess: () => reset(),
    });
  };

  return (
    <StudentLayout>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Tambah Ulasan</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Penilaian</label>
            <select
              value={data.penilaian}
              onChange={(e) => setData('penilaian', e.target.value)}
              className="form-select mt-1 block w-full text-yellow-700"
            >
              <option value="" disabled>Pilih Penilaian</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value} className='text-yellow-700'>{value} ★</option>
              ))}
            </select>
            {errors.penilaian && <div className="text-red-500 mt-2">{errors.penilaian}</div>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Komentar</label>
            <textarea
              value={data.komentar}
              onChange={(e) => setData('komentar', e.target.value)}
              className="form-textarea mt-1 block w-full"
              rows="4"
              placeholder="Tulis komentar Anda"
            ></textarea>
            {errors.komentar && <div className="text-red-500 mt-2">{errors.komentar}</div>}
          </div>

          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary">
              Tambah Ulasan
            </button>
          </div>
        </form>
      </div>
    </StudentLayout>
  );
};

export default Create;
