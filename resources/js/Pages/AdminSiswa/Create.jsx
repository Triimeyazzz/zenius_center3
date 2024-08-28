import React, { useState } from 'react';
import { useForm } from "@inertiajs/react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// ini yang baru pake export default function
export default function Create() {
    const { data, setData, post, errors } = useForm({
        nama: '',
        email: '',
        password: '',
        jenis_kelamin: 'Laki-laki',
        tempat_lahir: '',
        tanggal_lahir: '',
        alamat: '',
        kota: '',
        no_telpon: '',
        no_wa: '',
        instagram: '',
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
        foto: null,
        kelas: '',
        mulai_bimbingan: '',
        jam_bimbingan: '',
        hari_bimbingan: [], // Handle multiple selections
    });


    const [fotoPreview, setFotoPreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setData(name, files[0]);
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFotoPreview(reader.result);
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        } else if (type === 'checkbox') {
            if (e.target.checked) {
                setData(name, [...data[name], value]);
            } else {
                setData(name, data[name].filter(day => day !== value));
            }
        } else {
            setData(name, value);
        }
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        setIsSubmitting(true);
        try {
            post(route('adminsiswa.store'), {
                forceFormData: true,
                onSuccess: () => {
                    console.log('eror');
                    setIsSubmitting(false);
                    toast.success('Data berhasil disimpan!');
                },
                onError: () => {
                    setIsSubmitting(false);
                    Object.values(errors).forEach(error => {
                        toast.error(error);
                    });
                }
            });
        } catch (error) {
            console.error('Submit Error:', error); // Log unexpected errors
            toast.error('Terjadi kesalahan saat menyimpan data.');
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <div className="text-center mb-6">
                    <img src="/images/Reverse.png" alt="Logo" className="mx-auto mb-4 w-32 h-auto" />
                    <h1 className="text-2xl font-bold mb-4 text-indigo-600">Tambah Siswa</h1>
                </div>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    {/* Personal Information */}
                    <fieldset className="mb-6 border border-indigo-300 rounded-lg p-6 bg-purple-50">
                        <legend className="text-xl font-semibold mb-4 text-indigo-700">Informasi Pribadi</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { label: 'Nama', name: 'nama', type: 'text' },
                                { label: 'Email', name: 'email', type: 'email' },
                                { label: 'Password', name: 'password', type: 'password' },
                                { label: 'Tempat Lahir', name: 'tempat_lahir', type: 'text' },
                                { label: 'Tanggal Lahir', name: 'tanggal_lahir', type: 'date' },
                                { label: 'Jenis Kelamin', name: 'jenis_kelamin', type: 'select', options: ['Laki-laki', 'Perempuan'] },
                                { label: 'Alamat', name: 'alamat', type: 'text' },
                                { label: 'Kota', name: 'kota', type: 'text' },
                                { label: 'Instagram', name: 'instagram', type: 'text' },
                                { label: 'No Telepon', name: 'no_telpon', type: 'text' },
                                { label: 'No WA', name: 'no_wa', type: 'text' },
                                { label: 'Kelas', name: 'kelas', type: 'select', options: [
                                    'Kelas 4 SD',
                                    'Kelas 5 SD',
                                    'Kelas 6 SD',
                                    'Kelas 7 SMP',
                                    'Kelas 8 SMP',
                                    'Kelas 9 SMP',
                                    'Kelas 10 SMA',
                                    'Kelas 11 SMA',
                                    'Kelas 12 SMA',
                                    'Alumni SMA'
                                ]}
                            ].map(({ label, name, type, options }) => (
                                <div className="mb-4" key={name}>
                                    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                    {type === 'select' ? (
                                        <select
                                            id={`select-${name}`} // Unique ID
                                            name={name}
                                            value={data[name]}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="">Pilih {label}</option>
                                            {options.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            id={name}
                                            name={name}
                                            type={type}
                                            value={data[name] || ''}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    )}
                                    {errors[name] && <div className="text-red-600 text-sm mt-1">{errors[name]}</div>}
                                </div>
                            ))}
                        </div>
                    </fieldset>

                    {/* School Information */}
                    <fieldset className="mb-6 border border-indigo-300 rounded-lg p-6 bg-yellow-50">
                        <legend className="text-xl font-semibold mb-4 text-indigo-700">Informasi Sekolah</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { label: 'Nama Sekolah', name: 'nama_sekolah', type: 'text' },
                                { label: 'Alamat Sekolah', name: 'alamat_sekolah', type: 'text' },
                                { label: 'Kurikulum', name: 'kurikulum', type: 'text' }
                            ].map(({ label, name, type }) => (
                                <div className="mb-4" key={name}>
                                    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                    <input
                                        id={name}
                                        name={name}
                                        type={type}
                                        value={data[name] || ''}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    {errors[name] && <div className="text-red-600 text-sm mt-1">{errors[name]}</div>}
                                </div>
                            ))}
                        </div>
                    </fieldset>

                    {/* Parents' Information */}
                    <fieldset className="mb-6 border border-indigo-300 rounded-lg p-6 bg-indigo-50">
                        <legend className="text-xl font-semibold mb-4 text-indigo-700">Informasi Orang Tua</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { label: 'Nama Ayah', name: 'nama_ayah', type: 'text' },
                                { label: 'Pekerjaan Ayah', name: 'pekerjaan_ayah', type: 'text' },
                                { label: 'No. Telepon HP Ayah', name: 'no_telp_hp_ayah', type: 'text' },
                                { label: 'No. WA/ID LINE Ayah', name: 'no_wa_id_line_ayah', type: 'text' },
                                { label: 'Email Ayah', name: 'email_ayah', type: 'email' },
                                { label: 'Nama Ibu', name: 'nama_ibu', type: 'text' },
                                { label: 'Pekerjaan Ibu', name: 'pekerjaan_ibu', type: 'text' },
                                { label: 'No. Telepon HP Ibu', name: 'no_telp_hp_ibu', type: 'text' },
                                { label: 'No. WA/ID LINE Ibu', name: 'no_wa_id_line_ibu', type: 'text' },
                                { label: 'Email Ibu', name: 'email_ibu', type: 'email' }
                            ].map(({ label, name, type }) => (
                                <div className="mb-4" key={name}>
                                    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                    <input
                                        id={name}
                                        name={name}
                                        type={type}
                                        value={data[name] || ''}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    {errors[name] && <div className="text-red-600 text-sm mt-1">{errors[name]}</div>}
                                </div>
                            ))}
                        </div>
                    </fieldset>

                    {/* Bimbingan Information */}
                    <fieldset className="mb-6 border border-indigo-300 rounded-lg p-6 bg-gray-50">
                        <legend className="text-xl font-semibold mb-4 text-indigo-700">Informasi Bimbingan</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="mb-4">
                                <label htmlFor="mulai_bimbingan" className="block text-sm font-medium text-gray-700 mb-1">Mulai Bimbingan</label>
                                <input
                                    id="mulai_bimbingan"
                                    name="mulai_bimbingan"
                                    type="date"
                                    value={data.mulai_bimbingan}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                {errors.mulai_bimbingan && <div className="text-red-600 text-sm mt-1">{errors.mulai_bimbingan}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="jam_bimbingan" className="block text-sm font-medium text-gray-700 mb-1">Jam Bimbingan</label>
                                <input
                                    id="jam_bimbingan"
                                    name="jam_bimbingan"
                                    type="time"
                                    value={data.jam_bimbingan}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                {errors.jam_bimbingan && <div className="text-red-600 text-sm mt-1">{errors.jam_bimbingan}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="hari_bimbingan" className="block text-sm font-medium text-gray-700 mb-1">Hari Bimbingan</label>
                                <div>
                                    {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map(day => (
                                        <label key={day} className="inline-flex items-center mr-4">
                                            <input
                                                type="checkbox"
                                                name="hari_bimbingan"
                                                value={day}
                                                checked={data.hari_bimbingan.includes(day)}
                                                onChange={handleChange}
                                                className="form-checkbox"
                                            />
                                            <span className="ml-2">{day}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.hari_bimbingan && <div className="text-red-600 text-sm mt-1">{errors.hari_bimbingan}</div>}
                            </div>
                        </div>
                    </fieldset>


                    {/* Photo Upload */}
                    <fieldset className="mb-6 border border-indigo-300 rounded-lg p-6 bg-gray-50">
                        <legend className="text-xl font-semibold mb-4 text-indigo-700">Foto</legend>
                        <div className="mb-4">
                            <label htmlFor="foto" className="block text-sm font-medium text-gray-700 mb-1">Upload Foto</label>
                            <input
                                id="foto"
                                name="foto"
                                type="file"
                                onChange={handleChange}
                                className="w-full p-3 border border-indigo-300 rounded-md shadow-sm"
                            />
                            {fotoPreview && <img src={fotoPreview} alt="Preview" className="mt-4 w-32 h-auto" />}
                            {errors.foto && <div className="text-red-600 text-sm mt-1">{errors.foto}</div>}
                        </div>
                    </fieldset>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className={`px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </>
    );
}
