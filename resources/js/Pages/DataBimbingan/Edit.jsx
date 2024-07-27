import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Edit({ dataBimbingan }) {
    const [form, setForm] = useState({
        id_siswa: dataBimbingan.id_siswa,
        id_program_bimbingan: dataBimbingan.id_program_bimbingan,
        kelas: dataBimbingan.kelas,
        mulai_bimbingan: dataBimbingan.mulai_bimbingan,
        jam_bimbingan: dataBimbingan.jam_bimbingan,
        hari_bimbingan: dataBimbingan.hari_bimbingan,
    });

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
        Inertia.put(`/data_bimbingan/${dataBimbingan.id}`, form);
    };

    return (
        <div>
            <h1>Edit Data Bimbingan</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    ID Siswa:
                    <input type="text" name="id_siswa" value={form.id_siswa} onChange={handleChange} required />
                </label>
                <label>
                    ID Program Bimbingan:
                    <input type="text" name="id_program_bimbingan" value={form.id_program_bimbingan} onChange={handleChange} required />
                </label>
                <label>
                    Kelas:
                    <input type="text" name="kelas" value={form.kelas} onChange={handleChange} required />
                </label>
                <label>
                    Mulai Bimbingan:
                    <input type="date" name="mulai_bimbingan" value={form.mulai_bimbingan} onChange={handleChange} required />
                </label>
                <label>
                    Jam Bimbingan:
                    <input type="time" name="jam_bimbingan" value={form.jam_bimbingan} onChange={handleChange} required />
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
