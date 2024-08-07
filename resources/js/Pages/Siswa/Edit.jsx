import React from 'react';
import { useForm } from '@inertiajs/react';
import StudentLayout from '@/Layouts/StudentLayout';

const Edit = ({ siswa }) => {
    const { data, setData, put, errors } = useForm({
        nama: siswa.nama,
        email: siswa.email,
        jenis_kelamin: siswa.jenis_kelamin,
        tempat_lahir: siswa.tempat_lahir,
        tanggal_lahir: siswa.tanggal_lahir,
        alamat: siswa.alamat,
        no_telpon: siswa.no_telpon || '',
        kota: siswa.kota,
        no_wa: siswa.no_wa || '',
        instagram: siswa.instagram || '',
        nama_sekolah: siswa.nama_sekolah,
        alamat_sekolah: siswa.alamat_sekolah,
        kurikulum: siswa.kurikulum,
        nama_ayah: siswa.nama_ayah,
        pekerjaan_ayah: siswa.pekerjaan_ayah || '',
        no_telp_hp_ayah: siswa.no_telp_hp_ayah || '',
        no_wa_id_line_ayah: siswa.no_wa_id_line_ayah || '',
        email_ayah: siswa.email_ayah || '',
        nama_ibu: siswa.nama_ibu,
        pekerjaan_ibu: siswa.pekerjaan_ibu || '',
        no_telp_hp_ibu: siswa.no_telp_hp_ibu || '',
        no_wa_id_line_ibu: siswa.no_wa_id_line_ibu || '',
        email_ibu: siswa.email_ibu || '',
        id_program_bimbingan: siswa.id_program_bimbingan || '',
        foto: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('siswa.update'), {
            // Form data needs to be sent as FormData if you are uploading files
            data: {
                ...data,
                foto: data.foto,
            },
            // Add headers if needed
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    return (
        <StudentLayout siswa={siswa}>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
                
                {/* Section to view current data */}
                <div className="mb-8 p-4 bg-gray-100 rounded">
                    <h2 className="text-xl font-semibold mb-4">Current Data</h2>
                    <div className="space-y-2">
                        <div><strong>Nama:</strong> {siswa.nama}</div>
                        <div><strong>Email:</strong> {siswa.email}</div>
                        <div><strong>Jenis Kelamin:</strong> {siswa.jenis_kelamin}</div>
                        <div><strong>Tempat Lahir:</strong> {siswa.tempat_lahir}</div>
                        <div><strong>Tanggal Lahir:</strong> {siswa.tanggal_lahir}</div>
                        <div><strong>Alamat:</strong> {siswa.alamat}</div>
                        <div><strong>No Telepon:</strong> {siswa.no_telpon || '-'}</div>
                        <div><strong>Kota:</strong> {siswa.kota}</div>
                        <div><strong>No WA:</strong> {siswa.no_wa || '-'}</div>
                        <div><strong>Instagram:</strong> {siswa.instagram || '-'}</div>
                        <div><strong>Nama Sekolah:</strong> {siswa.nama_sekolah}</div>
                        <div><strong>Alamat Sekolah:</strong> {siswa.alamat_sekolah}</div>
                        <div><strong>Kurikulum:</strong> {siswa.kurikulum}</div>
                        <div><strong>Nama Ayah:</strong> {siswa.nama_ayah}</div>
                        <div><strong>Pekerjaan Ayah:</strong> {siswa.pekerjaan_ayah || '-'}</div>
                        <div><strong>No Telp HP Ayah:</strong> {siswa.no_telp_hp_ayah || '-'}</div>
                        <div><strong>No WA/ID Line Ayah:</strong> {siswa.no_wa_id_line_ayah || '-'}</div>
                        <div><strong>Email Ayah:</strong> {siswa.email_ayah || '-'}</div>
                        <div><strong>Nama Ibu:</strong> {siswa.nama_ibu}</div>
                        <div><strong>Pekerjaan Ibu:</strong> {siswa.pekerjaan_ibu || '-'}</div>
                        <div><strong>No Telp HP Ibu:</strong> {siswa.no_telp_hp_ibu || '-'}</div>
                        <div><strong>No WA/ID Line Ibu:</strong> {siswa.no_wa_id_line_ibu || '-'}</div>
                        <div><strong>Email Ibu:</strong> {siswa.email_ibu || '-'}</div>
                        <div><strong>Program Bimbingan:</strong> {siswa.id_program_bimbingan || '-'}</div>
                        <div>
                            <strong>Foto:</strong> 
                            {siswa.foto ? <img src={`/storage/${siswa.foto}`} alt="Profile" className="mt-2 w-32 h-32 object-cover rounded"/> : 'No photo'}
                        </div>
                    </div>
                </div>

                {/* Edit Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama</label>
                        <input
                            type="text"
                            name="nama"
                            value={data.nama}
                            onChange={(e) => setData('nama', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        {errors.nama && <div className="text-red-600">{errors.nama}</div>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        {errors.email && <div className="text-red-600">{errors.email}</div>}
                    </div>
                    {/* Add more fields similarly */}
                    <div>
                        <label htmlFor="foto" className="block text-sm font-medium text-gray-700">Foto</label>
                        <input
                            type="file"
                            name="foto"
                            onChange={(e) => setData('foto', e.target.files[0])}
                            className="mt-1 block w-full"
                        />
                        {errors.foto && <div className="text-red-600">{errors.foto}</div>}
                    </div>
                    <div>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
                    </div>
                </form>
            </div>
        </StudentLayout>
    );
};

export default Edit;
