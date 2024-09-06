import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Progress = ({ siswa, chartData }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subtopics, setSubtopics] = useState([]);

  const averageData = chartData.datasets.map(dataset => ({
    mataPelajaran: dataset.label,
    averageScore: dataset.averageScore,
    date: dataset.data[0].x, // Get the date from the first entry
    subtopics: dataset.data[0].subtopics, // Get subtopics from the first entry
  }));

  const handleBarClick = (data) => {
    setSelectedSubject(data.mataPelajaran);
    const selectedData = averageData.find(item => item.mataPelajaran === data.mataPelajaran);
    if (selectedData) {
      setSubtopics(selectedData.subtopics || []);
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <div className="flex justify-between mb-4">
        <a href="/tryout" className="text-white hover:text-white transition duration-200 bg-purple-700 p-2 rounded hover:bg-purple-800">Kembali</a>
        <a href={route('tryout.create', siswa.id)} className="text-white hover:text-white transition duration-200 bg-purple-700 p-2 rounded hover:bg-purple-800">Tambah nilai</a>
      </div>

      <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">Progress - {siswa.nama}</h1>

      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105">
          <BarChart width={800} height={400} data={averageData}>
            <XAxis dataKey="mataPelajaran" stroke="#4a5568" />
            <YAxis stroke="#4a5568" />
            <CartesianGrid stroke="#e2e8f0" strokeDasharray="5 5" />
            <Tooltip formatter={(value, name, props) => [`${value} (Date: ${props.payload.date})`, name]} />
            <Legend />
            <Bar dataKey="averageScore" fill="#7b1fa1 " onClick={handleBarClick} />
          </BarChart>
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        {chartData.datasets.map((dataset, index) => (
          <div key={index} className="mb-4 border-b border-gray-300 pb-2">
            <h2 className="font-semibold text-lg text-purple-600">{dataset.label}</h2>
            <p className="text-gray-600">Nilai Rata-rata: <span className="font-bold text-purple-700">{dataset.averageScore}</span></p>
          </div>
        ))}
      </div>

      {selectedSubject && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-purple-600">Subtopics dari {selectedSubject}</h2>
          <ul className="list-disc list-inside">
            {subtopics.length > 0 ? (
              subtopics.map((subtopic, index) => (
                <li key={index} className="text-gray-700">
                  {subtopic.sub_mata_pelajaran}: <span className="font-bold">{subtopic.skor}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-700">Tidak ada subtopics.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Progress;
