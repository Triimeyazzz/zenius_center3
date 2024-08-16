import React, { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import axios from "axios";
import { useForm } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Modal from "./Modal";

const Index = ({ auth, programBimbingans }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [programToDelete, setProgramToDelete] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        nama_program: "",
        keuntungan: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/program-bimbingan", {
            onSuccess: () => {
                setIsFormVisible(false);
                setData({ nama_program: "", keuntungan: "" });
            },
        });
    };

    const openModal = (program) => {
        setProgramToDelete(program);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setProgramToDelete(null);
    };

    const handleDelete = () => {
        axios.delete(`/program-bimbingan/${programToDelete.id}`).then(() => {
            window.location.reload();
        });
        closeModal();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Program Bimbingan
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h1 className="text-2xl font-bold mb-4">
                                Program Bimbingan
                            </h1>
                            <button
                                onClick={() => setIsFormVisible(!isFormVisible)}
                                className="btn btn-primary mb-4 inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                            >
                                {isFormVisible
                                    ? "Tutup Formulir"
                                    : "Tambah Program"}
                            </button>
                            {isFormVisible && (
                                <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mb-6">
                                    <h1 className="text-2xl font-bold mb-6 text-center">
                                        Tambah Program Bimbingan
                                    </h1>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Nama Program
                                            </label>
                                            <input
                                                type="text"
                                                value={data.nama_program}
                                                onChange={(e) =>
                                                    setData(
                                                        "nama_program",
                                                        e.target.value
                                                    )
                                                }
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                            {errors.nama_program && (
                                                <p className="text-red-500 text-xs italic">
                                                    {errors.nama_program}
                                                </p>
                                            )}
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Keuntungan
                                            </label>
                                            <textarea
                                                value={data.keuntungan}
                                                onChange={(e) =>
                                                    setData(
                                                        "keuntungan",
                                                        e.target.value
                                                    )
                                                }
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            ></textarea>
                                            {errors.keuntungan && (
                                                <p className="text-red-500 text-xs italic">
                                                    {errors.keuntungan}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                                                    processing
                                                        ? "opacity-50 cursor-not-allowed"
                                                        : ""
                                                }`}
                                            >
                                                {processing
                                                    ? "Menyimpan..."
                                                    : "Simpan"}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border">
                                    <thead className="bg-gray-100 border-b">
                                        <tr>
                                            <th className="text-left py-3 px-4">
                                                Nama Program
                                            </th>
                                            <th className="text-left py-3 px-4">
                                                Keuntungan
                                            </th>
                                            <th className="text-left py-3 px-4">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {programBimbingans.map((program) => (
                                            <tr
                                                key={program.id}
                                                className="border-b hover:bg-gray-50"
                                            >
                                                <td className="py-3 px-4">
                                                    {program.nama_program}
                                                </td>
                                                <td className="py-3 px-4">
                                                    {program.keuntungan}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <a
                                                        href={`/program-bimbingan/${program.id}/edit`}
                                                        className="btn btn-warning mr-2 inline-block px-4 py-2 bg-yellow-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-500 hover:shadow-lg focus:bg-yellow-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-600 active:shadow-lg transition duration-150 ease-in-out"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 512 512"
                                                            className="w-5 h-5 fill-current transition-transform duration-150 ease-in-out transform hover:scale-110"
                                                        >
                                                            <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" />
                                                        </svg>
                                                        <span className="sr-only">
                                                            Edit
                                                        </span>
                                                    </a>
                                                    <button
                                                        onClick={() =>
                                                            openModal(program)
                                                        }
                                                        className="btn btn-danger inline-block px-4 py-2 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                                                    >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 448 512"
                                                    className="w-5 h-5 fill-current"
                                                >
                                                    <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                                </svg>
                                                <span className="sr-only">
                                                    Delete
                                                </span>                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleDelete}
            />
        </AuthenticatedLayout>
    );
};

export default Index;
