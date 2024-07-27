import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Index = ({ siswa }) => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    jenis_kelamin: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    alamat: '',
    kota: '',
    nama_sekolah: '',
    alamat_sekolah: '',
    kurikulum: '',
    nama_ayah: '',
    nama_ibu: '',
    pekerjaan_ayah: '',
    no_telp_hp_ayah: '',
    no_wa_id_line_ayah: '',
    email_ayah: '',
    pekerjaan_ibu: '',
    no_telp_hp_ibu: '',
    no_wa_id_line_ibu: '',
    email_ibu: '',
    id_program_bimbingan: '',
    foto: null,
  });
  const [editingSiswa, setEditingSiswa] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    if (editingSiswa) {
      setFormData(editingSiswa);
    } else {
      setFormData({
        nama: '',
        email: '',
        password: '',
        jenis_kelamin: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        alamat: '',
        kota: '',
        nama_sekolah: '',
        alamat_sekolah: '',
        kurikulum: '',
        nama_ayah: '',
        nama_ibu: '',
        pekerjaan_ayah: '',
        no_telp_hp_ayah: '',
        no_wa_id_line_ayah: '',
        email_ayah: '',
        pekerjaan_ibu: '',
        no_telp_hp_ibu: '',
        no_wa_id_line_ibu: '',
        email_ibu: '',
        id_program_bimbingan: '',
        foto: null,
      });
    }
  }, [editingSiswa]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach(key => {
      form.append(key, formData[key]);
    });

    const url = editingSiswa ? route('adminsiswa.update', editingSiswa.id) : route('adminsiswa.store');
    const method = editingSiswa ? 'put' : 'post';

    Inertia[method](url, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(() => {
      setEditingSiswa(null);
      setIsFormVisible(false);
    });
  };

  const handleDelete = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus siswa ini?')) {
      Inertia.delete(route('adminsiswa.destroy', id));
    }
  };

  return (
    <AuthenticatedLayout
      auth={siswa.auth}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Siswa</h2>}
    >
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Daftar Siswa</h1>
        <button
          onClick={() => setIsFormVisible(prev => !prev)}
          className="btn btn-primary mb-4"
        >
          {isFormVisible ? 'Tutup Form' : 'Tambah Siswa'}
        </button>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-100 border-b">
              <tr>
                {['Foto', 'Nama', 'Email', 'Jenis Kelamin', 'Tempat Lahir', 'Tanggal Lahir', 'Alamat', 'Kota', 'Nama Sekolah', 'Kurikulum', 'Nama Ayah', 'Pekerjaan Ayah', 'No Telp Ayah', 'No WA Ayah', 'Email Ayah', 'Nama Ibu', 'Pekerjaan Ibu', 'No Telp Ibu', 'No WA Ibu', 'Email Ibu', 'Aksi'].map((header, index) => (
                  <th key={index} className="px-4 py-2 text-left">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {siswa.map((s) => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <img src={s.foto} alt={s.nama} className="w-12 h-12 object-cover rounded-full" />
                  </td>
                  {['nama', 'email', 'jenis_kelamin', 'tempat_lahir', 'tanggal_lahir', 'alamat', 'kota', 'nama_sekolah', 'kurikulum', 'nama_ayah', 'pekerjaan_ayah', 'no_telp_hp_ayah', 'no_wa_id_line_ayah', 'email_ayah', 'nama_ibu', 'pekerjaan_ibu', 'no_telp_hp_ibu', 'no_wa_id_line_ibu', 'email_ibu'].map((field, index) => (
                    <td key={index} className="px-4 py-2">{s[field]}</td>
                  ))}
                  <td className="px-4 py-2 flex space-x-2">
                    <a
                      href={route('adminsiswa.edit', s.id)}
                      className="btn btn-primary"
                    >
                      Edit
                    </a>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="btn btn-danger"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isFormVisible && (
          <div className="mt-6 p-6 bg-white border border-gray-300 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingSiswa ? 'Edit Siswa' : 'Tambah Siswa'}
            </h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="mb-4">
                  <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                    Nama
                  </label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    value={formData.nama || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="jenis_kelamin" className="block text-sm font-medium text-gray-700">
                    Jenis Kelamin
                  </label>
                  <select
            id="jenis_kelamin"
            name="jenis_kelamin"
            value={formData.jenis_kelamin}
            onChange={handleChange}
            required
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="tempat_lahir" className="block text-sm font-medium text-gray-700">
                    Tempat Lahir
                  </label>
                  <input
                    type="text"
                    id="tempat_lahir"
                    name="tempat_lahir"
                    value={formData.tempat_lahir || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="tanggal_lahir" className="block text-sm font-medium text-gray-700">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    id="tanggal_lahir"
                    name="tanggal_lahir"
                    value={formData.tanggal_lahir || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">
                    Alamat
                  </label>
                  <input
                    type="text"
                    id="alamat"
                    name="alamat"
                    value={formData.alamat || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="kota" className="block text-sm font-medium text-gray-700">
                    Kota
                  </label>
                  <input
                    type="text"
                    id="kota"
                    name="kota"
                    value={formData.kota || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="nama_sekolah" className="block text-sm font-medium text-gray-700">
                    Nama Sekolah
                  </label>
                  <input
                    type="text"
                    id="nama_sekolah"
                    name="nama_sekolah"
                    value={formData.nama_sekolah || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="alamat_sekolah" className="block text-sm font-medium text-gray-700">
                    Alamat Sekolah
                  </label>
                  <input
                    type="text"
                    id="alamat_sekolah"
                    name="alamat_sekolah"
                    value={formData.alamat_sekolah || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="kurikulum" className="block text-sm font-medium text-gray-700">
                    Kurikulum
                  </label>
                  <input
                    type="text"
                    id="kurikulum"
                    name="kurikulum"
                    value={formData.kurikulum || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="nama_ayah" className="block text-sm font-medium text-gray-700">
                    Nama Ayah
                  </label>
                  <input
                    type="text"
                    id="nama_ayah"
                    name="nama_ayah"
                    value={formData.nama_ayah || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="pekerjaan_ayah" className="block text-sm font-medium text-gray-700">
                    Pekerjaan Ayah
                  </label>
                  <input
                    type="text"
                    id="pekerjaan_ayah"
                    name="pekerjaan_ayah"
                    value={formData.pekerjaan_ayah || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="no_telp_hp_ayah" className="block text-sm font-medium text-gray-700">
                    No Telp HP Ayah
                  </label>
                  <input
                    type="text"
                    id="no_telp_hp_ayah"
                    name="no_telp_hp_ayah"
                    value={formData.no_telp_hp_ayah || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="no_wa_id_line_ayah" className="block text-sm font-medium text-gray-700">
                    No WA/ID/LINE Ayah
                  </label>
                  <input
                    type="text"
                    id="no_wa_id_line_ayah"
                    name="no_wa_id_line_ayah"
                    value={formData.no_wa_id_line_ayah || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email_ayah" className="block text-sm font-medium text-gray-700">
                    Email Ayah
                  </label>
                  <input
                    type="email"
                    id="email_ayah"
                    name="email_ayah"
                    value={formData.email_ayah || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="nama_ibu" className="block text-sm font-medium text-gray-700">
                    Nama Ibu
                  </label>
                  <input
                    type="text"
                    id="nama_ibu"
                    name="nama_ibu"
                    value={formData.nama_ibu || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="pekerjaan_ibu" className="block text-sm font-medium text-gray-700">
                    Pekerjaan Ibu
                  </label>
                  <input
                    type="text"
                    id="pekerjaan_ibu"
                    name="pekerjaan_ibu"
                    value={formData.pekerjaan_ibu || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="no_telp_hp_ibu" className="block text-sm font-medium text-gray-700">
                    No Telp HP Ibu
                  </label>
                  <input
                    type="text"
                    id="no_telp_hp_ibu"
                    name="no_telp_hp_ibu"
                    value={formData.no_telp_hp_ibu || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="no_wa_id_line_ibu" className="block text-sm font-medium text-gray-700">
                    No WA/ID/LINE Ibu
                  </label>
                  <input
                    type="text"
                    id="no_wa_id_line_ibu"
                    name="no_wa_id_line_ibu"
                    value={formData.no_wa_id_line_ibu || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email_ibu" className="block text-sm font-medium text-gray-700">
                    Email Ibu
                  </label>
                  <input
                    type="email"
                    id="email_ibu"
                    name="email_ibu"
                    value={formData.email_ibu || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="id_program_bimbingan" className="block text-sm font-medium text-gray-700">
                    ID Program Bimbingan
                  </label>
                  <input
                    type="text"
                    id="id_program_bimbingan"
                    name="id_program_bimbingan"
                    value={formData.id_program_bimbingan || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="foto" className="block text-sm font-medium text-gray-700">
                    Foto
                  </label>
                  <input
                    type="file"
                    id="foto"
                    name="foto"
                    onChange={handleChange}
                    className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-gray-50 hover:file:bg-gray-100"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
              >
                {editingSiswa ? 'Update Siswa' : 'Tambah Siswa'}
              </button>
            </form>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
};

export default Index;
