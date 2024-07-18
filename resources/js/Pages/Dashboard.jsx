// Dashboard.js
import { useState, useEffect } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import LineChart from '@/Components/LineChart';

export default function Dashboard({ auth }) {
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
        // Fetch data from API or use static data
        const fetchData = async () => {
            // Replace with your data fetching logic
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
                            <p className="text-gray-600">2</p>
                        </div>
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4 hover:scale-105 hover:text-sky-400 hover:-rotate-12 duration-300">
                            <h3 className="text-lg font-medium text-gray-900">Total siswa</h3>
                            <p className="text-gray-600">154</p>
                        </div>
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4 hover:scale-105 hover:text-sky-400 hover:rotate-12 duration-300">
                            <h3 className="text-lg font-medium text-gray-900">Total kursus</h3>
                            <p className="text-gray-600">25</p>
                        </div>
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4 hover:scale-105 hover:text-sky-400 hover:-rotate-12 duration-300">
                            <h3 className="text-lg font-medium text-gray-900">Total petugas</h3>
                            <p className="text-gray-600">10</p>
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
    );
}
