import React from 'react';
import StudentLayout from '@/Layouts/StudentLayout';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Inertia } from '@inertiajs/inertia-react';


// Register chart.js components
Chart.register(...registerables);

const Dashboard = ({ totalKursus }) => {
  // Example data for the bar chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Jumlah Siswa',
        data: [10, 20, 30, 40, 50, 60, 70],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <StudentLayout >
      <div className="p-6">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold">Dashboard Siswa</h1>
        </header>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Info Cards */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total Kursus</h2>
            <p className="text-3xl font-bold">{totalKursus}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Jumlah Siswa</h2>
            <p className="text-3xl font-bold">120</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Kursus Terbaru</h2>
            <p className="text-3xl font-bold">5</p>
          </div>

          {/* Chart */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Statistik Siswa</h2>
            <Bar data={data} options={{ responsive: true }} />
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-4 mt-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Aktivitas Terbaru</h2>
          <ul>
            <li>Update kursus 'React untuk Pemula' - 20 Juli 2024</li>
            <li>Penambahan 10 siswa baru - 18 Juli 2024</li>
            <li>Kursus 'Laravel Lanjut' selesai - 15 Juli 2024</li>
          </ul>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Dashboard;
