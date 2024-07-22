// resources/js/Pages/Kursus/KursusListCreate.jsx
import React, { useState } from 'react';
import { Link, Inertia } from '@inertiajs/inertia-react';
const KursusListCreate = ({ kursus }) => {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [judul, setJudul] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [gambar, setGambar] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('judul', judul);
        formData.append('deskripsi', deskripsi);
        if (gambar) {
            formData.append('gambar', gambar);
        }
        Inertia.post('/kursus', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(() => {
            setJudul('');
            setDeskripsi('');
            setGambar(null);
            setShowCreateForm(false);
        });
    };

    return (
        <div>
            
            <h1>Kursus List</h1>
            <button 
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="btn btn-primary mb-4"
            >
                {showCreateForm ? 'Cancel' : 'Add New Kursus'}
            </button>

            {showCreateForm && (
                <form onSubmit={handleSubmit} className="mb-4">
                    <div>
                        <label>Judul</label>
                        <input
                            type="text"
                            value={judul}
                            onChange={(e) => setJudul(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div>
                        <label>Deskripsi</label>
                        <textarea
                            value={deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div>
                        <label>Gambar</label>
                        <input
                            type="file"
                            onChange={(e) => setGambar(e.target.files[0])}
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-success mt-3">Submit</button>
                </form>
            )}

            <ul>
                {kursus.map((item) => (
                    <li key={item.id} className="mb-3">
                        <h2>{item.judul}</h2>
                        <p>{item.deskripsi}</p>
                        {item.gambar && <img src={`/storage/${item.gambar}`} alt={item.judul} className="img-thumbnail" />}
                        <div className="mt-2">
                            <Link href={`/kursus/${item.id}`} className="btn btn-info me-2">View</Link>
                            <Link href={`/kursus/${item.id}/edit`} className="btn btn-warning">Edit</Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default KursusListCreate;
