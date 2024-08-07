import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ siswa, classes, auth }) {
    const [tanggal, setTanggal] = useState('');
    const [absensi, setAbsensi] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleAbsensiChange = (e, index, field) => {
        const value = e.target.value;
        const newAbsensi = [...absensi];
        newAbsensi[index] = { ...newAbsensi[index], [field]: value };
        setAbsensi(newAbsensi);
    };

    const addAbsensi = (siswaId) => {
        setAbsensi([...absensi, { siswa_id: siswaId, status: 'Hadir', keterangan: '' }]);
    };

    const removeAbsensi = (index) => {
        const newAbsensi = absensi.filter((_, i) => i !== index);
        setAbsensi(newAbsensi);
    };

    const submitForm = () => {
        Inertia.post(route('absensi.store'), {
            tanggal,
            absensi,
        });
    };

    const filteredSiswa = siswa
        .filter(s => (selectedClass === '' || s.kelas === selectedClass))
        .filter(s => s.nama.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Buat Absen</h2>}
        >
            <div className="container mx-auto p-6">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-purple-800">Buat Absen</h1>
                        <Link href={route('absensi.index')} className="text-blue-600 hover:underline">
                            Kembali
                        </Link>
                    </div>

                    <div className="space-y-4 mb-4">
                        <input
                            type="date"
                            value={tanggal}
                            onChange={(e) => setTanggal(e.target.value)}
                            className="border rounded-lg px-4 py-2 w-full"
                        />
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="border rounded-lg px-4 py-2 w-full"
                        >
                            <option value="">Pilih Kelas</option>
                            {classes.map((kelas, index) => (
                                <option key={index} value={kelas}>{kelas}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Cari Siswa..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border rounded-lg px-4 py-2 w-full"
                        />
                    </div>

                    {filteredSiswa.length > 0 ? (
                        filteredSiswa.map((siswa) => (
                            <div key={siswa.id} className="border-b pb-4 mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <h2 className="text-lg font-semibold">{siswa.nama}</h2>
                                        <h5 className="text-sm text-gray-600">{siswa.kelas}</h5>
                                    </div>
                                    <button
                                        onClick={() => addAbsensi(siswa.id)}
                                        className="bg-purple-600 text-white px-3 py-1 rounded-lg"
                                    >
                                        Tambah
                                    </button>
                                </div>
                                {absensi
                                    .filter(a => a.siswa_id === siswa.id)
                                    .map((item, index) => (
                                        <div key={index} className="flex items-center space-x-2 mb-2">
                                            <select
                                                value={item.status}
                                                onChange={(e) => handleAbsensiChange(e, index, 'status')}
                                                className="border rounded-lg px-2 py-1"
                                            >
                                                <option value="Hadir">Hadir</option>
                                                <option value="Tidak Hadir">Tidak Hadir</option>
                                            </select>
                                            {item.status === 'Tidak Hadir' && (
                                                <input
                                                    type="text"
                                                    placeholder="Keterangan"
                                                    value={item.keterangan}
                                                    onChange={(e) => handleAbsensiChange(e, index, 'keterangan')}
                                                    className="border rounded-lg px-2 py-1"
                                                />
                                            )}
                                            <button
                                                onClick={() => removeAbsensi(index)}
                                                className="bg-red-600 text-white px-2 py-1 rounded-lg"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    ))}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Tidak ada siswa yang tersedia.</p>
                    )}

                    <button
                        onClick={submitForm}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg w-full"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
