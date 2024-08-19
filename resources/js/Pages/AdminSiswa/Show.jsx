import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Show = ({ siswa }) => {

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);

        // Title
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text('Detail Siswa', 14, 20);
        doc.setFont('helvetica', 'normal');

        // Header
        doc.setFontSize(14);
        doc.setTextColor(100);
        doc.text('Informasi Siswa', 14, 30);

        // Student Information
        const studentData = [
            ['Nama', siswa.nama],
            ['Email', siswa.email],
            ['Jenis Kelamin', siswa.jenis_kelamin],
            ['Tempat Lahir', siswa.tempat_lahir],
            ['Tanggal Lahir', new Date(siswa.tanggal_lahir).toLocaleDateString()],
            ['Alamat', siswa.alamat],
            ['Kota', siswa.kota],
            ['Instagram', siswa.instagram],
            ['No. Wa', siswa.no_wa],
        ];
        doc.autoTable({
            startY: 40,
            body: studentData,
            theme: 'striped',
            headStyles: { fillColor: [0, 0, 255] },
            styles: { cellPadding: 5, fontSize: 12, lineColor: [0, 0, 0], lineWidth: 0.1 },
            margin: { horizontal: 10 },
            columnStyles: { text: { cellPadding: 3, fontSize: 12, lineWidth: 0.1 } },
        });

        // School Information
        doc.setTextColor(100);
        doc.text('Informasi Sekolah', 14, doc.lastAutoTable.finalY + 10);
        const schoolData = [
            ['Nama Sekolah', siswa.nama_sekolah],
            ['Alamat Sekolah', siswa.alamat_sekolah],
            ['Kurikulum', siswa.kurikulum],
        ];
        doc.autoTable({
            startY: doc.lastAutoTable.finalY + 20,
            body: schoolData,
            theme: 'striped',
            headStyles: { fillColor: [0, 255, 0] },
            styles: { cellPadding: 5, fontSize: 12, lineColor: [0, 0, 0], lineWidth: 0.1 },
            margin: { horizontal: 10 },
            columnStyles: { text: { cellPadding: 3, fontSize: 12, lineWidth: 0.1 } },
        });

        // Parent Information
        doc.setTextColor(100);
        doc.text('Informasi Orang Tua', 14, doc.lastAutoTable.finalY + 10);
        const parentData = [
            ['Nama Ayah', siswa.nama_ayah],
            ['Nama Ibu', siswa.nama_ibu],
            ['Pekerjaan Ayah', siswa.pekerjaan_ayah || 'Tidak tersedia'],
            ['No Telp / HP Ayah', siswa.no_telp_hp_ayah || 'Tidak tersedia'],
            ['No WA / ID Line Ayah', siswa.no_wa_id_line_ayah || 'Tidak tersedia'],
            ['Email Ayah', siswa.email_ayah || 'Tidak tersedia'],
            ['Pekerjaan Ibu', siswa.pekerjaan_ibu || 'Tidak tersedia'],
            ['No Telp / HP Ibu', siswa.no_telp_hp_ibu || 'Tidak tersedia'],
            ['No WA / ID Line Ibu', siswa.no_wa_id_line_ibu || 'Tidak tersedia'],
            ['Email Ibu', siswa.email_ibu || 'Tidak tersedia'],
        ];
        doc.autoTable({
            startY: doc.lastAutoTable.finalY + 20,
            body: parentData,
            theme: 'striped',
            headStyles: { fillColor: [255, 200, 0] },
            styles: { cellPadding: 5, fontSize: 12, lineColor: [0, 0, 0], lineWidth: 0.1 },
            margin: { horizontal: 10 },
            columnStyles: { text: { cellPadding: 3, fontSize: 12, lineWidth: 0.1 } },
        });

        // Guidance Information
        doc.setTextColor(100);
        doc.text('Informasi Bimbingan', 14, doc.lastAutoTable.finalY + 10);
        const guidanceData = [
            ['Mulai Bimbingan', siswa.mulai_bimbingan || 'Tidak tersedia'],
            ['Jam Bimbingan', siswa.jam_bimbingan || 'Tidak tersedia'],
            ['Hari Bimbingan', siswa.hari_bimbingan ? siswa.hari_bimbingan.join(', ') : 'Tidak tersedia'],
        ];
        doc.autoTable({
            startY: doc.lastAutoTable.finalY + 20,
            body: guidanceData,
            theme: 'striped',
            headStyles: { fillColor: [200, 0, 200] },
            styles: { cellPadding: 5, fontSize: 12, lineColor: [0, 0, 0], lineWidth: 0.1 },
            margin: { horizontal: 10 },
            columnStyles: { text: { cellPadding: 3, fontSize: 12, lineWidth: 0.1 } },
        });

        // Add photo if available
        if (siswa.foto) {
            const imgData = `/storage/fotos/${siswa.foto}`; // Ensure this is a valid URL
            const img = new Image();
            img.src = imgData;
            img.onload = () => {
                doc.addPage();
                doc.setFontSize(14);
                doc.text('Foto Siswa:', 14, 20);
                doc.addImage(imgData, 'JPEG', 14, 30, 100, 100); // Adjusted size for the image
                doc.save(`Detail_Siswa_${siswa.nama}.pdf`);
            };
            img.onerror = () => {
                console.error('Image could not be loaded');
                doc.save(`Detail_Siswa_${siswa.nama}.pdf`);
            };
        } else {
            doc.save(`Detail_Siswa_${siswa.nama}.pdf`);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Detail Siswa</h1>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Student Information */}
                <div className="p-6 border-b border-gray-200 bg-blue-50">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-700">Informasi Siswa</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mb-4">
                            <strong className="text-gray-600">Nama:</strong> <span className="ml-2 text-gray-900">{siswa.nama}</span>
                        </div>
                        <div className="mb-4">
                            <strong className="text-gray-600">Email:</strong> <span className="ml-2 text-gray-900">{siswa.email}</span>
                        </div>
                        <div className="mb-4">
                            <strong className="text-gray-600">Jenis Kelamin:</strong> <span className="ml-2 text-gray-900">{siswa.jenis_kelamin}</span>
                        </div>
                        <div className="mb-4">
                            <strong className="text-gray-600">Tempat Lahir:</strong> <span className="ml-2 text-gray-900">{siswa.tempat_lahir}</span>
                        </div>
                        <div className="mb-4">
                            <strong className="text-gray-600">Tanggal Lahir:</strong> <span className="ml-2 text-gray-900">{new Date(siswa.tanggal_lahir).toLocaleDateString()}</span>
                        </div>
                        <div className="mb-4">
                            <strong className="text-gray-600">Alamat:</strong> <span className="ml-2 text-gray-900">{siswa.alamat}</span>
                        </div>
                        <div className="mb-4">
                            <strong className="text-gray-600">Kota:</strong> <span className="ml-2 text-gray-900">{siswa.kota}</span>
                        </div>
                        <div className="mb-4">
                            <strong className="text-gray-600">Instagram</strong> <span className="ml-2 text-gray-900">{siswa.instagram}</span>
                        </div>
                        <div className="mb-4">
                            <strong className="text-gray-600">No wa</strong> <span className="ml-2 text-gray-900">{siswa.no_wa}</span>
                        </div>
                    </div>
                </div>

                {/* School Information */}
                <div className="p-6 border-b border-gray-200 bg-green-50">
                    <h2 className="text-2xl font-semibold mb-4 text-green-700">Informasi Sekolah</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mb-4">
                            <strong className="text-gray-600">Nama Sekolah:</strong> <span className="ml-2 text-gray-900">{siswa.nama_sekolah}</span>
                        </div>
                        <div className="mb-4">
                            <strong className="text-gray-600">Alamat Sekolah:</strong> <span className="ml-2 text-gray-900">{siswa.alamat_sekolah}</span>
                        </div>
                        <div className="mb-4">
                            <strong className="text-gray-600">Kurikulum:</strong> <span className="ml-2 text-gray-900">{siswa.kurikulum}</span>
                        </div>
                    </div>
                </div>

                {/* Parent Information */}
                <div className="p-6 bg-yellow-50">
                    <h2 className="text-2xl font-semibold mb-4 text-yellow-700">Informasi Orang Tua</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mb-4">
                            <strong className="text-gray-600">Nama Ayah:</strong> <span className="ml-2 text-gray-900">{siswa.nama_ayah}</span>
                        </div>
                        <div className="mb-4">
                            <strong className="text-gray-600">Nama Ibu:</strong> <span className="ml-2 text-gray-900">{siswa.nama_ibu}</span>
                        </div>
                        <div className="mb-4">
                            <strong className="text-gray-600">Pekerjaan Ayah:</strong> <span className="ml-2 text-gray-900">{siswa.pekerjaan_ayah || 'Tidak tersedia'}</span>
                        </div>
                        <div className="mb-4">
                            <strong className="text-gray-600">No Telp / HP Ayah:</strong> <span className="ml-2 text-gray-900">{siswa.no_telp_hp_ayah || 'Tidak tersedia'}</span>
                        </div>
                        <div className="mb-4">
                            <strong className="text-gray-600">No WA / ID Line Ayah:</strong> <span className="ml-2 text-gray-900">{siswa.no_wa_id_line_ayah || 'Tidak tersedia'}</span>
                        </div>
                        <div className="mb-4">
                            <strong className="text-gray-600">Email Ayah:</strong> <span className="ml-2 text-gray-900">{siswa.email_ayah || 'Tidak tersedia'}</span>
                        </div>
                        <div className="mb-4">
                            <strong className="text-gray-600">Pekerjaan Ibu:</strong> <span className="ml-2 text-gray-900">{siswa.pekerjaan_ibu || 'Tidak tersedia'}</span>
                        </div>
                        <div className="mb-4">
                            <strong className="text-gray-600">No Telp / HP Ibu:</strong> <span className="ml-2 text-gray-900">{siswa.no_telp_hp_ibu || 'Tidak tersedia'}</span>
                        </div>
                        <div className="mb-4">
                            <strong className="text-gray-600">No WA / ID Line Ibu:</strong> <span className="ml-2 text-gray-900">{siswa.no_wa_id_line_ibu || 'Tidak tersedia'}</span>
                        </div>
                        <div className="mb-4">
                            <strong className="text-gray-600">Email Ibu:</strong> <span className="ml-2 text-gray-900">{siswa.email_ibu || 'Tidak tersedia'}</span>
                        </div>
                    </div>
                </div>

                {/* Bimbingan Section */}
                <div className="p-6 bg-green-50">
                    <h2 className="text-2xl font-semibold mb-4 text-green-700">Informasi Bimbingan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="mb-4">
                        <strong className="text-gray-600">Mulai Bimbingan:</strong> <span className="ml-2 text-gray-900">{siswa.mulai_bimbingan}</span>
                    </div>
                    <div className="mb-4">
                    <strong className="text-gray-600">Jam Bimbingan:</strong> <span className="ml-2 text-gray-900">{siswa.jam_bimbingan}</span>
                    </div>
                    <div className="mb-4">
                    <strong className="text-gray-600">Hari Bimbingan:</strong> <span className="ml-2 text-gray-900">{siswa.hari_bimbingan}</span>

                    </div>
                    </div>
                </div>

                {/* Photo Section */}
                {siswa.foto && (
                    <div className="p-6 bg-gray-100">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Foto Siswa</h2>
                        <div className="flex justify-center">
                            <img src={`/storage/fotos/${siswa.foto}`} alt="Foto Siswa" className="w-48 h-48 object-cover rounded-lg" />
                        </div>
                    </div>
                )}

                <div className="p-6 text-center">
                    <button
                        onClick={exportToPDF}
                        className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-600"
                    >
                        Export to PDF
                    </button>
                    <a href={route('adminsiswa.index')} className="ml-2 bg-purple-500 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-600">Kembali</a>
                </div>
            </div>
        </div>
    );
};

export default Show;
