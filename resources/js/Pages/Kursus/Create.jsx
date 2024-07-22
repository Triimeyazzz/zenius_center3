import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';

const Create = () => {
    const { data, setData, post, processing, errors } = useForm({
        judul: '',
        deskripsi: '',
        gambar: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/kursus');
    };

    return (
        <div>
            <h1>Create Kursus</h1>
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
                <button type="submit" disabled={processing}>Save</button>
            </form>
        </div>
    );
};

export default Create;
