import React from 'react';
import StudentLayout from '@/Layouts/StudentLayout';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const Dashboard = ({ user, chartLabels = [], chartData = [], absensiLabels = [], absensiData = [], absensiDetails = [], totalToPay, totalPayments, paymentRows: paymentRowsData }) => {
    // Data for the performance chart
    const performanceData = {
        labels: chartLabels,
        datasets: [
            {
                label: 'Skor Try Out dari Waktu ke Waktu',
                data: chartData,
                borderColor: 'rgba(153, 102, 255, 1)', // Ungu
                backgroundColor: 'rgba(153, 102, 255, 0.2)', // Ungu
                fill: true,
            }
        ],
    };

    // Options for the performance chart
    const performanceOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14,
                        color: 'rgba(153, 102, 255, 1)', // Ungu
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: (context) => `Skor: ${context.raw}`,
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Tanggal Pelaksanaan',
                    color: 'rgba(153, 102, 255, 1)', // Ungu
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    color: 'rgba(153, 102, 255, 0.8)', // Ungu
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Skor',
                    color: 'rgba(153, 102, 255, 1)', // Ungu
                },
                beginAtZero: true,
                suggestedMax: 100,
                ticks: {
                    color: 'rgba(153, 102, 255, 0.8)', // Ungu
                },
            },
        },
    };

    // Prepare data for the monthly attendance table
    const monthlyAttendance = absensiLabels.reduce((acc, label, index) => {
        const month = new Date(label).toLocaleString('default', { month: 'long', year: 'numeric' });
        if (!acc[month]) {
            acc[month] = 0;
        }
        acc[month] += absensiData[index];
        return acc;
    }, {});

    // Prepare rows for the monthly attendance table
    const monthlyRows = Object.keys(monthlyAttendance).map((month, index) => (
        <tr key={index}>
            <td className="border px-4 py-2">{month}</td>
            <td className="border px-4 py-2">{monthlyAttendance[month]}</td>
        </tr>
    ));

    // Prepare rows for the detailed attendance table
    const detailRows = absensiDetails.map((detail, index) => (
        <tr key={index}>
            <td className="border px-4 py-2">{detail.tanggal}</td>
            <td className="border px-4 py-2">{detail.status}</td>
            <td className="border px-4 py-2">{detail.keterangan}</td>
        </tr>
    ));

    // Prepare rows for the payment table
    const paymentRows = paymentRowsData.map((payment, index) => (
        <tr key={index}>
            <td className="border px-4 py-2">{payment.tanggal}</td>
            <td className="border px-4 py-2">{payment.jumlah.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
        </tr>
    ));

    return (
        <StudentLayout siswa={user}>
            <div className="p-6 bg-yellow-50">
                <h1 className="text-4xl font-bold mb-4 text-purple-800">Selamat datang, {user.nama}!</h1>
                <p className="text-lg mb-6 text-gray-700">
                    Di sini Anda bisa melihat ringkasan absensi Anda serta grafik performa try out Anda. Manfaatkan informasi ini untuk mengevaluasi kemajuan Anda dan merencanakan langkah selanjutnya.
                </p>

                <div className="bg-white shadow-lg rounded-lg p-4 mb-6 border-t-4 border-purple-500">
                    <h2 className="text-xl font-semibold mb-2 text-purple-700">Jumlah yang Harus Dibayar</h2>
                    <p className="text-gray-600 mb-4">
                        Total pembayaran yang harus Anda lakukan saat ini.
                    </p>
                    <p className="text-2xl font-bold text-purple-800">{totalToPay.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-4 mb-6 border-t-4 border-green-500">
                    <h2 className="text-xl font-semibold mb-2 text-green-700">Laporan Pembayaran</h2>
                    <p className="text-gray-600 mb-4">
                        Berikut adalah total pembayaran yang telah Anda lakukan serta rinciannya.
                    </p>
                    <p className="text-gray-700 mb-4">Total Pembayaran: {totalPayments.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2 text-left">Tanggal</th>
                                    <th className="border px-4 py-2 text-left">Jumlah</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentRows}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-4 mb-6 border-t-4 border-purple-500">
                    <h2 className="text-xl font-semibold mb-2 text-purple-700">Laporan Absensi Bulanan</h2>
                    <p className="text-gray-600 mb-4">
                        Pantau kehadiran Anda per bulan dengan melihat tabel ini.
                    </p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2 text-left">Bulan</th>
                                    <th className="border px-4 py-2 text-left">Jumlah Hari</th>
                                </tr>
                            </thead>
                            <tbody>
                                {monthlyRows}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-4 mb-6 border-t-4 border-purple-500">
                    <h2 className="text-xl font-semibold mb-2 text-purple-700">Detail Absensi</h2>
                    <p className="text-gray-600 mb-4">
                        Lihat detail kehadiran Anda termasuk tanggal, status, dan keterangan.
                    </p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2 text-left">Tanggal</th>
                                    <th className="border px-4 py-2 text-left">Status</th>
                                    <th className="border px-4 py-2 text-left">Keterangan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detailRows}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-4 mb-6 border-t-4 border-purple-500">
                    <h2 className="text-xl font-semibold mb-2 text-purple-700">Grafik Performa Try Out</h2>
                    <Line data={performanceData} options={performanceOptions} />
                </div>
            </div>
        </StudentLayout>
    );
};

export default Dashboard;
