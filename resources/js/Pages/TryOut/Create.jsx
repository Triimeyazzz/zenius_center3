import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';

const CreateTryOut = ({ siswa }) => {
    const [subtopics, setSubtopics] = useState([{ sub_mata_pelajaran: '', skor: '' }]);
    const { data, setData, post, errors } = useForm({
        mata_pelajaran: '',
        tanggal_pelaksanaan: '',
        subtopics: subtopics,
    });

    const handleAddSubtopic = () => {
        setSubtopics([...subtopics, { sub_mata_pelajaran: '', skor: '' }]);
    };

    const handleChangeSubtopic = (index, field, value) => {
        const newSubtopics = subtopics.map((subtopic, i) =>
            i === index ? { ...subtopic, [field]: value } : subtopic
        );
        setSubtopics(newSubtopics);
        setData('subtopics', newSubtopics);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('tryout.store', siswa.id));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">{`Add Scores for ${siswa.nama}`}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Mata Pelajaran</label>
                    <input
                        type="text"
                        value={data.mata_pelajaran}
                        onChange={e => setData('mata_pelajaran', e.target.value)}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.mata_pelajaran && <div className="text-red-500 mt-1">{errors.mata_pelajaran}</div>}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Tanggal Pelaksanaan</label>
                    <input
                        type="date"
                        value={data.tanggal_pelaksanaan}
                        onChange={e => setData('tanggal_pelaksanaan', e.target.value)}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.tanggal_pelaksanaan && <div className="text-red-500 mt-1">{errors.tanggal_pelaksanaan}</div>}
                </div>
                {subtopics.map((subtopic, index) => (
                    <div key={index} className="border border-gray-300 rounded-md p-4 space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Sub Mata Pelajaran</label>
                            <input
                                type="text"
                                value={subtopic.sub_mata_pelajaran}
                                onChange={e => handleChangeSubtopic(index, 'sub_mata_pelajaran', e.target.value)}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Skor</label>
                            <input
                                type="number"
                                value={subtopic.skor}
                                onChange={e => handleChangeSubtopic(index, 'skor', e.target.value)}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddSubtopic}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Add Subtopic
                </button>
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateTryOut;
