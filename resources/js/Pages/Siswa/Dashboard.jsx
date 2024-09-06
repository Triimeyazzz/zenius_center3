import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from "recharts";
import StudentLayout from '@/Layouts/StudentLayout';
import { FaInfoCircle, FaMoneyBillWave, FaClipboardCheck, FaChartLine } from 'react-icons/fa';

const Dashboard = ({ siswaInfo, pembayaranInfo, absensiInfo, attendancePerMonth, tryOutInfo, user, siswa }) => {
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const [isLineChart, setIsLineChart] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subtopics, setSubtopics] = useState([]);

  const toggleChartType = () => {
    setIsLineChart(!isLineChart);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { mata_pelajaran, tanggal_pelaksanaan, average_score } = payload[0].payload;
      return (
        <div className="bg-white border rounded p-2 shadow-md">
          <p className="font-semibold">{mata_pelajaran}</p>
          <p>{`Tanggal: ${tanggal_pelaksanaan}`}</p>
          <p>{`Skor Rata-rata: ${average_score}`}</p>
        </div>
      );
    }
    return null;
  };

  const fetchSubtopics = async (subject) => {
    const response = await axios.get(`/siswa/dashboard/subtopics/${subject}`);
    setSubtopics(response.data);
};


  const closeSubtopicModal = () => {
    setSelectedSubject(null);
    setSubtopics([]);
  };

  const SubtopicModal = ({ subject, subtopics, onClose }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Subtopik untuk {subject}</h2>
          <ul>
            {subtopics.map((subtopic, index) => (
              <li key={index} className="text-gray-700">
                {subtopic.name} {/* Adjust based on your subtopic data structure */}
              </li>
            ))}
          </ul>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
            onClick={onClose}
          >
            Tutup
          </button>
        </div>
      </div>
    );
  };

  return (
    <StudentLayout siswa={siswa}>
      <Head title="Dashboard Siswa" />

      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 text-center text-purple-600">Selamat Datang {siswaInfo.nama}</h1>

        {/* Student Info Section */}
        <div className="mb-6 p-6 bg-white rounded-lg shadow-lg border-l-4 border-purple-500">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600 flex items-center">
            <FaInfoCircle className="mr-2" /> Informasi Siswa
          </h2>
          <p className="mb-4 text-gray-700">
            Berikut adalah informasi penting mengenai Anda. 
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/** Student info cards **/}
            {Object.entries(siswaInfo).map(([key, value], index) => (
              <div className="p-4 bg-gray-100 rounded-lg shadow hover:shadow-xl transition-shadow duration-300" key={index}>
                <p><strong>{key.replace(/_/g, ' ').toUpperCase()}:</strong> {value || 'Tidak tersedia'}</p>
              </div>
            ))}
            <p><strong>Foto</strong>
            <img                                                 
            src={`/storage/fotos/${siswaInfo.foto}`}
            alt="Foto siswa"
            className="w-36 h-36 object-cover rounded-full border-2 border-gray-200"
            />
            </p>
          </div>
        </div>

        {/* Payment Info Section */}
        <div className="mb-6 p-6 bg-white rounded-lg shadow-lg border-l-4 border-green-500">
          <h2 className="text-xl font-semibold mb-4 text-green-600 flex items-center">
            <svg className="w-6 h-6 mr-2 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18M3 9h18M3 15h18M3 21h18" />
            </svg>
            Informasi Pembayaran
          </h2>
          <p className="mb-4 text-gray-700">
            Lihat informasi terkait pembayaran Anda.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-100 rounded shadow">
              <p className="font-bold text-gray-800">Total Tagihan:</p>
              <p className="text-green-600 font-semibold">Rp {pembayaranInfo.totalTagihan.toLocaleString()}</p>
              <div className="w-full bg-gray-300 rounded h-2">
                <div className="bg-green-500 h-2 rounded" style={{ width: `${(pembayaranInfo.totalBayar / pembayaranInfo.totalTagihan) * 100}%` }}></div>
              </div>
            </div>
            <div className="p-4 bg-gray-100 rounded shadow">
              <p className="font-bold text-gray-800">Total Bayar:</p>
              <p className="text-green-600 font-semibold">Rp {pembayaranInfo.totalBayar.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded shadow">
              <p className="font-bold text-gray-800">Sisa Tagihan:</p>
              <p className="text-red-600 font-semibold">Rp {pembayaranInfo.sisaTagihan.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Monthly Attendance Section */}
        <div className="mb-6 p-6 bg-white rounded-lg shadow-lg border-l-4 border-blue-500">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 flex items-center">
            <FaClipboardCheck className="mr-2" /> Absensi Per Bulan
          </h2>
          <p className="mb-4 text-gray-700">
            Berikut adalah ringkasan kehadiran Anda selama setiap bulan. Cek apakah ada bulan dengan kehadiran yang perlu ditingkatkan.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-2 border-b text-blue-700">Bulan</th>
                  <th className="px-4 py-2 border-b text-blue-700">Total Hadir</th>
                </tr>
              </thead>
              <tbody>
                {attendancePerMonth.map((item, index) => (
                  <tr key={index} className="hover:bg-blue-50">
                    <td className="px-4 py-2 border-b text-gray-800">{monthNames[item.bulan - 1]}</td>
                    <td className="px-4 py-2 border-b text-gray-800">{item.total_hadir}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Attendance Section */}
        <div className="mb-6 p-6 bg-white rounded-lg shadow-lg border-l-4 border-indigo-500">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600 flex items-center">
            <FaClipboardCheck className="mr-2" /> Absensi Terbaru
          </h2>
          <p className="mb-4 text-gray-700">
            Lihat rincian kehadiran Anda yang terbaru. Perhatikan setiap kehadiran yang mungkin memerlukan perhatian.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="px-4 py-2 border-b text-indigo-700">Tanggal</th>
                  <th className="px-4 py-2 border-b text-indigo-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {absensiInfo.map((item, index) => (
                  <tr key={index} className="hover:bg-indigo-50">
                    <td className="px-4 py-2 border-b text-gray-800">{item.tanggal}</td>
                    <td className="px-4 py-2 border-b text-gray-800">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tryout Section */}
        <div className="mb-6 p-6 bg-white rounded-lg shadow-lg border-l-4 border-orange-500">
          <h2 className="text-2xl font-semibold mb-4 text-orange-600 flex items-center">
            <FaChartLine className="mr-2" /> Rangkuman Tryout
          </h2>
          <p className="mb-4 text-gray-700">
            Berikut adalah ringkasan nilai tryout Anda. Klik untuk melihat subtopik terkait.
          </p>
          <ResponsiveContainer width="100%" height={300}>
            {isLineChart ? (
              <LineChart data={tryOutInfo}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mata_pelajaran" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="average_score" stroke="#82ca9d" />
              </LineChart>
            ) : (
              <BarChart data={tryOutInfo}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mata_pelajaran" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="average_score" fill="#8884d8" />
              </BarChart>
            )}
          </ResponsiveContainer>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
            onClick={toggleChartType}
          >
            {isLineChart ? 'Tampilkan sebagai Bar Chart' : 'Tampilkan sebagai Line Chart'}
          </button>
          {tryOutInfo.map((item, index) => (
            <div key={index} className="mt-4 cursor-pointer text-blue-600 hover:underline" onClick={() => {
              setSelectedSubject(item.mata_pelajaran);
              fetchSubtopics(item.mata_pelajaran);
            }}>
              {item.mata_pelajaran}
            </div>
          ))}
        </div>

        {selectedSubject && (
          <SubtopicModal subject={selectedSubject} subtopics={subtopics} onClose={closeSubtopicModal} />
        )}
      </div>
    </StudentLayout>
  );
};

export default Dashboard;
