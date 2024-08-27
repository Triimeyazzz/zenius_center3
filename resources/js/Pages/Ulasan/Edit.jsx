import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';
import Layout from '@/Layouts/AdminLayout';

const Edit = ({ ulasan }) => {
  const { data, setData, put, processing, errors } = useForm({
    nama_pemberi_ulasan: ulasan.nama_pemberi_ulasan || '',
    tipe_pemberi_ulasan: ulasan.tipe_pemberi_ulasan || '',
    foto_profile: null,
    penilaian: ulasan.penilaian || 0,
    komentar: ulasan.komentar || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('admin.ulasan.update', ulasan.id));
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Edit Ulasan</h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields similar to Create.jsx, but pre-filled with ulasan data */}
        {/* ... */}
        <div className="flex justify-end">
          <InertiaLink href={route('admin.ulasan.index')} className="btn btn-secondary mr-2">
            Batal
          </InertiaLink>
          <button type="submit" className="btn btn-primary" disabled={processing}>
            Perbarui
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Edit;