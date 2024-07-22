import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

const Index = ({ kursus }) => {
    return (
        <div>
            <h1>Daftar Kursus</h1>
            <InertiaLink href="/kursus/create">Tambah Kursus</InertiaLink>
            <ul>
                {kursus.map(kursus => (
                    <li key={kursus.id}>
                        <InertiaLink href={`/kursus/${kursus.id}`}>{kursus.judul}</InertiaLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Index;
