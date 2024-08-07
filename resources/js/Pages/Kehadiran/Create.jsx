import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ siswas }) {
    const { data, setData, post } = useForm({
        siswa_id: '',
        tanggal: '',
        status: '',
        keterangan: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/absensi');
    };

    return (
        <>
            <Head title="Create Absensi" />
            <h1>Create Absensi</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Siswa:</label>
                    <select
                        value={data.siswa_id}
                        onChange={(e) => setData('siswa_id', e.target.value)}
                    >
                        <option value="">Select Siswa</option>
                        {siswas.map(siswa => (
                            <option key={siswa.id} value={siswa.id}>{siswa.nama}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Tanggal:</label>
                    <input
                        type="date"
                        value={data.tanggal}
                        onChange={(e) => setData('tanggal', e.target.value)}
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <select
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                    >
                        <option value="">Select Status</option>
                        <option value="Hadir">Hadir</option>
                        <option value="Izin">Izin</option>
                        <option value="Sakit">Sakit</option>
                        <option value="Alfa">Alfa</option>
                    </select>
                </div>
                <div>
                    <label>Keterangan:</label>
                    <textarea
                        value={data.keterangan}
                        onChange={(e) => setData('keterangan', e.target.value)}
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </>
    );
}
