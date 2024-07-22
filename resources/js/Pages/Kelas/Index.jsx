import React from 'react';
import { Link, usePage } from '@inertiajs/react';

const Index = () => {
    const { kelas } = usePage().props;

    return (
        <div>
            <h1>Daftar Kelas</h1>
            <Link href={route('kelas.create')} className="btn btn-primary">Tambah Kelas</Link>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama</th>
                        <th>Slug</th>
                        <th>Pengguna</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {kelas.map(k => (
                        <tr key={k.id}>
                            <td>{k.id}</td>
                            <td>{k.name}</td>
                            <td>{k.slug}</td>
                            <td>{k.user.name}</td>
                            <td>
                                <Link href={route('kelas.edit', k.id)}>Edit</Link>
                                <Link href={route('kelas.show', k.id)}>Detail</Link>
                                <Link method="delete" href={route('kelas.destroy', k.id)} as="button">Hapus</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Index;
