import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Link } from '@inertiajs/inertia-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ExampleChart = ({ data = {}, siswa }) => {
    const [selectedSubtopics, setSelectedSubtopics] = useState([]);

    const labels = data.labels || [];
    const datasets = data.datasets || [];

    // Prepare chart data
    const chartData = {
        labels: labels,
        datasets: datasets.map(dataset => ({
            ...dataset,
            data: dataset.data.map(point => ({
                x: point.x,
                y: point.y,
                subtopics: point.subtopics || [],
            })),
        })),
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    title: (tooltipItems) => `Tanggal: ${tooltipItems[0].label}`,
                    label: (tooltipItem) => `Skor: ${tooltipItem.raw} (${tooltipItem.dataset.label})`,
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Tanggal',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Skor',
                },
                beginAtZero: true,
            },
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const elementIndex = elements[0].index;
                const datasetIndex = elements[0].datasetIndex;
                const subtopics = chartData.datasets[datasetIndex]?.data[elementIndex]?.subtopics || [];
                console.log('Poin Data yang Dipilih:', chartData.datasets[datasetIndex]?.data[elementIndex]);
                console.log('Subtopik:', subtopics);
                setSelectedSubtopics(subtopics);
            }
        },
    };

    useEffect(() => {
        console.log('Subtopik yang Dipilih:', selectedSubtopics);
    }, [selectedSubtopics]);

    return (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-extrabold text-gray-800">
                    Grafik Kemajuan <span className="text-purple-600">{siswa?.nama || 'Siswa'}</span>
                </h1>
                <div>
                    <a 
                        href={`/tryout/${siswa?.id}/create`} 
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-indigo-700 transition duration-300 ease-in-out"
                    >
                        Tambah Data
                    </a>
                    <a 
                        href={route('tryout.index')}
                        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out"
                    >
                        Kembali ke Index
                    </a>
                </div>
            </div>
            <div className="mb-6">
                <Line data={chartData} options={options} />
            </div>
            <div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">Subtopik:</h3>
                <div className="space-y-4">
                    {selectedSubtopics.length > 0 ? (
                        selectedSubtopics.map((subtopic, index) => (
                            <div key={index} className="bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-sm">
                                <h4 className="text-xl font-semibold text-indigo-600">{subtopic.sub_mata_pelajaran}</h4>
                                <p className="text-gray-700">Skor: {subtopic.skor}</p>
                            </div>
                        ))
                    ) : (
                        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-sm">
                            <p className="text-gray-500">Tidak ada subtopik tersedia</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExampleChart;
