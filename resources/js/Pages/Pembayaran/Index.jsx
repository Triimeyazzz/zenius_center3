import React, { useState, useRef } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Optional if you need table formatting
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx'; // Adjusted import

// Register chart components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default function Index({ pembayaran, totalPemasukan, totalTagihan, sisaTagihan, pemasukanPerBulan, auth }) {
    const [showFinancialSummary, setShowFinancialSummary] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const chartRef = useRef(null); // Ref for the chart

    // Filter payments based on search query
    const filteredPembayaran = pembayaran.filter(p =>
        p.siswa.nama.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Download PDF function
    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Ringkasan Pembayaran', 14, 20);
        doc.setFontSize(12);
    
        autoTable(doc, {
            head: [['Siswa', 'Jumlah', 'Status']],
            body: filteredPembayaran.map(p => [p.siswa.nama, `Rp ${p.jumlah.toLocaleString()}`, p.status]),
            startY: 30,
        });
    
        if (chartRef.current) {
            html2canvas(chartRef.current).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                doc.addPage();
                doc.text('Pemasukan per Bulan', 14, 20);
                doc.addImage(imgData, 'PNG', 14, 30, 180, 120);
                doc.save('pembayaran_summary.pdf');
            });
        } else {
            doc.save('pembayaran_summary.pdf');
        }
    };
    
    // Download Excel function
    const handleDownloadExcel = () => {
        const wsData = [
            ['Siswa', 'Jumlah', 'Status'],
            ...filteredPembayaran.map(p => [p.siswa.nama, `Rp ${p.jumlah.toLocaleString()}`, p.status])
        ];
    
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Summary');
    
        // Add chart data as an additional sheet
        const chartWsData = [
            ['Month-Year', 'Total Pemasukan'],
            ...pemasukanPerBulan.map(item => [`${item.year}-${item.month.toString().padStart(2, '0')}`, item.total])
        ];
    
        const chartWs = XLSX.utils.aoa_to_sheet(chartWsData);
        XLSX.utils.book_append_sheet(wb, chartWs, 'Pemasukan per Bulan');
    
        XLSX.writeFile(wb, 'pembayaran_summary.xlsx');
    };
    
    // Data for CSV
    const csvData = filteredPembayaran.map(p => ({
        Siswa: p.siswa.nama,
        Jumlah: `Rp ${p.jumlah.toLocaleString()}`,
        Status: p.status
    }));

    const csvHeaders = [
        { label: 'Siswa', key: 'Siswa' },
        { label: 'Jumlah', key: 'Jumlah' },
        { label: 'Status', key: 'Status' }
    ];

    const chartData = {
        labels: pemasukanPerBulan.map(item => `${item.year}-${item.month.toString().padStart(2, '0')}`),
        datasets: [
            {
                label: 'Pemasukan per Bulan',
                data: pemasukanPerBulan.map(item => item.total),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Pemasukan per Bulan',
            },
        },
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Pembayaran</h2>}
        >
            <div className="max-w-6xl mx-auto p-6 lg:p-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-gradient-to-r from-purple-600 to-teal-600 text-white p-4 rounded-md shadow-xl">
                    <h1 className="text-3xl font-bold">Daftar Pembayaran</h1>
                    <div className="mt-4 md:mt-0">
                        <a
                            href={route('pembayaran.create')}
                            className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
                        >
                            Tambah Pembayaran
                        </a>
                        <button
                            onClick={() => setShowFinancialSummary(true)}
                            className="ml-4 bg-yellow-600 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded"
                        >
                            Ringkasan Keuangan
                        </button>
                        <button
                            onClick={handleDownloadPDF}
                            className="ml-4 bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded"
                        >
                            Export PDF
                        </button>
                        <button
                            onClick={handleDownloadExcel}
                            className="ml-4 bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded"
                        >
                            Export Excel
                        </button>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-lg px-6 pt-4 pb-6 mb-6">
                    <input
                        type="text"
                        placeholder="Cari siswa sesuai nama..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border p-2 mb-4 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Total Pemasukan: Rp {totalPemasukan.toLocaleString()}</h2>
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                        <thead className="bg-purple-600 border-b border-gray-300 text-white">
                            <tr>
                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">Siswa</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">Kelas</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">Jumlah</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPembayaran.map((p) => (
                                <tr key={p.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="px-5 py-5 text-sm text-gray-900">{p.siswa.nama}</td>
                                    <td className="px-5 py-5 text-sm text-gray-900">{p.siswa.kelas}</td>
                                    <td className="px-5 py-5 text-sm text-gray-900">Rp {p.jumlah.toLocaleString()}</td>
                                    <td className="px-5 py-5 text-sm text-gray-900">{p.status}</td>
                                    <td className="px-5 py-5 text-sm">
                                        <a href={route('pembayaran.show', p.id)} className="text-blue-600 hover:text-blue-800">
                                            Detail
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showFinancialSummary && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="relative w-11/12 md:w-1/2 lg:w-1/3 p-6 border shadow-lg rounded-lg bg-white">
                            <div className="text-center">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Ringkasan Keuangan</h3>
                                <div className="mb-4">
                                <p>Total Pemasukan: Rp {totalPemasukan.toLocaleString()}</p>
                                    <h4 className="font-semibold">Total Tagihan: Rp {totalTagihan.toLocaleString()}</h4>
                                    <h4 className="font-semibold">Sisa Tagihan: Rp {sisaTagihan.toLocaleString()}</h4>
                                </div>
                                <div ref={chartRef}>
                                    <Bar data={chartData} options={chartOptions} />
                                </div>
                            </div>
                            <button
                                className="mt-4 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
                                onClick={() => setShowFinancialSummary(false)}
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
