import React from 'react';
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
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/profile', { onSuccess: () => reset() });
  };

  return (
    <StudentLayout user={user}>
      <div className="container mx-auto px-4 py-6 bg-slate-100 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

        {/* Profile Overview */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Profile Overview</h2>
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
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-purple-600 "
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-purple-600 "
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-purple-600 "
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-purple-600 "
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-purple-600 "
            />
            {errors.nomor_hp && <p className="text-red-600 text-sm">{errors.nomor_hp}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              id="alamat"
              value={data.alamat}
              onChange={(e) => setData('alamat', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-purple-600 "
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
