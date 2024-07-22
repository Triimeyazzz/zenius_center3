import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-react';

const Create = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        nomor_hp: '',
        alamat: '',
        role: 'siswa',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/users');
    };

    return (
        <div>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
                {errors.name && <div>{errors.name}</div>}
                
                <label>Email:</label>
                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                />
                {errors.email && <div>{errors.email}</div>}

                <label>Password:</label>
                <input
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                />
                {errors.password && <div>{errors.password}</div>}

                <label>Confirm Password:</label>
                <input
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                />

                <label>Phone:</label>
                <input
                    type="text"
                    value={data.nomor_hp}
                    onChange={(e) => setData('nomor_hp', e.target.value)}
                />

                <label>Address:</label>
                <input
                    type="text"
                    value={data.alamat}
                    onChange={(e) => setData('alamat', e.target.value)}
                />

                <label>Role:</label>
                <select
                    value={data.role}
                    onChange={(e) => setData('role', e.target.value)}
                >
                    <option value="admin">Admin</option>
                    <option value="petugas">Petugas</option>
                    <option value="siswa">Siswa</option>
                </select>

                <button type="submit" disabled={processing}>Submit</button>
            </form>
        </div>
    );
};

export default Create;
