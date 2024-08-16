import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Edit({ dataBimbingan, siswas = [], programBimbingans = [] }) {
    const [form, setForm] = useState({
        id_siswa: dataBimbingan.id_siswa || '',
        id_program_bimbingan: dataBimbingan.id_program_bimbingan || '',
        kelas: dataBimbingan.kelas || '',
        mulai_bimbingan: dataBimbingan.mulai_bimbingan || '',
        jam_bimbingan: dataBimbingan.jam_bimbingan || '',
        hari_bimbingan: dataBimbingan.hari_bimbingan || [],
    });

    const [errors, setErrors] = useState({});

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
        // Form validation
        const newErrors = {};
        if (!form.id_siswa) newErrors.id_siswa = 'Siswa is required';
        if (!form.id_program_bimbingan) newErrors.id_program_bimbingan = 'Program Bimbingan is required';
        if (!form.kelas) newErrors.kelas = 'Kelas is required';
        if (!form.mulai_bimbingan) newErrors.mulai_bimbingan = 'Mulai Bimbingan is required';
        if (!form.jam_bimbingan) newErrors.jam_bimbingan = 'Jam Bimbingan is required';
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            Inertia.put(`/data_bimbingan/${dataBimbingan.id}`, form);
        }
    };

    const kelasOptions = [
        '4SD', '5SD', '6SD', '7SMP', '8SMP', '9SMP', 
        '10SMA', '11SMA', '12SMA', 'Persiapan UTBK'
    ];

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-semibold mb-6">Edit Data Bimbingan</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Siswa:</label>
                    <select
                        name="id_siswa"
                        value={form.id_siswa}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    >
                        <option value="">Pilih Siswa</option>
                        {siswas.map((siswa) => (
                            <option key={siswa.id} value={siswa.id}>
                                {siswa.nama}
                            </option>
                        ))}
                    </select>
                    {errors.id_siswa && <p className="text-red-500 text-sm mt-1">{errors.id_siswa}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Program Bimbingan:</label>
                    <select
                        name="id_program_bimbingan"
                        value={form.id_program_bimbingan}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    >
                        <option value="">Pilih Program Bimbingan</option>
                        {programBimbingans.map((program) => (
                            <option key={program.id} value={program.id}>
                                {program.nama}
                            </option>
                        ))}
                    </select>
                    {errors.id_program_bimbingan && <p className="text-red-500 text-sm mt-1">{errors.id_program_bimbingan}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Kelas:</label>
                    <select
                        name="kelas"
                        value={form.kelas}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    >
                        <option value="">Pilih Kelas</option>
                        {kelasOptions.map((kelas) => (
                            <option key={kelas} value={kelas}>
                                {kelas}
                            </option>
                        ))}
                    </select>
                    {errors.kelas && <p className="text-red-500 text-sm mt-1">{errors.kelas}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Mulai Bimbingan:</label>
                    <input
                        type="date"
                        name="mulai_bimbingan"
                        value={form.mulai_bimbingan}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                    {errors.mulai_bimbingan && <p className="text-red-500 text-sm mt-1">{errors.mulai_bimbingan}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Jam Bimbingan:</label>
                    <input
                        type="time"
                        name="jam_bimbingan"
                        value={form.jam_bimbingan}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                    {errors.jam_bimbingan && <p className="text-red-500 text-sm mt-1">{errors.jam_bimbingan}</p>}
                </div>
                <fieldset>
                    <legend className="block text-sm font-medium text-gray-700">Hari Bimbingan:</legend>
                    <div className="mt-2 space-y-2">
                        {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map((day) => (
                            <label key={day} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    value={day}
                                    checked={form.hari_bimbingan.includes(day)}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                />
                                <span className="text-gray-700">{day}</span>
                            </label>
                        ))}
                    </div>
                </fieldset>
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Simpan
                </button>
            </form>
        </div>
    );
}
