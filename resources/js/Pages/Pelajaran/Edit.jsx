// resources/js/Pages/Pelajaran/Edit.jsx

import React from 'react';
import { useForm } from '@inertiajs/inertia-react';

const Edit = ({ pelajaran }) => {
    const { data, setData, put, reset } = useForm(pelajaran);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/pelajaran/${pelajaran.id}`);
    };

    const handleFileChange = (e) => {
        setData('url_video', e.target.files[0]);
    };

    return (
        <div>
            <h1>Edit Pelajaran</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={data.judul}
                    onChange={(e) => setData('judul', e.target.value)}
                    placeholder="Judul"
                />
                <textarea
                    value={data.deskripsi}
                    onChange={(e) => setData('deskripsi', e.target.value)}
                    placeholder="Deskripsi"
                />
                <input
                    type="file"
                    onChange={handleFileChange}
                />
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default Edit;
