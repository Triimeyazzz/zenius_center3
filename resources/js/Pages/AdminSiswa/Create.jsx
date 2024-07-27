import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

const Create = () => {
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

    Inertia.post(route('adminsiswa.store'), form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return (
    <div>
      <h1>Tambah Siswa</h1>
      <InertiaLink href={route('adminsiswa.index')} className="btn btn-secondary">Kembali</InertiaLink>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="nama">Nama</label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="jenis_kelamin">Jenis Kelamin</label>
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
        <div>
          <label htmlFor="tempat_lahir">Tempat Lahir</label>
          <input
            type="text"
            id="tempat_lahir"
            name="tempat_lahir"
            value={formData.tempat_lahir}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="tanggal_lahir">Tanggal Lahir</label>
          <input
            type="date"
            id="tanggal_lahir"
            name="tanggal_lahir"
            value={formData.tanggal_lahir}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="alamat">Alamat</label>
          <input
            type="text"
            id="alamat"
            name="alamat"
            value={formData.alamat}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="kota">Kota</label>
          <input
            type="text"
            id="kota"
            name="kota"
            value={formData.kota}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="nama_sekolah">Nama Sekolah</label>
          <input
            type="text"
            id="nama_sekolah"
            name="nama_sekolah"
            value={formData.nama_sekolah}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="alamat_sekolah">Alamat Sekolah</label>
          <input
            type="text"
            id="alamat_sekolah"
            name="alamat_sekolah"
            value={formData.alamat_sekolah}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="kurikulum">Kurikulum</label>
          <input
            type="text"
            id="kurikulum"
            name="kurikulum"
            value={formData.kurikulum}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="nama_ayah">Nama Ayah</label>
          <input
            type="text"
            id="nama_ayah"
            name="nama_ayah"
            value={formData.nama_ayah}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="nama_ibu">Nama Ibu</label>
          <input
            type="text"
            id="nama_ibu"
            name="nama_ibu"
            value={formData.nama_ibu}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="pekerjaan_ayah">Pekerjaan Ayah</label>
          <input
            type="text"
            id="pekerjaan_ayah"
            name="pekerjaan_ayah"
            value={formData.pekerjaan_ayah}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="no_telp_hp_ayah">No Telp HP Ayah</label>
          <input
            type="text"
            id="no_telp_hp_ayah"
            name="no_telp_hp_ayah"
            value={formData.no_telp_hp_ayah}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="no_wa_id_line_ayah">No WA/ID Line Ayah</label>
          <input
            type="text"
            id="no_wa_id_line_ayah"
            name="no_wa_id_line_ayah"
            value={formData.no_wa_id_line_ayah}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email_ayah">Email Ayah</label>
          <input
            type="email"
            id="email_ayah"
            name="email_ayah"
            value={formData.email_ayah}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="pekerjaan_ibu">Pekerjaan Ibu</label>
          <input
            type="text"
            id="pekerjaan_ibu"
            name="pekerjaan_ibu"
            value={formData.pekerjaan_ibu}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="no_telp_hp_ibu">No Telp HP Ibu</label>
          <input
            type="text"
            id="no_telp_hp_ibu"
            name="no_telp_hp_ibu"
            value={formData.no_telp_hp_ibu}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="no_wa_id_line_ibu">No WA/ID Line Ibu</label>
          <input
            type="text"
            id="no_wa_id_line_ibu"
            name="no_wa_id_line_ibu"
            value={formData.no_wa_id_line_ibu}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email_ibu">Email Ibu</label>
          <input
            type="email"
            id="email_ibu"
            name="email_ibu"
            value={formData.email_ibu}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="id_program_bimbingan">Program Bimbingan</label>
          <input
            type="text"
            id="id_program_bimbingan"
            name="id_program_bimbingan"
            value={formData.id_program_bimbingan}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="foto">Foto</label>
          <input
            type="file"
            id="foto"
            name="foto"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Simpan</button>
      </form>
    </div>
  );
};

export default Create;
