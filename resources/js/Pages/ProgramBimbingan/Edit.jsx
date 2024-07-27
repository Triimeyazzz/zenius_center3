import React from 'react';
import { useForm } from '@inertiajs/inertia-react';

const Edit = ({ programBimbingan }) => {
    const { data, setData, put, processing, errors } = useForm({
        nama_program: programBimbingan.nama_program,
        keuntungan: programBimbingan.keuntungan,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/program-bimbingan/${programBimbingan.id}`);
    };

    return (
        <div>
            <h1>Edit Program Bimbingan</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nama Program</label>
                    <input 
                        type="text" 
                        value={data.nama_program} 
                        onChange={(e) => setData('nama_program', e.target.value)} 
                    />
                    {errors.nama_program && <span>{errors.nama_program}</span>}
                </div>
                <div>
                    <label>Keuntungan</label>
                    <textarea 
                        value={data.keuntungan} 
                        onChange={(e) => setData('keuntungan', e.target.value)}
                    ></textarea>
                    {errors.keuntungan && <span>{errors.keuntungan}</span>}
                </div>
                <button type="submit" disabled={processing}>Simpan</button>
            </form>
        </div>
    );
};

export default Edit;
