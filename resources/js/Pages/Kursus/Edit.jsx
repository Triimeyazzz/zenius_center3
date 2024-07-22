import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';

const Edit = ({ kursus }) => {
    const { data, setData, put, processing, errors } = useForm({
        judul: kursus.judul,
        deskripsi: kursus.deskripsi,
        gambar: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/kursus/${kursus.id}`);
    };

    return (
        <div>
            <h1>Edit Kursus</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="judul">Judul</label>
                    <input
                        type="text"
                        name="judul"
                        value={data.judul}
                        onChange={(e) => setData('judul', e.target.value)}
                        required
                    />
                    {errors.judul && <div>{errors.judul}</div>}
                </div>
                <div>
                    <label htmlFor="deskripsi">Deskripsi</label>
                    <textarea
                        name="deskripsi"
                        value={data.deskripsi}
                        onChange={(e) => setData('deskripsi', e.target.value)}
                        required
                    ></textarea>
                    {errors.deskripsi && <div>{errors.deskripsi}</div>}
                </div>
                <div>
                    <label htmlFor="gambar">Gambar</label>
                    <input
                        type="file"
                        name="gambar"
                        onChange={(e) => setData('gambar', e.target.files[0])}
                    />
                    {errors.gambar && <div>{errors.gambar}</div>}
                </div>
                <button type="submit" disabled={processing}>Update</button>
            </form>
        </div>
    );
};

export default Edit;
