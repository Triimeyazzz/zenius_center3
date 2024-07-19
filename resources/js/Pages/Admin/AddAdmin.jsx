import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';

export default function AddAdmin() {
    const { data, setData, post } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'admin', // Default role as 'admin'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin');  // pastikan ini sesuai dengan rute Anda
    };

    return (
        <div>
            <h1>Add Admin</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Name"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="Email"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password_confirmation">Confirm Password</label>
                    <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        placeholder="Confirm Password"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="role">Role</label>
                    <select
                        id="role"
                        name="role"
                        value={data.role}
                        onChange={(e) => setData('role', e.target.value)}
                        required
                    >
                        <option value="admin">Admin</option>
                        <option value="petugas">Petugas</option>
                        <option value="siswa">Siswa</option>
                    </select>
                </div>
                <button type="submit">Add Admin</button>
            </form>
        </div>
    );
}
