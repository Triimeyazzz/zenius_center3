import React from 'react';
import { Link } from '@inertiajs/react';

const Show = ({ siswa }) => {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow-sm sm:rounded-lg p-6 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-purple-800 mb-6">Absensi {siswa.nama}</h1>
        <div className="flex justify-between">
        <Link
          href={route('absensi.create', siswa.id)}
          className="inline-block mb-4 px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition duration-300"
        >
          Tambah Absensi
        </Link>
        <Link 
        href={route('absensi.index')} 
        className='inline-block mb-4 px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition duration-300'
        >
        Kembali
        </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-purple-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Tanggal</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {siswa.absensis.map((absen) => (
                <tr key={absen.id} className="border-t border-gray-200 hover:bg-gray-100 transition duration-300">
                  <td className="py-3 px-4">{absen.tanggal}</td>
                  <td className="py-3 px-4">{absen.status}</td>
                  <td className="py-3 px-4">{absen.keterangan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Show;
