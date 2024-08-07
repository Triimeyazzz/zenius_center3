import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

export default function Index({ absensiGroupedByDate, classes, selectedClass, selectedDate, auth }) {
    const [kelas, setKelas] = useState(selectedClass || '');
    const [tanggal, setTanggal] = useState(selectedDate || '');
    const [periode, setPeriode] = useState('bulan'); // Default filter
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedDateRange, setSelectedDateRange] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [studentAbsences, setStudentAbsences] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // New state for search query

    const handleFilterChange = () => {
        window.location.href = route('absensi.index', { kelas, tanggal, periode, selectedMonth, selectedDateRange });
    };

    const handleExportToExcel = () => {
        const filteredData = filterData(absensiGroupedByDate);
        console.log('Filtered Data for Excel:', filteredData); // Debugging
    
        if (Object.keys(filteredData).length === 0) {
            alert('Data tidak tersedia untuk filter yang dipilih.');
            return;
        }
    
        const wb = XLSX.utils.book_new();
        
        Object.entries(filteredData).forEach(([key, records]) => {
            // Sanitasi nama sheet
            const sanitizedSheetName = key.replace(/[\/\\?*[\]:]/g, '_'); // Ganti karakter tidak valid dengan underscore
            const ws = XLSX.utils.json_to_sheet(records);
            XLSX.utils.sheet_add_aoa(ws, [['Tanggal', 'Nama Siswa', 'Kelas', 'Status', 'Keterangan']], { origin: 'A1' });
            XLSX.utils.book_append_sheet(wb, ws, sanitizedSheetName);
        });
    
        XLSX.writeFile(wb, 'daftar_absensi.xlsx');
    };
    
    const handleExportToPDF = () => {
        const filteredData = filterData(absensiGroupedByDate);
        console.log('Filtered Data for PDF:', filteredData); // Debugging

        if (Object.keys(filteredData).length === 0) {
            alert('Data tidak tersedia untuk filter yang dipilih.');
            return;
        }

        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text('Daftar Absensi', 14, 22);

        const { x, y } = { x: 14, y: 30 };
        const columns = ['Tanggal', 'Nama Siswa', 'Kelas', 'Status', 'Keterangan'];
        let rows = [];

        Object.values(filteredData).forEach(data => {
            data.forEach(item => {
                rows.push([
                    item.tanggal,
                    item.siswa.nama,
                    item.siswa.kelas,
                    item.status,
                    item.keterangan
                ]);
            });
        });

        doc.autoTable({
            startY: y,
            head: [columns],
            body: rows,
            styles: {
                fontSize: 12,
                cellPadding: 5,
                valign: 'middle',
                halign: 'center'
            },
            headStyles: {
                fillColor: [153, 50, 204],
                textColor: [255, 255, 255],
                fontStyle: 'bold'
            },
            margin: { top: 40 },
        });

        doc.save('daftar_absensi.pdf');
    };

    const filterData = (data) => {
        let filteredData = {};

        // Organize data by month and date
        Object.entries(data).forEach(([date, absensi]) => {
            const dateObj = new Date(date);
            const month = dateObj.toLocaleString('default', { month: 'long' });
            const formattedDate = dateObj.toLocaleDateString('id-ID'); // Format as dd-mm-yy

            if (!filteredData[month]) {
                filteredData[month] = [];
            }

            if (!filteredData[formattedDate]) {
                filteredData[formattedDate] = [];
            }

            filteredData[month].push(...absensi);
            filteredData[formattedDate].push(...absensi);
        });

        if (kelas) {
            Object.keys(filteredData).forEach(key => {
                filteredData[key] = filteredData[key].filter(item => item.siswa.kelas === kelas);
            });
        }

        if (periode === 'tanggal' && selectedDateRange) {
            filteredData = {
                [selectedDateRange]: filteredData[selectedDateRange] || []
            };
        } else if (periode === 'bulan' && selectedMonth) {
            filteredData = {
                [selectedMonth]: filteredData[selectedMonth] || []
            };
        }

        // Filter by search query
        if (searchQuery) {
            Object.keys(filteredData).forEach(key => {
                filteredData[key] = filteredData[key].filter(item =>
                    item.siswa.nama.toLowerCase().includes(searchQuery.toLowerCase())
                );
            });
        }

        return filteredData;
    };

    const getMonthOptions = () => {
        const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' }));
        return months.map((month, index) => (
            <option key={index} value={month}>{month}</option>
        ));
    };

    const getDateOptions = () => {
        const dates = Object.keys(absensiGroupedByDate).map(date => new Date(date).toLocaleDateString('id-ID')); // Format as dd-mm-yy
        return dates.map(date => (
            <option key={date} value={date}>{date}</option>
        ));
    };

    const handleDelete = (id) => {
        setDeletingId(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        Inertia.delete(route('absensi.destroy', deletingId), {
            onSuccess: () => {
                setShowModal(false);
                setDeletingId(null);
                // Optionally add logic to refresh the data or handle success
            },
            onError: () => {
                alert("Gagal menghapus siswa. Cek console untuk detail.");
            }
        });
    };

    const closeModal = () => {
        setShowModal(false);
        setDeletingId(null);
    };

    const handleViewStudentAbsences = (studentId) => {
        // Filter absences for the selected student
        const studentData = Object.values(absensiGroupedByDate).flat().filter(absensi => absensi.siswa_id === studentId);
        setStudentAbsences(studentData);
        setSelectedStudentId(studentId);
    };

    const handleCloseStudentModal = () => {
        setSelectedStudentId(null);
        setStudentAbsences([]);
    };

    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Absensi</h2>}
        >
            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-purple-800">Daftar Absensi</h1>
                    <div className="flex space-x-4">
                        <Link
                            href={route('absensi.create')}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                        >
                            Buat Absen
                        </Link>
                        <button
                            onClick={handleExportToExcel}
                            className="bg-orange-600 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-700 transition"
                        >
                            Ekspor ke Excel
                        </button>
                        <button
                            onClick={handleExportToPDF}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
                        >
                            Ekspor ke PDF
                        </button>
                    </div>
                </div>

                <div className="bg-yellow-100 shadow-md rounded-lg p-6 mb-6">
                    <div className="flex space-x-4 mb-4">
                        <input
                            type="text"
                            placeholder="Cari Nama Siswa..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
                        />
                        <select
                            value={kelas}
                            onChange={(e) => setKelas(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Pilih Kelas</option>
                            {classes.map((kelas, index) => (
                                <option key={index} value={kelas}>{kelas}</option>
                            ))}
                        </select>
                        <select
                            value={tanggal}
                            onChange={(e) => setTanggal(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Pilih Tanggal</option>
                            {getDateOptions()}
                        </select>
                    </div>
                    <div className="flex space-x-4">
                        <select
                            value={periode}
                            onChange={(e) => setPeriode(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="bulan">Bulan</option>
                            <option value="tanggal">Tanggal</option>
                        </select>
                        {periode === 'bulan' && (
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="">Pilih Bulan</option>
                                {getMonthOptions()}
                            </select>
                        )}
                        {periode === 'tanggal' && (
                            <select
                                value={selectedDateRange}
                                onChange={(e) => setSelectedDateRange(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="">Pilih Tanggal</option>
                                {getDateOptions()}
                            </select>
                        )}
                        <button
                            onClick={handleFilterChange}
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition"
                        >
                            Terapkan Filter
                        </button>
                    </div>
                </div>

                <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="p-3 border-b">Tanggal</th>
                            <th className="p-3 border-b">Nama Siswa</th>
                            <th className="p-3 border-b">Kelas</th>
                            <th className="p-3 border-b">Status</th>
                            <th className="p-3 border-b">Keterangan</th>
                            <th className="p-3 border-b">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(filterData(absensiGroupedByDate)).map(([date, absensi]) =>
                            absensi.map((item) => (
                                <tr key={item.id}>
                                    <td className="p-3 border-b">{item.tanggal}</td>
                                    <td className="p-3 border-b">
                                        <button
                                            onClick={() => handleViewStudentAbsences(item.siswa_id)}
                                            className="text-blue-600 underline"
                                        >
                                            {item.siswa.nama}
                                        </button>
                                    </td>
                                    <td className="p-3 border-b">{item.siswa.kelas}</td>
                                    <td className="p-3 border-b">{item.status}</td>
                                    <td className="p-3 border-b">{item.keterangan}</td>
                                    <td className="p-3 border-b">
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-red-600 underline"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Konfirmasi Hapus</h2>
                            <p>Apakah Anda yakin ingin menghapus data ini?</p>
                            <div className="flex justify-end space-x-4 mt-4">
                                <button
                                    onClick={confirmDelete}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Hapus
                                </button>
                                <button
                                    onClick={closeModal}
                                    className="bg-gray-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {selectedStudentId && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg relative">
                            <h2 className="text-xl font-semibold mb-4">Absensi Siswa</h2>
                            <button
                                onClick={handleCloseStudentModal}
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl"
                            >
                                &times;
                            </button>
                            <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
                                <thead className="bg-gray-100 text-gray-600">
                                    <tr>
                                        <th className="p-3 border-b">Tanggal</th>
                                        <th className="p-3 border-b">Status</th>
                                        <th className="p-3 border-b">Keterangan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentAbsences.map((item) => (
                                        <tr key={item.id}>
                                            <td className="p-3 border-b">{item.tanggal}</td>
                                            <td className="p-3 border-b">{item.status}</td>
                                            <td className="p-3 border-b">{item.keterangan}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
