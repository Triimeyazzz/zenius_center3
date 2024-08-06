import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { Head } from '@inertiajs/inertia-react';

export default function Edit({ tryOut }) {
    const { data, setData, put } = useForm({
        id_siswa: tryOut.id_siswa,
        mata_pelajaran: tryOut.mata_pelajaran,
        skor: tryOut.skor,
        tanggal_pelaksanaan: tryOut.tanggal_pelaksanaan,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/try-out/${tryOut.id}`);
    };

    return (
        <div>
            <Head title="Edit Try Out" />
            <h1>Edit Try Out</h1>
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
                <button type="submit">Update</button>
            </form>
        </div>
    );
}
