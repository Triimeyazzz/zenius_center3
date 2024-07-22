import React from 'react';
import { useForm, usePage } from '@inertiajs/react';

const Edit = () => {
    const { kela, users } = usePage().props;
    const { data, setData, put, errors } = useForm({
        name: kela.name,
        slug: kela.slug,
        user_id: kela.user_id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('kelas.update', kela.id));
    };

    return (
        <div>
            <h1>Edit Kelas</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nama</label>
                    <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} />
                    {errors.name && <div>{errors.name}</div>}
                </div>
                <div>
                    <label>Slug</label>
                    <input type="text" value={data.slug} onChange={e => setData('slug', e.target.value)} />
                    {errors.slug && <div>{errors.slug}</div>}
                </div>
                <div>
                    <label>Pengguna</label>
                    <select value={data.user_id} onChange={e => setData('user_id', e.target.value)}>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                    {errors.user_id && <div>{errors.user_id}</div>}
                </div>
                <button type="submit">Simpan</button>
            </form>
        </div>
    );
};

export default Edit;
