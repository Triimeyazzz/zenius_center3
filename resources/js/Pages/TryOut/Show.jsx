import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { Chart, registerables } from "chart.js";
import DeleteConfirmationModal from "@/Components/DeleteConfirmationModal"; // Adjust the path as needed

Chart.register(...registerables);

const Show = () => {
    const { siswa, tryOuts } = usePage().props;
    const [mataPelajaran, setMataPelajaran] = useState("");
    const [skor, setSkor] = useState("");
    const [tanggalPelaksanaan, setTanggalPelaksanaan] = useState("");
    const [chart, setChart] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTryOutId, setSelectedTryOutId] = useState(null);

    // Function to initialize or update the chart
    const updateChart = (data) => {
        const ctx = document.getElementById("tryOutChart").getContext("2d");

        if (chart) {
            chart.destroy(); // Destroy the previous chart instance if it exists
        }

        const newChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: "Skor",
                        data: data.scores,
                        backgroundColor: "#7b1fa1",
                        borderColor: "#7b1fa1",
                        borderWidth: 2,
                        fill: false,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            title: (tooltipItems) => {
                                // Get the index of the hovered item
                                const index = tooltipItems[0].dataIndex;
                                // Return the corresponding date for the tooltip
                                return `Tanggal: ${data.dates[index]}`;
                            },
                            label: (tooltipItem) => {
                                // Return the label for the tooltip
                                return `Skor: ${tooltipItem.raw}`;
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Mata Pelajaran",
                        },
                        grid: {
                            display: false,
                        },
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: "Skor",
                        },
                        grid: {
                            borderDash: [5, 5],
                        },
                    },
                },
            },
        });

        setChart(newChart);
    };

    // Initialize chart with existing data when component mounts
    useEffect(() => {
        const data = {
            labels: tryOuts.map((to) => to.mata_pelajaran),
            scores: tryOuts.map((to) => to.skor),
            dates: tryOuts.map((to) =>
                new Date(to.tanggal_pelaksanaan).toLocaleDateString()
            ), // Format the date
        };
        updateChart(data);
    }, [tryOuts]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            id_siswa: siswa.id,
            mata_pelajaran: mataPelajaran,
            skor: skor,
            tanggal_pelaksanaan: tanggalPelaksanaan,
        };

        axios
            .post("/try_out", data)
            .then((response) => {
                alert("Data try out berhasil ditambahkan.");
                const updatedTryOuts = [...tryOuts, response.data];
                const chartData = {
                    labels: updatedTryOuts.map((to) => to.mata_pelajaran),
                    scores: updatedTryOuts.map((to) => to.skor),
                    dates: updatedTryOuts.map((to) =>
                        new Date(to.tanggal_pelaksanaan).toLocaleDateString()
                    ),
                };
                updateChart(chartData);
            })
            .catch((error) => {
                console.error(
                    "There was an error adding the try out data:",
                    error
                );
            });
    };

    const handleDelete = (id) => {
        setSelectedTryOutId(id);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if (selectedTryOutId !== null) {
            axios
                .delete(`/try_out/${selectedTryOutId}`)
                .then(() => {
                    alert("Data try out berhasil dihapus.");
                    const updatedTryOuts = tryOuts.filter(
                        (to) => to.id !== selectedTryOutId
                    );
                    const chartData = {
                        labels: updatedTryOuts.map((to) => to.mata_pelajaran),
                        scores: updatedTryOuts.map((to) => to.skor),
                        dates: updatedTryOuts.map((to) =>
                            new Date(
                                to.tanggal_pelaksanaan
                            ).toLocaleDateString()
                        ),
                    };
                    updateChart(chartData);
                    setSelectedTryOutId(null);
                    setIsModalOpen(false);
                })
                .catch((error) => {
                    console.error(
                        "There was an error deleting the try out data:",
                        error
                    );
                });
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
            <img
                src="/images/Reverse.png"
                alt="Logo"
                className="mx-auto mb-4 w-32 h-auto"
            />

            <h1 className="text-3xl font-extrabold mb-6 text-gray-800">
                Data Try Out {siswa.nama}
            </h1>

            <div className="mb-8">
                <canvas
                    id="tryOutChart"
                    className="w-full h-80 border border-gray-300 rounded-lg"
                ></canvas>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Mata Pelajaran
                        </label>
                        <input
                            type="text"
                            value={mataPelajaran}
                            onChange={(e) => setMataPelajaran(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Skor
                        </label>
                        <input
                            type="number"
                            value={skor}
                            onChange={(e) => setSkor(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Tanggal Pelaksanaan
                        </label>
                        <input
                            type="date"
                            value={tanggalPelaksanaan}
                            onChange={(e) =>
                                setTanggalPelaksanaan(e.target.value)
                            }
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Tambah Data
                    </button>
                    <a
                        href="/try_out"
                        className="text-purple-500 hover:underline text-lg"
                    >
                        Kembali
                    </a>
                </div>
            </form>

            {/* TryOut List */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Try Out Data</h2>
                <ul className="space-y-4">
                    {tryOuts.map((to) => (
                        <li
                            key={to.id}
                            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50"
                        >
                            <div>
                                <p className="text-lg font-medium">
                                    {to.mata_pelajaran}
                                </p>
                                <p className="text-gray-600">Skor: {to.skor}</p>
                                <p className="text-gray-600">
                                    Tanggal:{" "}
                                    {new Date(
                                        to.tanggal_pelaksanaan
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                            <button
                                onClick={() => handleDelete(to.id)}
                                className="ml-4 text-red-600 hover:text-red-800 focus:outline-none"
                            >
                                Hapus
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default Show;
