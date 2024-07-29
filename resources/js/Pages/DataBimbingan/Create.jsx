import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Create({ siswas, programBimbingans }) {
    const [form, setForm] = useState({
        id_siswa: '',
        id_program_bimbingan: '',
        kelas: '',
        mulai_bimbingan: '',
        jam_bimbingan: '',
        hari_bimbingan: [],
    });

    const [errors, setErrors] = useState({});

    const kelasOptions = [
        '4SD', '5SD', '6SD', '7SMP', '8SMP', '9SMP', 
        '10SMA', '11SMA', '12SMA', 'Persiapan UTBK'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setForm((prev) => {
            const hari_bimbingan = checked
                ? [...prev.hari_bimbingan, value]
                : prev.hari_bimbingan.filter((hari) => hari !== value);
            return { ...prev, hari_bimbingan };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/data_bimbingan', form, {
            onSuccess: () => {
                // Handle successful form submission
                setForm({
                    id_siswa: '',
                    id_program_bimbingan: '',
                    kelas: '',
                    mulai_bimbingan: '',
                    jam_bimbingan: '',
                    hari_bimbingan: [],
                });
                setErrors({});
            },
            onError: (errors) => {
                // Handle errors
                console.error('Form submission errors:', errors);
                setErrors(errors);
            },
        });
    };

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Tambah Data Bimbingan</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Siswa
                        <select
                            name="id_siswa"
                            value={form.id_siswa}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="">Pilih Siswa</option>
                            {siswas.map((siswa) => (
                                <option key={siswa.id} value={siswa.id}>
                                    {siswa.nama}
                                </option>
                            ))}
                        </select>
                        {errors.id_siswa && <p className="text-red-500 text-sm">{errors.id_siswa}</p>}
                    </label>
                    <label className="block text-sm font-medium text-gray-700">
                        Program Bimbingan
                        <select
                            name="id_program_bimbingan"
                            value={form.id_program_bimbingan}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="">Pilih Program Bimbingan</option>
                            {programBimbingans.map((program) => (
                                <option key={program.id} value={program.id}>
                                    {program.nama}
                                </option>
                            ))}
                        </select>
                        {errors.id_program_bimbingan && <p className="text-red-500 text-sm">{errors.id_program_bimbingan}</p>}
                    </label>
                    <label className="block text-sm font-medium text-gray-700">
                        Kelas
                        <select
                            name="kelas"
                            value={form.kelas}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="">Pilih Kelas</option>
                            {kelasOptions.map((kelas) => (
                                <option key={kelas} value={kelas}>
                                    {kelas}
                                </option>
                            ))}
                        </select>
                        {errors.kelas && <p className="text-red-500 text-sm">{errors.kelas}</p>}
                    </label>
                    <label className="block text-sm font-medium text-gray-700">
                        Mulai Bimbingan
                        <input
                            type="date"
                            name="mulai_bimbingan"
                            value={form.mulai_bimbingan}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.mulai_bimbingan && <p className="text-red-500 text-sm">{errors.mulai_bimbingan}</p>}
                    </label>
                    <label className="block text-sm font-medium text-gray-700">
                        Jam Bimbingan
                        <input
                            type="time"
                            name="jam_bimbingan"
                            value={form.jam_bimbingan}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.jam_bimbingan && <p className="text-red-500 text-sm">{errors.jam_bimbingan}</p>}
                    </label>
                </div>
                <fieldset className="space-y-2">
                    <legend className="text-sm font-medium text-gray-700">Hari Bimbingan</legend>
                    <div className="grid grid-cols-2 gap-4">
                        {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map((day) => (
                            <label key={day} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={day}
                                    checked={form.hari_bimbingan.includes(day)}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                {day}
                            </label>
                        ))}
                    </div>
                    {errors.hari_bimbingan && <p className="text-red-500 text-sm">{errors.hari_bimbingan}</p>}
                </fieldset>
                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Simpan
                </button>
            </form>
        </div>
    );
}
