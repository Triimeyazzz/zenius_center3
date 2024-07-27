import React from 'react';
import { useForm } from '@inertiajs/inertia-react';

export default function Create() {
    const { data, setData, post } = useForm({
        id_siswa: '',
        mata_pelajaran: '',
        skor: '',
        tanggal_pelaksanaan: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/try-out');
    };

    return (
        <div>
            <h1>Create Try Out</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="id_siswa">ID Siswa:</label>
                    <input
                        type="text"
                        name="id_siswa"
                        value={data.id_siswa}
                        onChange={(e) => setData('id_siswa', e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="mata_pelajaran">Mata Pelajaran:</label>
                    <input
                        type="text"
                        name="mata_pelajaran"
                        value={data.mata_pelajaran}
                        onChange={(e) => setData('mata_pelajaran', e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="skor">Skor:</label>
                    <input
                        type="number"
                        name="skor"
                        value={data.skor}
                        onChange={(e) => setData('skor', e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="tanggal_pelaksanaan">Tanggal Pelaksanaan:</label>
                    <input
                        type="date"
                        name="tanggal_pelaksanaan"
                        value={data.tanggal_pelaksanaan}
                        onChange={(e) => setData('tanggal_pelaksanaan', e.target.value)}
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}
