import { useState, useEffect } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import LineChart from '@/Components/LineChart';
import ErrorBoundary from '@/Components/ErrorBoundary';

export default function Dashboard({ auth, totalAdmins, totalPetugas, totalSiswa, totalCourses }) {
    console.log('Dashboard props:', { totalAdmins, totalPetugas, totalSiswa, totalCourses }); // Debugging line

    const [studentData, setStudentData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Number of Students',
                data: [],
                borderColor: '#7b1fa1',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    });

    useEffect(() => {
        const fetchData = async () => {
            // Static data for example
            const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
            const data = [10, 70, 50, 20, 30, 80, 60, 70];
            setStudentData({
                labels,
                datasets: [
                    {
                        label: 'Number of Students',
                        data,
                        borderColor: '#7b1fa1',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    },
                ],
            });
        };

        fetchData();
    }, []);

    return (
        <ErrorBoundary>
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4 hover:scale-105 hover:text-sky-400 hover:rotate-12 duration-300">
                            <h3 className="text-lg font-medium text-gray-900">Total Admin</h3>
                            <p className="text-gray-600">{totalAdmins || 'Loading...'}</p>
                        </div>
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4 hover:scale-105 hover:text-sky-400 hover:-rotate-12 duration-300">
                            <h3 className="text-lg font-medium text-gray-900">Total Siswa</h3>
                            <p className="text-gray-600">{totalSiswa || 'Loading...'}</p>
                        </div>
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4 hover:scale-105 hover:text-sky-400 hover:rotate-12 duration-300">
                            <h3 className="text-lg font-medium text-gray-900">Total Kursus</h3>
                            <p className="text-gray-600">{totalCourses || 'Loading...'}</p>
                        </div>
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4 hover:scale-105 hover:text-sky-400 hover:-rotate-12 duration-300">
                            <h3 className="text-lg font-medium text-gray-900">Total Petugas</h3>
                            <p className="text-gray-600">{totalPetugas || 'Loading...'}</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <LineChart data={studentData} />
                    </div>
                </div>
            </div>

            <footer className="bg-white border-t border-gray-200 shadow py-8 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-gray-500">
                    &copy; 2024 Admin Dashboard - Made with ❤️ by Zema
                </p>
            </footer>
        </AuthenticatedLayout>
        </ErrorBoundary>
    );
}
