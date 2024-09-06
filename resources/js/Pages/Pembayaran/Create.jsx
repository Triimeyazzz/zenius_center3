import React from 'react';
import Select from 'react-select';
import { useForm } from '@inertiajs/inertia-react';

export default function Create({ siswa }) {
    const { data, setData, post, processing, errors } = useForm({
        siswa_id: '',
        jumlah: '',
        tgl_jatuh_tempo: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('pembayaran.store'));
    };

    // Prepare options for react-select
    const siswaOptions = siswa.map(s => ({
        value: s.id,
        label: s.nama,
    }));

    const handleSelectChange = (selectedOption) => {
        setData('siswa_id', selectedOption ? selectedOption.value : '');
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gradient-to-r from-purple-400 to-blue-500 rounded-lg shadow-lg">
            <a href="/pembayaran" className='inline-block mb-4 px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition duration-300'>Kembali</a>
            <h1 className="text-3xl font-bold text-white mb-6">Buat Pembayaran Baru</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-6">
                    <label htmlFor="siswa_id" className="block text-sm font-medium text-gray-700">
                        Siswa
                    </label>
                    <Select
                        id="siswa_id"
                        options={siswaOptions}
                        onChange={handleSelectChange}
                        value={siswaOptions.find(option => option.value === data.siswa_id)}
                        placeholder="Pilih Siswa"
                        isClearable
                        className="mt-1"
                    />
                    {errors.siswa_id && <div className="text-red-500 text-sm mt-1">{errors.siswa_id}</div>}
                </div>

                <div className="mb-6">
                    <label htmlFor="jumlah" className="block text-sm font-medium text-gray-700">
                        Jumlah Pembayaran
                    </label>
                    <input
                        type="number"
                        id="jumlah"
                        value={data.jumlah}
                        onChange={(e) => setData('jumlah', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                        min="0"
                        step="0.01"
                    />
                    {errors.jumlah && <div className="text-red-500 text-sm mt-1">{errors.jumlah}</div>}
                </div>

                <div className="mb-6">
                    <label htmlFor="tgl_jatuh_tempo" className="block text-sm font-medium text-gray-700">
                        Jatuh Tempo
                    </label>
                    <input
                        type="date"
                        id="tgl_jatuh_tempo"
                        value={data.tgl_jatuh_tempo}
                        onChange={(e) => setData('tgl_jatuh_tempo', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                    />
                    {errors.tgl_jatuh_tempo && <div className="text-red-500 text-sm mt-1">{errors.tgl_jatuh_tempo}</div>}
                </div>


                <div className="flex items-center justify-end">
                    <button
                        type="submit"
                        className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 transition ease-in-out duration-150"
                        disabled={processing}
                    >
                        {processing ? 'Processing...' : 'Buat Pembayaran'}
                    </button>
                </div>
            </form>
        </div>
    );
}
