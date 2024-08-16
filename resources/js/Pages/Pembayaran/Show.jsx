import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';

export default function Show({ pembayaran, totalBayar, sisaBayar }) {
    const { data, setData, post, processing, errors } = useForm({
        jumlah: '',
    });

    // Handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('pembayaran.bayar-cicilan', pembayaran.id));
    };

    // Function to generate PDF
    const generatePDF = () => {
        const input = document.getElementById('pdf-content');
        html2canvas(input, { useCORS: true }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4'); // Create PDF instance
    
            // Header
            const logoUrl = '/images/Logo color.png'; // Replace with your logo URL
            pdf.addImage(logoUrl, 'PNG', 10, 10, 30, 30); // Logo
            pdf.setFontSize(18);
            pdf.text('Kuitansi Pembayaran', 105, 20, { align: 'center' });
            pdf.setFontSize(12);
            pdf.text('Tanggal: ' + new Date().toLocaleDateString(), 105, 30, { align: 'center' });
    
            // Draw line under header
            pdf.setDrawColor(0, 0, 0);
            pdf.setLineWidth(1);
            pdf.line(10, 45, 200, 45); // Line width and position
    
            // Add content
            const imgWidth = 190; // Width adjusted for margins
            const pageHeight = 295; // A4 size height in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
    
            pdf.addImage(imgData, 'PNG', 10, 50, imgWidth, imgHeight); // Adjust content placement
            heightLeft -= pageHeight;
    
            while (heightLeft >= 0) {
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, -heightLeft, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
    
            pdf.save(`pembayaran_${pembayaran.siswa.nama}.pdf`);
        });
    };

    // Handle cicilan deletion
    const deleteCicilan = (id) => {
        if (window.confirm('Are you sure you want to delete this cicilan?')) {
            // Send delete request
            axios.delete(route('pembayaran.delete-cicilan', id))
                .then(() => {
                    // Reload or update the component after successful deletion
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('Error deleting cicilan:', error);
                    alert('Failed to delete cicilan.');
                });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
            <a href="/pembayaran" className="inline-block mb-4 px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition duration-300">Kembali</a>
            <h1 className="text-4xl font-bold mb-6 text-gray-900">Detail Pembayaran</h1>
            
            <div id="pdf-content" className="p-6 bg-white rounded-lg shadow-sm">
                <div className="mb-8">
                    <p className="text-xl font-semibold text-gray-800">Siswa:</p>
                    <p className="text-xl text-gray-700">{pembayaran.siswa.nama}</p>
                </div>

                <div className="mb-8">
                    <p className="text-xl font-semibold text-gray-800">Total Tagihan:</p>
                    <p className="text-xl text-gray-700">Rp {new Intl.NumberFormat('id-ID').format(pembayaran.jumlah)}</p>
                </div>

                <div className="mb-8">
                    <p className="text-xl font-semibold text-gray-800">Total Bayar:</p>
                    <p className="text-xl text-gray-700">Rp {new Intl.NumberFormat('id-ID').format(totalBayar)}</p>
                </div>

                <div className="mb-8">
                    <p className="text-xl font-semibold text-gray-800">Sisa Bayar:</p>
                    <p className="text-xl text-gray-700">Rp {new Intl.NumberFormat('id-ID').format(sisaBayar)}</p>
                </div>

                <h2 className="text-3xl font-semibold mb-6 text-gray-900">Riwayat Cicilan</h2>
                <ul className="list-disc list-inside space-y-3">
                    {pembayaran.cicilan.map((c) => (
                        <li key={c.id} className="text-xl text-gray-700 flex items-center justify-between">
                            <span>Rp {new Intl.NumberFormat('id-ID').format(c.jumlah)} - {new Date(c.dibayar_pada).toLocaleDateString()}</span>
                            <button
                                onClick={() => deleteCicilan(c.id)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <h2 className="text-3xl font-semibold mt-8 mb-6 text-gray-900">Bayar Cicilan</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <input
                        type="number"
                        value={data.jumlah}
                        onChange={(e) => setData('jumlah', e.target.value)}
                        placeholder="Jumlah Cicilan"
                        className="w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    {errors.jumlah && <div className="text-red-600 text-sm mt-1">{errors.jumlah}</div>}
                </div>
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center px-8 py-3 bg-indigo-600 border border-transparent rounded-md font-semibold text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:border-indigo-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition ease-in-out duration-150"
                >
                    Bayar
                </button>
            </form>

            <button
                onClick={generatePDF}
                className="mt-8 inline-flex items-center px-8 py-3 bg-green-600 border border-transparent rounded-md font-semibold text-white uppercase tracking-widest hover:bg-green-700 active:bg-green-800 focus:outline-none focus:border-green-900 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition ease-in-out duration-150"
            >
                Export to PDF
            </button>
        </div>
    );
}
