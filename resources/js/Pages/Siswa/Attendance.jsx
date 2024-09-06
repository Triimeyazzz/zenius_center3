import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';
import StudentLayout from '@/Layouts/StudentLayout';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught in ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="text-center">
                    <h1 className="text-red-600 font-bold text-xl">Something went wrong.</h1>
                    <button 
                        onClick={() => this.setState({ hasError: false })} 
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children; 
    }
}

const Attendance = ({ absensiInfo, siswa }) => {
    const [selectedMonth, setSelectedMonth] = useState('');

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const filteredAbsensiInfo = selectedMonth
        ? absensiInfo.filter(record => 
            format(new Date(record.tanggal), 'yyyy-MM') === selectedMonth)
        : absensiInfo;

    return (
        <StudentLayout siswa={siswa}>
            <ErrorBoundary>
                <div className="container mx-auto p-4">
                    <Head title="Attendance" />
                    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Catatan Kehadiran</h1>

                    <div className="mb-4">
                        <label htmlFor="month-filter" className="block text-gray-700 font-semibold mb-2">Tampilkan Berdasarkan Bulan:</label>
                        <input 
                            type="month" 
                            id="month-filter" 
                            value={selectedMonth}
                            onChange={handleMonthChange}
                            className="border border-gray-300 p-2 rounded"
                        />
                    </div>

                    <div className="overflow-x-auto rounded-lg shadow-lg">
                        <table className="min-w-full border-collapse border border-gray-200">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="border border-gray-300 p-3">Tanggal</th>
                                    <th className="border border-gray-300 p-3">Status</th>
                                    <th className="border border-gray-300 p-3">Keterangan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAbsensiInfo.length > 0 ? (
                                    filteredAbsensiInfo.map((record, index) => (
                                        <tr 
                                            key={record.tanggal} 
                                            className={`hover:bg-gray-100 transition ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                                        >
                                            <td className="border border-gray-300 p-3">
                                                {format(new Date(record.tanggal), 'dd MMM yyyy')}
                                            </td>
                                            <td className={`border border-gray-300 p-3 font-semibold ${record.status === 'Hadir' ? 'text-green-600' : 'text-red-600'}`}>
                                                {record.status}
                                            </td>
                                            <td className="border border-gray-300 p-3">{record.keterangan}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center p-4 text-gray-500">Tidak ada Absensi pada Bulan yan dipilih.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </ErrorBoundary>
        </StudentLayout>
    );
};

export default Attendance;
