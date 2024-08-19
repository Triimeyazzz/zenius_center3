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
        
        Object.entries(filteredData).forEach(([date, records]) => {
            // Sanitasi nama sheet
            const sanitizedSheetName = date.replace(/[\/\\?*[\]:]/g, '_'); // Ganti karakter tidak valid dengan underscore
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

        Object.entries(filteredData).forEach(([date, data]) => {
            data.forEach(item => {
                rows.push([
                    date,
                    item.siswa.nama,
                    item.siswa.kelas,
                    item.status,
                    item.keterangan
                ]);
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

            // Reset rows for the next date
            rows = [];
        });

        doc.save('daftar_absensi.pdf');
    };

    const filterData = (data) => {
        let filteredData = {};

        // Organize data by date
        Object.entries(data).forEach(([date, absensi]) => {
            const dateObj = new Date(date);
            const formattedDate = dateObj.toLocaleDateString('id-ID'); // Format as dd-mm-yy

            if (!filteredData[formattedDate]) {
                filteredData[formattedDate] = [];
            }

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
                            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
                        >
                            Filter
                        </button>
                    </div>
                </div>

                {Object.keys(filterData(absensiGroupedByDate)).map(date => (
                    <div key={date} className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Tanggal: {date}</h2>
                        <table className="min-w-full divide-y divide-gray-200 bg-white border border-gray-300 rounded-lg shadow-md">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Siswa</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keterangan</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filterData(absensiGroupedByDate)[date].map((absensi) => (
                                    <tr key={absensi.id}>
<td className="border px-4 py-2 cursor-pointer text-blue-600" onClick={() => handleViewStudentAbsences(absensi.siswa_id)}>
                                        {absensi.siswa.nama}
                                    </td>                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{absensi.siswa.kelas}</td>
                                        <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-500">{absensi.status}</td>
                                        <td className="border px-6 py-4 whitespace-nowrap text-sm text-gray-500">{absensi.keterangan}</td>
                                        <td className="border px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                                            <button
                                                onClick={() => handleViewStudentAbsences(absensi.siswa_id)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Lihat
                                            </button>
                                            <button
                                                onClick={() => handleDelete(absensi.id)}
                                                className="ml-4 text-red-600 hover:text-red-900"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}

                {/* Modal for confirmation */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
                            <p>Apakah Anda yakin ingin menghapus data ini?</p>
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={confirmDelete}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
                                >
                                    Hapus
                                </button>
                                <button
                                    onClick={closeModal}
                                    className="ml-4 bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal for viewing student absences */}
                {selectedStudentId && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
                            <h3 className="text-lg font-semibold mb-4">Absensi Siswa</h3>
                            <table className="min-w-full divide-y divide-gray-200 bg-white border border-gray-300 rounded-lg shadow-md">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keterangan</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {studentAbsences.map((absence) => (
                                        <tr key={absence.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{absence.tanggal}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{absence.status}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{absence.keterangan}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button
                                onClick={handleCloseStudentModal}
                                className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
