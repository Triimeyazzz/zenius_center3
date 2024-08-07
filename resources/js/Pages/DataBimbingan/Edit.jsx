
import React, { useState, useEffect } from 'react';
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
        <div>
            <h1>Edit Data Bimbingan</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Siswa:
                    <select
                        name="id_siswa"
                        value={form.id_siswa}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Pilih Siswa</option>
                        {siswas.map((siswa) => (
                            <option key={siswa.id} value={siswa.id}>
                                {siswa.nama}
                            </option>
                        ))}
                    </select>
                    {errors.id_siswa && <p className="error">{errors.id_siswa}</p>}
                </label>
                <label>
                    Program Bimbingan:
                    <select
                        name="id_program_bimbingan"
                        value={form.id_program_bimbingan}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Pilih Program Bimbingan</option>
                        {programBimbingans.map((program) => (
                            <option key={program.id} value={program.id}>
                                {program.nama}
                            </option>
                        ))}
                    </select>
                    {errors.id_program_bimbingan && <p className="error">{errors.id_program_bimbingan}</p>}
                </label>
                <label>
                    Kelas:
                    <select
                        name="kelas"
                        value={form.kelas}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Pilih Kelas</option>
                        {kelasOptions.map((kelas) => (
                            <option key={kelas} value={kelas}>
                                {kelas}
                            </option>
                        ))}
                    </select>
                    {errors.kelas && <p className="error">{errors.kelas}</p>}
                </label>
                <label>
                    Mulai Bimbingan:
                    <input type="date" name="mulai_bimbingan" value={form.mulai_bimbingan} onChange={handleChange} required />
                    {errors.mulai_bimbingan && <p className="error">{errors.mulai_bimbingan}</p>}
                </label>
                <label>
                    Jam Bimbingan:
                    <input type="time" name="jam_bimbingan" value={form.jam_bimbingan} onChange={handleChange} required />
                    {errors.jam_bimbingan && <p className="error">{errors.jam_bimbingan}</p>}
                </label>
                <fieldset>
                    <legend>Hari Bimbingan:</legend>
                    {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map((day) => (
                        <label key={day}>
                            <input
                                type="checkbox"
                                value={day}
                                checked={form.hari_bimbingan.includes(day)}
                                onChange={handleCheckboxChange}
                            />
                            {day}
                        </label>
                    ))}
                </fieldset>
                <button type="submit">Simpan</button>
            </form>
        </div>
    );
}
