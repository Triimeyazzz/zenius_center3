import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const daysOfWeek = [
    { value: 'Senin', label: 'Senin' },
    { value: 'Selasa', label: 'Selasa' },
    { value: 'Rabu', label: 'Rabu' },
    { value: 'Kamis', label: 'Kamis' },
    { value: 'Jumat', label: 'Jumat' },
    { value: 'Sabtu', label: 'Sabtu' },
    { value: 'Minggu', label: 'Minggu' },
];

export default function Create({ siswa, classes, auth }) {
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [tanggal, setTanggal] = useState(getTodayDate());
    const [absensi, setAbsensi] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDays, setSelectedDays] = useState([]);

    const handleAbsensiChange = (e, siswaId, field) => {
        const value = e.target.value;
        setAbsensi(prevAbsensi =>
            prevAbsensi.map(item =>
                item.siswa_id === siswaId ? { ...item, [field]: value } : item
            )
        );
    };

    const addAbsensi = (siswaId) => {
        setAbsensi(prevAbsensi => [
            ...prevAbsensi,
            { siswa_id: siswaId, status: 'Hadir', keterangan: '' }
        ]);
    };

    const removeAbsensi = (siswaId) => {
        setAbsensi(prevAbsensi => prevAbsensi.filter(item => item.siswa_id !== siswaId));
    };

    const handleDayChange = (e) => {
        const options = e.target.options;
        const selected = Array.from(options)
            .filter(option => option.selected)
            .map(option => option.value);
        setSelectedDays(selected);
    };

    const submitForm = () => {
        Inertia.post(route('absensi.store'), {
            tanggal,
            absensi,
            hari_bimbingan: selectedDays,
        });
    };

    const filteredSiswa = siswa
        .filter(s => (selectedClass === '' || s.kelas === selectedClass))
        .filter(s => s.nama.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(s => 
            selectedDays.length === 0 || selectedDays.some(day => s.hari_bimbingan.includes(day))
        );

    const renderPreview = () => {
        if (absensi.length === 0) return null;

        return (
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Preview Absen</h3>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="px-4 py-2 text-left">Nama Siswa</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Keterangan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {absensi.map((item, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">
                                    {siswa.find(s => s.id === item.siswa_id)?.nama || 'Unknown'}
                                </td>
                                <td className="border px-4 py-2">{item.status}</td>
                                <td className="border px-4 py-2">{item.keterangan || '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Buat Absen</h2>}
        >
            <div className="container mx-auto p-8">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 shadow-xl rounded-2xl p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-4xl font-extrabold text-purple-700">Buat Absen</h1>
                        <Link href={route('absensi.index')} className="text-blue-700 hover:text-blue-900 font-semibold text-lg transition duration-300 ease-in-out">
                            Kembali
                        </Link>
                    </div>

                    <div className="space-y-6 mb-6">
                        <input
                            type="date"
                            value={tanggal}
                            onChange={(e) => setTanggal(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-3 w-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
                        />
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-3 w-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
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
                            className="border border-gray-300 rounded-lg px-4 py-3 w-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
                        />
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Pilih Hari Bimbingan:</h3>
                        <select
                            multiple
                            value={selectedDays}
                            onChange={handleDayChange}
                            className="border border-gray-300 rounded-lg px-4 py-3 w-full h-32 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
                        >
                            {daysOfWeek.map((day) => (
                                <option key={day.value} value={day.value}>
                                    {day.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {filteredSiswa.length > 0 ? (
                        filteredSiswa.map((siswa) => (
                            <div key={siswa.id} className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 mb-4 transition-transform transform  duration-300 ease-in-out">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-2xl font-semibold text-gray-800">{siswa.nama}</h2>
                                        <h5 className="text-sm text-gray-600">{siswa.kelas}</h5>
                                    </div>
                                    <button
                                        onClick={() => addAbsensi(siswa.id)}
                                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out"
                                    >
                                        Tambah
                                    </button>
                                </div>
                                {absensi
                                    .filter(a => a.siswa_id === siswa.id)
                                    .map((item, index) => (
                                        <div key={index} className="flex items-center space-x-4 mb-2">
                                            <select
                                                value={item.status}
                                                onChange={(e) => handleAbsensiChange(e, siswa.id, 'status')}
                                                className="border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
                                            >
                                                <option value="Hadir">Hadir</option>
                                                <option value="Tidak Hadir">Tidak Hadir</option>
                                            </select>
                                            {item.status === 'Tidak Hadir' && (
                                                <input
                                                    type="text"
                                                    placeholder="Keterangan"
                                                    value={item.keterangan}
                                                    onChange={(e) => handleAbsensiChange(e, siswa.id, 'keterangan')}
                                                    className="border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
                                                />
                                            )}
                                            <button
                                                onClick={() => removeAbsensi(siswa.id)}
                                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
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

                    {/* Preview Section */}
                    {renderPreview()}

                    <button
                        onClick={submitForm}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg w-full hover:bg-green-700 transition duration-300 ease-in-out"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
