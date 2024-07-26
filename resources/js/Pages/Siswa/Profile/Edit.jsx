import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import StudentLayout from '@/Layouts/StudentLayout';

const Edit = ({ user }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: user.name || '',
    email: user.email || '',
    password: '',
    password_confirmation: '',
    nomor_hp: user.nomor_hp || '',
    alamat: user.alamat || '',
    profile_picture: null, // Tambahkan ini untuk menyimpan gambar
  });

  const [profilePicturePreview, setProfilePicturePreview] = useState(user.profile_picture || '');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setData('profile_picture', file);
    
    // Membuat URL sementara untuk pratinjau gambar
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Menggunakan FormData untuk menangani file upload
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('password_confirmation', data.password_confirmation);
    formData.append('nomor_hp', data.nomor_hp);
    formData.append('alamat', data.alamat);
    formData.append('profile_picture', data.profile_picture);

    post('/profile', {
      data: formData,
      onSuccess: () => reset(),
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      },
    });
  };

  return (
    <StudentLayout user={user}>
      <div className="container mx-auto px-4 py-6 bg-slate-100 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

        {/* Profile Overview */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Profile</h2>
          <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700">Name</h3>
              <p className="text-lg">{user.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700">Email</h3>
              <p className="text-lg">{user.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700">Phone Number</h3>
              <p className="text-lg">{user.nomor_hp}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700">Address</h3>
              <p className="text-lg">{user.alamat}</p>
            </div>
            {user.profile_picture && (
              <div>
                <h3 className="text-sm font-medium text-gray-700">Profile Picture</h3>
                <img src={`/storage/${user.profile_picture}`} alt="Profile" className="w-32 h-32 object-cover rounded-full" />
              </div>
            )}
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="profile_picture" className="block text-sm font-medium text-gray-700">Profile Picture</label>
            <input
              type="file"
              id="profile_picture"
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-purple-600"
            />
            {profilePicturePreview && (
              <img src={profilePicturePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-full" />
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-purple-600"
            />
            {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-purple-600"
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-purple-600"
            />
            {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="password_confirmation"
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-purple-600"
            />
            {errors.password_confirmation && <p className="text-red-600 text-sm">{errors.password_confirmation}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="nomor_hp" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              id="nomor_hp"
              value={data.nomor_hp}
              onChange={(e) => setData('nomor_hp', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-purple-600"
            />
            {errors.nomor_hp && <p className="text-red-600 text-sm">{errors.nomor_hp}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              id="alamat"
              value={data.alamat}
              onChange={(e) => setData('alamat', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-purple-600"
            />
            {errors.alamat && <p className="text-red-600 text-sm">{errors.alamat}</p>}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="px-4 py-2 bg-purple-600 text-white rounded-md"
          >
            {processing ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </StudentLayout>
  );
};

export default Edit;
