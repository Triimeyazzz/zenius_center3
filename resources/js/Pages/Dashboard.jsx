import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import LineChart from '@/Components/LineChart';
import ErrorBoundary from '@/Components/ErrorBoundary';
import Loading from '@/Components/Loading';

export default function Dashboard({ auth }) {
    const [data, setData] = useState({
        totalAdmins: null,
        totalSiswa: null,
        admins: [],
        siswa: [],
        courses: [],
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCountData = async () => {
            try {
                const response = await fetch('/dashboard/count');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(prev => ({
                    ...prev,
                    totalAdmins: result.totalAdmins,
                    totalSiswa: result.totalSiswa,
                }));
            } catch (error) {
                console.error('Error fetching count data:', error);
            }
        };

        const fetchData = async () => {
            try {
                const response = await fetch('/dashboard/data');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(prev => ({
                    ...prev,
                    admins: result.admins,
                    siswa: result.siswa,
                }));
            } catch (error) {
                console.error('Error fetching detailed data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCountData();
        fetchData();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <ErrorBoundary>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-2xl text-gray-900">Admin Dashboard</h2>}
            >
                <Head title="Dashboard" />

                <div className="py-12 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                        <div className=" flex justify-between">
                            <div className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 text-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl">
                                <h3 className="text-lg font-semibold">Total Admin</h3>
                                <p className="text-3xl font-bold mt-2">{data.totalAdmins !== null ? data.totalAdmins : 'Loading...'}</p>
                                <a href="/users" className="text-yellow-300 mt-4 inline-block hover:underline">Lihat Lebih Banyak</a>
                            </div>
                            <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl">
                                <h3 className="text-lg font-semibold">Total Siswa</h3>
                                <p className="text-3xl font-bold mt-2">{data.totalSiswa !== null ? data.totalSiswa : 'Loading...'}</p>
                                <a href="/adminsiswa" className="text-purple-300 mt-4 inline-block hover:underline">Lihat Lebih Banyak</a>
                            </div>
                            
                        </div>

                       
                        {/* Tables for Admins, Siswa, and Courses */}
                        <div className="mt-12 space-y-8">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Admins</h3>
                                <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium">ID</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium">Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium">Email</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {data.admins.slice(0, 5).map(admin => (
                                                <tr key={admin.id}>
                                                    <td className="px-6 py-4 text-sm text-gray-500">{admin.id}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">{admin.name}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">{admin.email}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <a href="/users" className="text-purple-600 hover:underline block text-center py-4">Lihat Lebih Banyak</a>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Siswa</h3>
                                <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium">ID</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium">Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium">Email</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {data.siswa.slice(0, 5).map(siswa => (
                                                <tr key={siswa.id}>
                                                    <td className="px-6 py-4 text-sm text-gray-500">{siswa.id}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">{siswa.nama}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">{siswa.email}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <a href="/adminsiswa" className="text-yellow-600 hover:underline block text-center py-4">Lihat Lebih Banyak</a>
                                </div>
                            </div>

                            
                        </div>
                    </div>
                </div>

                <footer className="bg-white border-t border-gray-200 shadow py-6 px-4 sm:px-6 lg:px-8 mt-12">
                    <p className="text-center text-gray-500 text-sm">
                        &copy; 2024 Admin Dashboard - Made with ❤️ by Zema
                    </p>
                </footer>
            </AuthenticatedLayout>
        </ErrorBoundary>
    );
}
