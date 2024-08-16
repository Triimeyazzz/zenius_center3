import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/inertia-react'; // Ensure you have this import for routing

const IndexAdmin = ({ siswa, auth }) => {
  const [search, setSearch] = useState('');

  // Filter siswa based on search query
  const filteredSiswa = siswa.filter(student =>
    student.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Pesan
        </h2>
      }
    >
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Messages</h1>
          
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Cari siswa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* List of Students */}
          <ul className="space-y-4">
            {filteredSiswa.length > 0 ? (
              filteredSiswa.map((student) => (
                <li
                  key={student.id}
                  className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={`storage/fotos/${student.foto}`}
                    alt={student.nama}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{student.nama}</h3>
                    <p className="text-gray-600">Klik untuk melihat pesan</p>
                  </div>
                  <a
                    href={route('messages.conversation', student.id)}
                    className="text-purple-500 hover:underline"
                  >
                    View
                  </a>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No students found</li>
            )}
          </ul>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default IndexAdmin;
