import React from 'react';
import { Link } from '@inertiajs/react';

const Show = ({ siswa }) => {
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

                {/* Photo */}
                {siswa.foto && (
                    <div className="p-6 border-t border-gray-200 bg-gray-50">
                        <strong className="text-gray-600">Foto:</strong>
                        <div className="mt-2">
                            <img src={`/storage/${siswa.foto}`} alt="Foto Siswa" className="w-full max-w-xs h-auto object-cover rounded-lg shadow-md" />
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-6 flex justify-between items-center">
                <Link href={route('adminsiswa.index')} className="text-blue-500 hover:underline text-lg">Kembali ke Daftar Siswa</Link>
                <a href={route('adminsiswa.edit', siswa.id)} className="text-blue-500 hover:underline text-lg">Edit Siswa</a>
                <a href={route('siswa.exportPdf', siswa.id)} className="text-blue-500 hover:underline text-lg">Export to PDF</a>
            </div>
        </div>
    );
};

export default Show;
