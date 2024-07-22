import React from 'react';
import { usePage } from '@inertiajs/react';

const Show = () => {
    const { kela } = usePage().props;

    return (
        <div>
            <h1>Detail Kelas</h1>
            <p>Nama: {kela.name}</p>
            <p>Slug: {kela.slug}</p>
            <p>Pengguna: {kela.user.name}</p>
        </div>
    );
};

export default Show;
