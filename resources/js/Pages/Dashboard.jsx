import React, { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "axios";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
} from "recharts"; // Ensure these components are imported
import {
    FaUser,
    FaChalkboardTeacher,
    FaMoneyBillWave,
    FaFileInvoiceDollar,
} from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment-hijri";
function MyBarChart({ data }) {
    const formattedData = data.map((item) => ({
        ...item,
        total: item.total
            .toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })
            .replace("Rp", "")
            .trim(),
    }));
}
function sortDataByMonth(data) {
    const monthOrder = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];
    return data.sort(
        (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
    );
}

function Dashboard({ auth }) {
    const [dashboardData, setDashboardData] = useState(null);
    const [detailedData, setDetailedData] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [chartType, setChartType] = useState("bar");
    const [notes, setNotes] = useState({});
    const [currentNote, setCurrentNote] = useState("");
    useEffect(() => {
        // Retrieve notes from localStorage on component mount
        const savedNotes = localStorage.getItem("notes");
        if (savedNotes) {
            setNotes(JSON.parse(savedNotes));
        }
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleNoteChange = (e) => {
        setCurrentNote(e.target.value);
    };

    const saveNote = () => {
        const dateKey = selectedDate.toDateString();
        const updatedNotes = {
            ...notes,
            [dateKey]: currentNote,
        };

        // Update state and save notes to localStorage
        setNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
        setCurrentNote(""); // Clear the current note input
    };

    const deleteNote = (dateKey) => {
        const updatedNotes = { ...notes };
        delete updatedNotes[dateKey];

        // Update state and save updated notes to localStorage
        setNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
    };

    const getMonthlyNotes = (month, year) => {
        return Object.entries(notes)
            .filter(([date]) => {
                const noteDate = new Date(date);
                return noteDate.getMonth() === month && noteDate.getFullYear() === year;
            })
            .map(([date, note]) => (
                <div key={date} className="border rounded-lg p-3 mb-2 bg-gray-100 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center">
                    <div>
                        <strong>{date}</strong>: {note}
                    </div>
                    <button
                        onClick={() => deleteNote(date)}
                        className="ml-4 bg-red-500 text-white rounded-lg px-2 py-1 hover:bg-red-600 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            ));
    };

    const tileClassName = ({ date, view }) => {
        const dateKey = date.toDateString();
        const today = new Date();
        let classes = "";
    
        if (view === "month") {
            // Highlight today's date
            if (
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()
            ) {
                classes += " bg-blue-200 rounded-full"; // Highlight today
            }
    
            // Check if there's a note for this date and add a visible border
            if (notes[dateKey]) {
                classes += " border-2 border-red-500"; // Add a border if a note exists
            }
        }
        return classes;
    };
        useEffect(() => {
        const fetchData = async () => {
            try {
                const [countResponse, dataResponse] = await Promise.all([
                    axios.get("/api/dashboard/count"),
                    axios.get("/api/dashboard/data"),
                ]);
                setDashboardData(countResponse.data);
                setDetailedData(dataResponse.data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchData();
    }, []);

    const formatNumber = (num) => {
        return num
            .toLocaleString("id-ID", { style: "currency", currency: "IDR" })
            .replace("Rp", "");
    };

    const formatMonthName = (month) => {
        const monthNames = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];
        return monthNames[month - 1];
    };

    
    const hijriDate = moment(selectedDate).format("iDD/iMM/iYYYY");

    const handleToggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {dashboardData ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <DashboardCard
                                        title="Total Admins"
                                        value={dashboardData.totalAdmins}
                                        icon={<FaUser />}
                                    />
                                    <DashboardCard
                                        title="Total Siswa"
                                        value={dashboardData.totalSiswa}
                                        icon={<FaChalkboardTeacher />}
                                    />
                                    <DashboardCard
                                        title="Total Pemasukan"
                                        value={formatNumber(
                                            dashboardData.totalPemasukan
                                        )}
                                        icon={<FaMoneyBillWave />}
                                    />
                                    <DashboardCard
                                        title="Sisa Tagihan"
                                        value={formatNumber(
                                            dashboardData.sisaTagihan
                                        )}
                                        icon={<FaFileInvoiceDollar />}
                                    />
                                </div>
                            ) : (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="animate-spin h-5 w-5 border-4 border-t-4 border-gray-300 rounded-full border-t-purple-500"></div>
                                    <p className="text-gray-500">
                                        Sedang memuat data....
                                    </p>
                                </div>
                            )}

                            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                                {detailedData && (
                                    <>
                                        <DataTable
                                            title="List beberapa Admins"
                                            data={detailedData.admins}
                                            fields={["name", "email", ]}
                                        />
                                        <DataTableSiswa
                                            title="Daftar beberapa Siswa"
                                            data={detailedData.siswa}
                                            fields={["nama", "email", "foto"]}
                                        />

                                    </>
                                )}
                            </div>

                            {dashboardData &&
                                dashboardData.pemasukanPerBulan && (
                                    <div className="mt-10 ">
                                        <h3 className="text-lg font-semibold mb-4">
                                            Pemasukan Per Bulan
                                        </h3>
                                        <div className="mb-4">
                                            <button
                                                onClick={() =>
                                                    setChartType("bar")
                                                }
                                                className={`mr-2 px-4 py-2 rounded ${
                                                    chartType === "bar"
                                                        ? "bg-purple-600 text-white rounded-md shadow-sm"
                                                        : "bg-gray-200 text-gray-700"
                                                }`}
                                            >
                                                Bar Chart
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setChartType("line")
                                                }
                                                className={`mr-2 px-4 py-2 rounded ${
                                                    chartType === "line"
                                                        ? "bg-purple-600 text-white rounded-md shadow-sm"
                                                        : "bg-gray-200 text-gray-700"
                                                }`}
                                            >
                                                Line Chart
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setChartType("pie")
                                                }
                                                className={`px-4 py-2 rounded ${
                                                    chartType === "pie"
                                                        ? "bg-purple-600 text-white rounded-md shadow-sm"
                                                        : "bg-gray-200 text-gray-700"
                                                }`}
                                            >
                                                Pie Chart
                                            </button>
                                        </div>
                                        <ChartComponent
                                            data={
                                                dashboardData.pemasukanPerBulan
                                            }
                                            formatMonthName={formatMonthName}
                                            chartType={chartType}
                                        />
                                    </div>
                                )}
<div className="flex flex-wrap justify-between mt-10">
        <div className="w-full md:w-1/2 p-2">
            <h3 className="text-lg font-semibold mb-4">Kalender Gregorian</h3>
            <div className="border rounded-lg shadow-lg p-4 bg-white">
                <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    className="react-calendar rounded-lg"
                    tileClassName={tileClassName}
                    tileContent={({ date }) => (
                        <div className="text-sm text-gray-700">{date.getDate()}</div>
                    )}
                />
                <div className="mt-4">
                    <h4 className="text-md font-semibold">Notes for {selectedDate.toDateString()}:</h4>
                    <textarea
                        value={currentNote}
                        onChange={handleNoteChange}
                        className="border rounded-lg w-full p-2 mt-2"
                        rows={3}
                    />
                    <button
                        onClick={saveNote}
                        className="mt-2 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors"
                    >
                        Save Note
                    </button>
                </div>
            </div>
        </div>

        <div className="w-full md:w-1/2 p-2">
            <h3 className="text-lg font-semibold mb-4">Saved Notes</h3>
            <div className="bg-white border rounded-lg shadow-lg p-4">
                {getMonthlyNotes(selectedDate.getMonth(), selectedDate.getFullYear())}
            </div>
        </div>
    </div><div>
    <div className="">
                                    <h3 className="text-lg font-semibold mb-4 mt-8">
                                        Kalender Hijriah
                                    </h3>
                                    <div className="border rounded-lg shadow-lg p-4">
                                        <h4 className="text-md font-semibold">
                                            Tanggal hijriah hari ini: {hijriDate}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function DashboardCard({ title, value, icon }) {
    return (
        <div className="bg-gradient-to-r from-purple-500 to-yellow-500 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center">
            <div className="text-4xl mr-4 text-white">{icon}</div>
            <div className="text-white">
                <h3 className="text-lg font-semibold mb-1">{title}</h3>
                <p className="text-1xl font-bold hover:scale-125 duration-300">{value}</p>
            </div>
        </div>
    );
}

function DataTable({ title, data, fields }) {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <h4 className="text-md font-semibold mb-2 px-4 py-2 border-b bg-purple-500 text-white transition-colors duration-200">
                {title}
            </h4>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-purple-100">
                    <tr>
                        {fields.map((field) => (
                            <th
                                key={field}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {field}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item, index) => (
                        <tr
                            key={index}
                            className={`hover:bg-gray-100 transition-colors duration-200 ${
                                index % 2 === 0 ? "bg-gray-50" : ""
                            }`}
                        >
                            {fields.map((field) => (
                                <td
                                    key={field}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {field === "foto" ? (
                                        <img
                                        src={`storage/fotos/${item.foto}`}
                                        alt="Student Photo"
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        item[field]
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <a href="/users" className="block text-center text-purple-500 hover:text-purple-700">Lihat lebih banyak</a>
        </div>
    );
}

function DataTableSiswa({ title, data, fields }) {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden ">
            <h4 className="text-md font-semibold mb-2 px-4 py-2 border-b bg-purple-500 text-white transition-colors duration-200">
                {title}
            </h4>
            <div className="grid grid-cols-4 gap-4 p-4 ">
                {data.map((item, index) => (
                    <div key={index} className="flex flex-col items-center hover:scale-110 duration-300">
                        <img
                            src={`storage/fotos/${item.foto}`}
                            alt={`${item.nama}'s photo`}
                            className="w-16 h-16 rounded-full object-cover mb-2"
                        />
                        <p className="text-sm font-semibold text-center">{item.nama}</p>
                        <p className="text-xs text-gray-500">{item.email}</p>
                    </div>
                ))}
            </div>
            <a href="/adminsiswa" className="text-center text-purple-500 hover:text-purple-700 flex justify-center my-5 ">Lihat lebih banyak</a>
        </div>
    );
}

function ChartComponent({ data, formatMonthName, chartType }) {
    const formattedData = data.map((item) => ({
        ...item,
        month: formatMonthName(item.month),
        total: parseFloat(
            item.total
                .toLocaleString("id-ID", { style: "currency", currency: "IDR" })
                .replace("Rp", "")
                .replace(/\./g, "")
                .replace(",", ".")
        ),
    }));

    const sortedData = sortDataByMonth(formattedData);

    const COLORS = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042",
        "#8884d8",
        "#82ca9d",
    ];

    const renderChart = () => {
        switch (chartType) {
            case "line":
                return (
                    <LineChart
                        data={sortedData}
                        margin={{ top: 30, right: 30, left: 20, bottom: 30 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis className="text-xs" tickFormatter={(value) => `Rp ${value}`} />
                        <Tooltip
                            formatter={(value) => [
                                `Rp ${value.toLocaleString("id-ID")}`,
                                "Total",
                            ]}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="total"
                            stroke="#7b1fa1"
                        />
                    </LineChart>
                );
            case "pie":
                return (
                    <PieChart
                        margin={{ top: 30, right: 30, left: 20, bottom: 30 }}
                    >
                        <Pie
                            data={sortedData}
                            dataKey="total"
                            nameKey="month"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            fill="#8884d8"
                            label={({ name, percent }) =>
                                `${name} ${(percent * 100).toFixed(0)}%`
                            }
                        >
                            {sortedData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => [
                                `Rp ${value.toLocaleString("id-ID")}`,
                                "Total",
                            ]}
                        />
                        <Legend />
                    </PieChart>
                );
            default:
                return (
                    <BarChart
                        data={sortedData}
                        margin={{ top: 30, right: 30, left: 20, bottom: 30 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis className="text-xs" tickFormatter={(value) => `Rp ${value}`} />
                        <Tooltip
                            formatter={(value) => [
                                `Rp ${value.toLocaleString("id-ID")}`,
                                "Total",
                            ]}
                        />
                        <Legend />
                        <Bar dataKey="total" fill="#21409a" />
                    </BarChart>
                );
        }
        console.log(sortedData);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4 -z-0 ">
            <ResponsiveContainer width="100%" height={400}>
                {renderChart()}
            </ResponsiveContainer>
        </div>
    );
}

export default Dashboard;