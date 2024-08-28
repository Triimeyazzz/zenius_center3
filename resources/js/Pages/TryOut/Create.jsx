import React from 'react';
import { useForm } from '@inertiajs/inertia-react';

const Create = ({ siswa }) => {
    const { data, setData, post, processing, errors } = useForm({
        mata_pelajaran: '',
        tanggal_pelaksanaan: '',
        subtopics: [{ sub_mata_pelajaran: '', skor: '' }],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubtopicChange = (index, e) => {
        const { name, value } = e.target;
        const newSubtopics = [...data.subtopics];
        newSubtopics[index][name] = value;
        setData('subtopics', newSubtopics);
    };

    const addSubtopic = () => {
        setData('subtopics', [...data.subtopics, { sub_mata_pelajaran: '', skor: '' }]);
    };

    const removeSubtopic = (index) => {
        const newSubtopics = [...data.subtopics];
        newSubtopics.splice(index, 1);
        setData('subtopics', newSubtopics);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('tryout.store', siswa.id));
    };

    return (
        <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-200">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create TryOut for {siswa.nama}</h1>
            <a href={route('tryout.progress', siswa.id)} className="text-purple-500 hover:text-purple-700">kembali</a>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Mata Pelajaran</label>
                    <input
                        type="text"
                        name="mata_pelajaran"
                        value={data.mata_pelajaran}
                        onChange={handleChange}
                        className={`mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150`}
                        placeholder="Enter Mata Pelajaran"
                    />
                    {errors.mata_pelajaran && <div className="text-red-500 text-xs mt-1">{errors.mata_pelajaran}</div>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tanggal Pelaksanaan</label>
                    <input
                        type="date"
                        name="tanggal_pelaksanaan"
                        value={data.tanggal_pelaksanaan}
                        onChange={handleChange}
                        className={`mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150`}
                    />
                    {errors.tanggal_pelaksanaan && <div className="text-red-500 text-xs mt-1">{errors.tanggal_pelaksanaan}</div>}
                </div>
                <h2 className="text-lg font-medium text-gray-800 border-b-2 border-gray-300 pb-2">Subtopics</h2>
                {data.subtopics.map((subtopic, index) => (
                    <div key={index} className="flex items-center space-x-2 border border-gray-200 rounded-md p-3 shadow-sm">
                        <input
                            type="text"
                            name="sub_mata_pelajaran"
                            value={subtopic.sub_mata_pelajaran}
                            onChange={(e) => handleSubtopicChange(index, e)}
                            placeholder="Sub Mata Pelajaran"
                            className={`flex-1 border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150`}
                        />
                        <input
                            type="number"
                            name="skor"
                            value={subtopic.skor}
                            onChange={(e) => handleSubtopicChange(index, e)}
                            placeholder="Skor"
                            className={`w-24 border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150`}
                        />
                        <button
                            type="button"
                            onClick={() => removeSubtopic(index)}
                            className="text-red-600 hover:text-red-800 transition duration-150"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addSubtopic}
                    className="w-full bg-purple-600 text-white rounded-md py-3 hover:bg-purple-700 transition duration-200"
                >
                    + Add Subtopic
                </button>
                <button
                    type="submit"
                    disabled={processing}
                    className={`w-full bg-green-600 text-white rounded-md py-3 hover:bg-green-700 transition duration-200 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Create;
