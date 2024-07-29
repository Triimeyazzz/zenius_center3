import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from '@inertiajs/react';

const PembayaranList = () => {
    const [pembayarans, setPembayarans] = useState([]);

    useEffect(() => {
        axios.get('/pembayaran')
            .then(response => {
                setPembayarans(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the pembayaran!', error);
            });
            //console.log(typeof pembayarans);
    }, []);

    return (
        <div>
            <h1>Daftar Pembayaran</h1>
            <Link href="/pembayaran/create">Buat Pembayaran</Link>
            <ul>
                {/* {pembayarans} */}
                {/* {pembayarans.map(pembayaran => (
                    <li key={pembayaran.id}>
                        Jumlah: {pembayaran.jumlah}, Status: {pembayaran.status}
                    </li>
                ))} */}
            </ul>
        </div>
    );
};

export default PembayaranList;
