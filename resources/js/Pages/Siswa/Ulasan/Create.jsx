import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import StudentLayout from '@/Layouts/StudentLayout';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'; // Import star icons from react-icons

const Create = () => {
  const { data, setData, post, errors, reset } = useForm({
    penilaian: '',
    komentar: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('siswa.ulasan.store'), {
      onSuccess: () => reset(),
    });
  };

  const handleStarClick = (value) => {
    setData('penilaian', value);
  };

  return (
    <StudentLayout>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Tambah Ulasan</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Penilaian</label>
            <div className="flex space-x-1 mt-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} onClick={() => handleStarClick(value)} className="cursor-pointer">
                  {data.penilaian >= value ? (
                    <AiFillStar className="text-yellow-500 text-2xl" />
                  ) : (
                    <AiOutlineStar className="text-gray-400 text-2xl" />
                  )}
                </div>
              ))}
            </div>
            {errors.penilaian && <div className="text-red-500 mt-2">{errors.penilaian}</div>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Komentar</label>
            <textarea
              value={data.komentar}
              onChange={(e) => setData('komentar', e.target.value)}
              className="form-textarea mt-1 block w-full"
              rows="4"
              placeholder="Tulis komentar Anda"
            ></textarea>
            {errors.komentar && <div className="text-red-500 mt-2">{errors.komentar}</div>}
          </div>

          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary">
              Tambah Ulasan
            </button>
          </div>
        </form>
      </div>
    </StudentLayout>
  );
};

export default Create;
