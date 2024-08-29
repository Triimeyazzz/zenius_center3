import React, { useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function Index({
    absensiGroupedByDate,
    classes,
    selectedClass,
    selectedDate,
    auth,
}) {
    const [kelas, setKelas] = useState(selectedClass || "");
    const [tanggal, setTanggal] = useState(selectedDate || "");
    const [periode, setPeriode] = useState("bulan");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [studentAbsences, setStudentAbsences] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const filterData = (data) => {
        let filteredData = {};

        Object.entries(data).forEach(([date, absensi]) => {
            const formattedDate = date.split("-").reverse().join("-");

            if (!filteredData[formattedDate]) {
                filteredData[formattedDate] = [];
            }

            filteredData[formattedDate].push(...absensi);
        });

        if (kelas) {
            Object.keys(filteredData).forEach((key) => {
                filteredData[key] = filteredData[key].filter(
                    (item) => item.siswa.kelas === kelas
                );
            });
        }

        if (periode === "tanggal" && tanggal) {
            const formattedDate = new Date(tanggal).toISOString().split("T")[0];
            filteredData = {
                [formattedDate]: filteredData[formattedDate] || [],
            };
        } else if (periode === "bulan" && selectedMonth) {
            filteredData = Object.keys(filteredData)
                .filter((key) => key.split("-")[1] === selectedMonth)
                .reduce((acc, key) => {
                    acc[key] = filteredData[key];
                    return acc;
                }, {});
        }

        if (searchQuery) {
            Object.keys(filteredData).forEach((key) => {
                filteredData[key] = filteredData[key].filter((item) =>
                    item.siswa.nama.toLowerCase().includes(searchQuery.toLowerCase())
                );
            });
        }

        return filteredData;
    };

    const filteredData = filterData(absensiGroupedByDate);

    const handleFilterChange = () => {
        window.location.href = route("absensi.index", {
            kelas,
            tanggal,
            periode,
            selectedMonth,
        });
    };

    const handleExportToExcel = () => {
        if (Object.keys(filteredData).length === 0) {
            alert("Data tidak tersedia untuk filter yang dipilih.");
            return;
        }

        const wb = XLSX.utils.book_new();

        Object.entries(filteredData).forEach(([date, records]) => {
            const dataToExport = records.map((record) => ({
                Tanggal: date,
                "Nama Siswa": record.siswa.nama,
                Kelas: record.siswa.kelas,
                Status: record.status,
                Keterangan: record.keterangan,
            }));

            const ws = XLSX.utils.json_to_sheet(dataToExport, {
                header: ["Tanggal", "Nama Siswa", "Kelas", "Status", "Keterangan"],
            });
            XLSX.utils.book_append_sheet(wb, ws, date);
        });

        XLSX.writeFile(wb, "daftar_absensi.xlsx");
    };

    const handleExportToPDF = () => {
        if (Object.keys(filteredData).length === 0) {
            alert("Data tidak tersedia untuk filter yang dipilih.");
            return;
        }

        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text("Daftar Absensi", 14, 22);

        const columns = ["Tanggal", "Nama Siswa", "Kelas", "Status", "Keterangan"];
        Object.entries(filteredData).forEach(([date, data]) => {
            const rows = data.map((item) => [
                date,
                item.siswa.nama,
                item.siswa.kelas,
                item.status,
                item.keterangan,
            ]);

            doc.autoTable({
                startY: doc.previousAutoTable ? doc.previousAutoTable.finalY + 10 : 30,
                head: [columns],
                body: rows,
                headStyles: { fillColor: [153, 50, 204], textColor: [255, 255, 255] },
                margin: { top: 40 },
            });
        });

        doc.save("daftar_absensi.pdf");
    };

    const getMonthOptions = () => {
        const months = Array.from({ length: 12 }, (_, i) =>
            new Date(0, i).toLocaleString("default", { month: "long" })
        );
        return months.map((month, i) => (
            <option key={i} value={`0${i + 1}`.slice(-2)}>
                {month}
            </option>
        ));
    };

    const handleDelete = (id) => {
        setDeletingId(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        Inertia.delete(route("absensi.destroy", deletingId), {
            onSuccess: () => {
                setShowModal(false);
                setDeletingId(null);
            },
            onError: () => {
                alert("Gagal menghapus siswa. Cek console untuk detail.");
            },
        });
    };

    const handleViewStudentAbsences = (studentId) => {
        const studentData = Object.values(absensiGroupedByDate)
            .flat()
            .filter((absensi) => absensi.siswa_id === studentId);
        setStudentAbsences(studentData);
        setSelectedStudentId(studentId);
    };

    const closeModal = () => {
        setShowModal(false);
        setDeletingId(null);
    };

    const handleCloseStudentModal = () => {
        setSelectedStudentId(null);
        setStudentAbsences([]);
    };

    return (
        <AuthenticatedLayout
            user={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Absensi</h2>}
        >
            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-purple-800">Daftar Absensi</h1>
                    <div className="flex space-x-4">
                        <Link
                            href={route("absensi.create")}
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition"
                        >
                            Buat Absen
                        </Link>
                        <button
                            onClick={handleExportToExcel}
                            className="bg-orange-600 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-700 transition"
                        >
                            Ekspor ke Excel
                        </button>
                        <button
                            onClick={handleExportToPDF}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
                        >
                            Ekspor ke PDF
                        </button>
                    </div>
                </div>
                <div className="bg-yellow-100 shadow-md rounded-lg p-6 mb-6">
                    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-4">
                        <input
                            type="text"
                            placeholder="Cari Nama Siswa..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border p-2 rounded-md w-full"
                        />
                        <select
                            value={kelas}
                            onChange={(e) => setKelas(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
                        >
                            <option value="">Pilih Kelas</option>
                            {classes.map((kelas, index) => (
                                <option key={index} value={kelas}>
                                    {kelas}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
                        >
                            <option value="">Pilih Bulan</option>
                            {getMonthOptions()}
                        </select>
                        <input
                            type="date"
                            value={tanggal}
                            onChange={(e) => setTanggal(e.target.value)}
                            className="border p-2 rounded-md w-full"
                        />
                        <button
                            onClick={handleFilterChange}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition w-full md:w-auto"
                        >
                            Filter
                        </button>
                    </div>
                </div>
                {Object.keys(filteredData).length === 0 ? (
                    <p className="text-center text-gray-500">
                        Tidak ada data untuk filter yang dipilih.
                    </p>
                ) : (
                    Object.keys(filteredData).map((date) => (
                        <div key={date} className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                Tanggal: {date}
                            </h2>
                            <table className="min-w-full divide-y divide-gray-200 bg-white border border-gray-300 rounded-lg shadow-md">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nama Siswa
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Kelas
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Keterangan
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredData[date].map((item, index) => (
                                        <tr key={index}>
                                            <td
                                                className="border px-4 py-2 cursor-pointer text-purple-600 hover:text-purple-900"
                                                onClick={() =>
                                                    handleViewStudentAbsences(
                                                        item.siswa_id
                                                    )
                                                }
                                            >
                                                {item.siswa.nama}
                                            </td>{" "}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {item.siswa.kelas}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {item.status}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {item.keterangan}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <button
                                                    onClick={() =>
                                                        handleDelete(item.id)
                                                    }
                                                    className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))
                )}

                {/* Modal for confirmation */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-lg font-semibold mb-4">
                                Konfirmasi Hapus
                            </h3>
                            <p>Apakah Anda yakin ingin menghapus data ini?</p>
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={confirmDelete}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
                                >
                                    Hapus
                                </button>
                                <button
                                    onClick={closeModal}
                                    className="ml-4 bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal for viewing student absences */}
                {selectedStudentId && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
                            <h3 className="text-lg font-semibold mb-4">
                                Absensi Siswa
                            </h3>
                            <table className="min-w-full divide-y divide-gray-200 bg-white border border-gray-300 rounded-lg shadow-md">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tanggal
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Keterangan
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {studentAbsences.map((absence) => (
                                        <tr key={absence.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {absence.tanggal}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {absence.status}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {absence.keterangan}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button
                                onClick={handleCloseStudentModal}
                                className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
