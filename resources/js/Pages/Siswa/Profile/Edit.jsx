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
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.nomor_hp && <p className="text-red-600 text-sm">{errors.nomor_hp}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            id="alamat"
            value={data.alamat}
            onChange={(e) => setData('alamat', e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.alamat && <p className="text-red-600 text-sm">{errors.alamat}</p>}
        </div>

        <button
          type="submit"
          disabled={processing}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {processing ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
    </StudentLayout>
  );
};

export default Edit;
