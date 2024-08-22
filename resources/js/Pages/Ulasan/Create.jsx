import React from 'react';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Create = ({ auth }) => {
  const { data, setData, post, processing, errors } = useForm({
    nama_pemberi_ulasan: '',
    tipe_pemberi_ulasan: '',
    foto_profile: null,
    penilaian: 0,
    komentar: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('ulasan.store'));
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold mb-8 text-center text-purple-600">Tambah Ulasan</h1>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg transition-transform transform ">
          <div className="mb-6">
            <label htmlFor="nama_pemberi_ulasan" className="block mb-2 text-sm font-medium text-gray-700">Nama Pemberi Ulasan</label>
            <input
              type="text"
              id="nama_pemberi_ulasan"
              value={data.nama_pemberi_ulasan}
              onChange={(e) => setData('nama_pemberi_ulasan', e.target.value)}
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 ${errors.nama_pemberi_ulasan ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Masukkan nama..."
            />
            {errors.nama_pemberi_ulasan && <div className="text-red-500 text-sm mt-1">{errors.nama_pemberi_ulasan}</div>}
          </div>

          <div className="mb-6">
            <label htmlFor="tipe_pemberi_ulasan" className="block mb-2 text-sm font-medium text-gray-700">Tipe Pemberi Ulasan</label>
            <select
              id="tipe_pemberi_ulasan"
              value={data.tipe_pemberi_ulasan}
              onChange={(e) => setData('tipe_pemberi_ulasan', e.target.value)}
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 ${errors.tipe_pemberi_ulasan ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Pilih Tipe</option>
              <option value="siswa">Siswa</option>
              <option value="alumni">Alumni</option>
              <option value="orang_tua">Orang Tua</option>
              <option value="lainnya">Lainnya</option>
            </select>
            {errors.tipe_pemberi_ulasan && <div className="text-red-500 text-sm mt-1">{errors.tipe_pemberi_ulasan}</div>}
          </div>

          <div className="mb-6">
            <label htmlFor="foto_profile" className="block mb-2 text-sm font-medium text-gray-700">Foto Profile</label>
            <input
              type="file"
              id="foto_profile"
              onChange={(e) => setData('foto_profile', e.target.files[0])}
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 ${errors.foto_profile ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.foto_profile && <div className="text-red-500 text-sm mt-1">{errors.foto_profile}</div>}
          </div>

          <div className="mb-6">
            <label htmlFor="penilaian" className="block mb-2 text-sm font-medium text-gray-700">Penilaian</label>
            <div className="flex space-x-2 cursor-pointer">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setData('penilaian', star)}
                  className={`text-3xl transition duration-200 ${star <= data.penilaian ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-500'}`}
                >
                  ★
                </button>
              ))}
            </div>
            {errors.penilaian && <div className="text-red-500 text-sm mt-1">{errors.penilaian}</div>}
          </div>

          <div className="mb-6">
            <label htmlFor="komentar" className="block mb-2 text-sm font-medium text-gray-700">Komentar</label>
            <textarea
              id="komentar"
              value={data.komentar}
              onChange={(e) => setData('komentar', e.target.value)}
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 ${errors.komentar ? 'border-red-500' : 'border-gray-300'}`}
              rows="4"
              placeholder="Tulis komentar di sini..."
            ></textarea>
            {errors.komentar && <div className="text-red-500 text-sm mt-1">{errors.komentar}</div>}
          </div>

          <div className="flex justify-end">
            <a href={route('ulasan.index')} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200 mr-2">
              Batal
            </a>
            <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200" disabled={processing}>
              Simpan
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
};

export default Create;
