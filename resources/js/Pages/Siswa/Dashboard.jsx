import React, { useState, useEffect } from "react";
import StudentLayout from "@/Layouts/StudentLayout";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import axios from 'axios'; // assuming you are using axios for API calls

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const Dashboard = ({
    user,
    chartLabels = [],
    chartData = [],
    absensiLabels = [],
    absensiData = [],
    absensiDetails = [],
    totalToPay,
    totalPayments,
    paymentRows: paymentRowsData,
}) => {
    const [cicilan, setCicilan] = useState([]);
    const [totalBayar, setTotalBayar] = useState(0);

    // Data for the performance chart
    const performanceData = {
        labels: chartLabels,
        datasets: [
            {
                label: "Skor Try Out dari Waktu ke Waktu",
                data: chartData,
                borderColor: "rgba(153, 102, 255, 1)", // Ungu
                backgroundColor: "rgba(153, 102, 255, 0.2)", // Ungu
                fill: true,
            },
        ],
    };

    // Options for the performance chart
    const performanceOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    font: {
                        size: 14,
                        color: "rgba(153, 102, 255, 1)", // Ungu
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
                    text: "Tanggal Pelaksanaan",
                    color: "rgba(153, 102, 255, 1)", // Ungu
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    color: "rgba(153, 102, 255, 0.8)", // Ungu
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Skor",
                    color: "rgba(153, 102, 255, 1)", // Ungu
                },
                beginAtZero: true,
                suggestedMax: 100,
                ticks: {
                    color: "rgba(153, 102, 255, 0.8)", // Ungu
                },
            },
        },
    };

    // Prepare data for the monthly attendance table
    const monthlyAttendance = absensiLabels.reduce((acc, label, index) => {
        const month = new Date(label).toLocaleString("default", {
            month: "long",
            year: "numeric",
        });
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
    // In your Dashboard component
// Prepare rows for the payment table
const paymentRows = (cicilan || []).map((item, index) => (
    <tr key={index}>
        <td className="border px-4 py-2">{new Date(item.dibayar_pada).toLocaleDateString()}</td>
        <td className="border px-4 py-2">
            {item.jumlah.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
            })}
        </td>
    </tr>
));


useEffect(() => {
    axios.get('/siswa/dashboard')
        .then(response => {
            setCicilan(response.data.cicilan || []); // Default to empty array if undefined
            setTotalBayar(response.data.totalBayar || 0); // Default to 0 if undefined
        })
        .catch(error => {
            console.error('There was an error fetching the payment data!', error);
            setCicilan([]); // Reset cicilan to empty array on error
        });
}, []);

    return (
        <StudentLayout siswa={user}>
            <div className="p-6 bg-yellow-50">
                <h1 className="text-4xl font-bold mb-4 text-purple-800">
                    Selamat datang, {user.nama}!
                </h1>
                <p className="text-lg mb-6 text-gray-700">
                    Di sini Anda bisa melihat ringkasan absensi Anda serta
                    grafik performa try out Anda. Manfaatkan informasi ini untuk
                    mengevaluasi kemajuan Anda dan merencanakan langkah
                    selanjutnya.
                    
                </p>

                <div className="bg-gradient-to-r from-purple-100 to-purple-200 shadow-lg rounded-lg p-6 mb-6 border-t-4 border-purple-500">
    <h2 className="text-2xl font-semibold mb-4 text-purple-700 text-center">
        Informasi Siswa
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
            <p className="font-medium text-gray-800">Nama:</p>
            <p className="text-lg text-purple-800">{user.nama}</p>
        </div>
        <div>
            <p className="font-medium text-gray-800">Email:</p>
            <p className="text-lg text-purple-800">{user.email}</p>
        </div>
        <div>
            <p className="font-medium text-gray-800">Jenis Kelamin:</p>
            <p className="text-lg text-purple-800">{user.jenis_kelamin}</p>
        </div>
        <div>
            <p className="font-medium text-gray-800">Tempat Lahir:</p>
            <p className="text-lg text-purple-800">{user.tempat_lahir}</p>
        </div>
        <div>
            <p className="font-medium text-gray-800">Tanggal Lahir:</p>
            <p className="text-lg text-purple-800">{user.tanggal_lahir}</p>
        </div>
        <div>
            <p className="font-medium text-gray-800">Alamat:</p>
            <p className="text-lg text-purple-800">{user.alamat}</p>
        </div>
        <div>
            <p className="font-medium text-gray-800">Kota:</p>
            <p className="text-lg text-purple-800">{user.kota}</p>
        </div>
        <div>
            <p className="font-medium text-gray-800">Instagram:</p>
            <p className="text-lg text-purple-800">{user.instagram}</p>
        </div>
        <div>
            <p className="font-medium text-gray-800">No WA:</p>
            <p className="text-lg text-purple-800">{user.no_wa}</p>
        </div>
    </div>

    <h2 className="text-2xl font-semibold mt-6 mb-4 text-purple-700 text-center">
        Informasi Sekolah
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
            <p className="font-medium text-gray-800">Nama Sekolah:</p>
            <p className="text-lg text-purple-800">{user.nama_sekolah}</p>
        </div>
        <div>
            <p className="font-medium text-gray-800">Alamat Sekolah:</p>
            <p className="text-lg text-purple-800">{user.alamat_sekolah}</p>
        </div>
        <div>
            <p className="font-medium text-gray-800">Kurikulum:</p>
            <p className="text-lg text-purple-800">{user.kurikulum}</p>
        </div>
    </div>

    <h2 className="text-2xl font-semibold mt-6 mb-4 text-purple-700 text-center">
        Informasi Orang Tua
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
            <p className="font-medium text-gray-800">Nama Ayah:</p>
            <p className="text-lg text-purple-800">{user.nama_ayah}</p>
        </div>
        <div>
            <p className="font-medium text-gray-800">Nama Ibu:</p>
            <p className="text-lg text-purple-800">{user.nama_ibu}</p>
        </div>
        <div>
            <p className="font-medium text-gray-800">Pekerjaan Ayah:</p>
            <p className="text-lg text-purple-800">{user.pekerjaan_ayah}</p>
        </div>
        <div>
            <p className="font-medium text-gray-800">No Telp/HP Ayah:</p>
            <p className="text-lg text-purple-800">{user.no_telp_ayah}</p>
        </div>
        <div>
            <p className="font-medium text-gray-800">No WA/ID Line Ayah:</p>
            <p className="text-lg text-purple-800">{user.no_wa_ayah}</p>
        </div>
        <div>
            <p className="font-medium text-gray-800">Email Ayah:</p>
            <p className="text-lg text-purple-800">{user.email_ayah}</p>
        </div>
        <div>
            <p className="font-medium text-gray-800">Pekerjaan Ibu:</p>
            <p className="text-lg text-purple-800">{user.pekerjaan_ibu}</p>
        </div>
        <div>
            <p className="font-medium text-gray-800">No Telp/HP Ibu:</p>
            <p className="text-lg text-purple-800">{user.no_telp_ibu}</p>
        </div>
        <div>
            <p className="font-medium text-gray-800">No WA/ID Line Ibu:</p>
            <p className="text-lg text-purple-800">{user.no_wa_ibu}</p>
        </div>
        <div>
            <p className="font-medium text-gray-800">Email Ibu:</p>
            <p className="text-lg text-purple-800">{user.email_ibu}</p>
        </div>
    </div>

    <h2 className="text-2xl font-semibold mt-6 mb-4 text-purple-700 text-center">
        Informasi Bimbingan
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
            <p className="font-medium text-gray-800">Mulai Bimbingan:</p>
            <p className="text-lg text-purple-800">{user.mulai_bimbingan}</p>
        </div>
        <div>
            <p className="font-medium text-gray-800">Jam Bimbingan:</p>
            <p className="text-lg text-purple-800">{user.jam_bimbingan}</p>
        </div>
        <div>
            <p className="font-medium text-gray-800">Hari Bimbingan:</p>
            <p className="text-lg text-purple-800">{user.hari_bimbingan}</p>
        </div>
    </div>

    <h2 className="text-2xl font-semibold mt-6 mb-4 text-purple-700 text-center">
        Foto Siswa
    </h2>
    <div className="flex justify-center mb-4">
        <img 
            src="path_to_student_photo.jpg" 
            alt="Foto Siswa" 
            className="rounded-full w-32 h-32 object-cover border-2 border-purple-500 shadow-lg"
        />
    </div>
</div>


                <div className="bg-white shadow-lg rounded-lg p-4 mb-6 border-t-4 border-purple-500">
                    <h2 className="text-xl font-semibold mb-2 text-purple-700">
                        Jumlah Biaya Investasi yang Tersisa
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Total pembayaran yang harus Anda lakukan saat ini.
                    </p>
                    <p className="text-2xl font-bold text-purple-800">
                        {totalToPay.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        })}
                    </p>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-4 mb-6 border-t-4 border-green-500">
                    <h1 className="text-2xl font-bold mb-4">Laporan Pembayaran</h1>
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Total Pembayaran: Rp{totalBayar}
                            </h3>
                        </div>

                        <div className="border-t border-gray-200">
                            <dl>
                                {cicilan.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                                    >
                                        <dt className="text-sm font-medium text-gray-500">
                                            Tanggal Pembayaran:{" "}
                                            {new Date(item.dibayar_pada).toLocaleDateString()}
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            Jumlah: Rp{item.jumlah}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-4 mb-6 border-t-4 border-purple-500">
                    <h2 className="text-xl font-semibold mb-2 text-purple-700">
                        Laporan Absensi Bulanan
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Pantau kehadiran Anda per bulan dengan melihat tabel
                        ini.
                    </p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2 text-left">Bulan</th>
                                    <th className="border px-4 py-2 text-left">Jumlah Hari</th>
                                </tr>
                            </thead>
                            <tbody>{monthlyRows}</tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-4 mb-6 border-t-4 border-purple-500">
                    <h2 className="text-xl font-semibold mb-2 text-purple-700">
                        Detail Absensi
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Lihat detail kehadiran Anda termasuk tanggal, status,
                        dan keterangan.
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
                            <tbody>{detailRows}</tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-4 mb-6 border-t-4 border-purple-500">
                    <h2 className="text-xl font-semibold mb-2 text-purple-700">
                        Grafik Performa Try Out
                    </h2>
                    <Line data={performanceData} options={performanceOptions} />
                </div>
            </div>
        </StudentLayout>
    );
};

export default Dashboard;
