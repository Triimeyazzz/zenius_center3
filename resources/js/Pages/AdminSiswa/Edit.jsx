import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/inertia-react";

const Edit = ({ program_bimbingan, siswa }) => {
    const { data, setData, put, errors } = useForm({
        nama: siswa.nama || "",
        email: siswa.email || "",
        password: "",
        jenis_kelamin: siswa.jenis_kelamin || "Laki-laki",
        tempat_lahir: siswa.tempat_lahir || "",
        tanggal_lahir: siswa.tanggal_lahir || "",
        alamat: siswa.alamat || "",
        kota: siswa.kota || "",
        nama_sekolah: siswa.nama_sekolah || "",
        alamat_sekolah: siswa.alamat_sekolah || "",
        kurikulum: siswa.kurikulum || "",
        nama_ayah: siswa.nama_ayah || "",
        nama_ibu: siswa.nama_ibu || "",
        pekerjaan_ayah: siswa.pekerjaan_ayah || "",
        no_telp_hp_ayah: siswa.no_telp_hp_ayah || "",
        no_wa_id_line_ayah: siswa.no_wa_id_line_ayah || "",
        email_ayah: siswa.email_ayah || "",
        pekerjaan_ibu: siswa.pekerjaan_ibu || "",
        no_telp_hp_ibu: siswa.no_telp_hp_ibu || "",
        no_wa_id_line_ibu: siswa.no_wa_id_line_ibu || "",
        email_ibu: siswa.email_ibu || "",
        id_program_bimbingan: siswa.id_program_bimbingan || "",
        foto: null,
    });

    const [fotoPreview, setFotoPreview] = useState(siswa.foto || null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (siswa.foto) {
            setFotoPreview(siswa.foto);
        }
    }, [siswa.foto]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setData(name, files[0]);
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFotoPreview(reader.result);
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        } else {
            setData(name, value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        put(route("adminsiswa.update", siswa.id), {
            forceFormData: true,
            onSuccess: () => setIsSubmitting(false),
            onError: () => setIsSubmitting(false),
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <div className="text-center mb-6">
                <img
                    src="/images/Reverse.png"
                    alt="Logo"
                    className="mx-auto mb-4 w-32 h-auto"
                />
                <h1 className="text-2xl font-bold mb-4 text-indigo-600">
                    Edit Siswa
                </h1>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Personal Information */}
                <fieldset className="mb-6 border border-indigo-300 rounded-lg p-6 bg-indigo-50">
                    <legend className="text-xl font-semibold mb-4 text-indigo-700">
                        Informasi Pribadi
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { label: "Nama", name: "nama", type: "text" },
                            { label: "Email", name: "email", type: "email" },
                            {
                                label: "Password",
                                name: "password",
                                type: "password",
                            },
                            {
                                label: "Tempat Lahir",
                                name: "tempat_lahir",
                                type: "text",
                            },
                            {
                                label: "Tanggal Lahir",
                                name: "tanggal_lahir",
                                type: "date",
                            },
                            {
                                label: "Jenis Kelamin",
                                name: "jenis_kelamin",
                                type: "select",
                                options: ["Laki-laki", "Perempuan"],
                            },
                            { label: "Alamat", name: "alamat", type: "text" },
                            { label: "Kota", name: "kota", type: "text" },
                        ].map(({ label, name, type, options }) => (
                            <div className="mb-4" key={name}>
                                <label
                                    htmlFor={name}
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    {label}
                                </label>
                                {type === "select" ? (
                                    <select
                                        id={name}
                                        name={name}
                                        value={data[name]}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        {options.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        id={name}
                                        name={name}
                                        type={type}
                                        value={data[name] || ""}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                )}
                                {errors[name] && (
                                    <div className="text-red-600 text-sm mt-1">
                                        {errors[name]}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </fieldset>

                {/* School Information */}
                <fieldset className="mb-6 border border-indigo-300 rounded-lg p-6 bg-indigo-50">
                    <legend className="text-xl font-semibold mb-4 text-indigo-700">
                        Informasi Sekolah
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                label: "Nama Sekolah",
                                name: "nama_sekolah",
                                type: "text",
                            },
                            {
                                label: "Alamat Sekolah",
                                name: "alamat_sekolah",
                                type: "text",
                            },
                            {
                                label: "Kurikulum",
                                name: "kurikulum",
                                type: "text",
                            },
                        ].map(({ label, name, type }) => (
                            <div className="mb-4" key={name}>
                                <label
                                    htmlFor={name}
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    {label}
                                </label>
                                <input
                                    id={name}
                                    name={name}
                                    type={type}
                                    value={data[name] || ""}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                {errors[name] && (
                                    <div className="text-red-600 text-sm mt-1">
                                        {errors[name]}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </fieldset>

                {/* Parent Information */}
                <fieldset className="mb-6 border border-indigo-300 rounded-lg p-6 bg-indigo-50">
                    <legend className="text-xl font-semibold mb-4 text-indigo-700">
                        Informasi Orang Tua
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                label: "Nama Ayah",
                                name: "nama_ayah",
                                type: "text",
                            },
                            {
                                label: "Pekerjaan Ayah",
                                name: "pekerjaan_ayah",
                                type: "text",
                            },
                            {
                                label: "Nomor HP Ayah",
                                name: "no_telp_hp_ayah",
                                type: "text",
                            },
                            {
                                label: "ID Line/WA Ayah",
                                name: "no_wa_id_line_ayah",
                                type: "text",
                            },
                            {
                                label: "Email Ayah",
                                name: "email_ayah",
                                type: "email",
                            },
                            {
                                label: "Nama Ibu",
                                name: "nama_ibu",
                                type: "text",
                            },
                            {
                                label: "Pekerjaan Ibu",
                                name: "pekerjaan_ibu",
                                type: "text",
                            },
                            {
                                label: "Nomor HP Ibu",
                                name: "no_telp_hp_ibu",
                                type: "text",
                            },
                            {
                                label: "ID Line/WA Ibu",
                                name: "no_wa_id_line_ibu",
                                type: "text",
                            },
                            {
                                label: "Email Ibu",
                                name: "email_ibu",
                                type: "email",
                            },
                        ].map(({ label, name, type }) => (
                            <div className="mb-4" key={name}>
                                <label
                                    htmlFor={name}
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    {label}
                                </label>
                                <input
                                    id={name}
                                    name={name}
                                    type={type}
                                    value={data[name] || ""}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                {errors[name] && (
                                    <div className="text-red-600 text-sm mt-1">
                                        {errors[name]}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </fieldset>

                {/* Program Bimbingan */}
                <fieldset className="mb-6 border border-indigo-300 rounded-lg p-6 bg-indigo-50">
                    <legend className="text-xl font-semibold mb-4 text-indigo-700">
                        Program Bimbingan
                    </legend>
                    <div className="mb-4">
                        <label
                            htmlFor="id_program_bimbingan"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Pilih Program Bimbingan
                        </label>
                        <select
                            id="id_program_bimbingan"
                            name="id_program_bimbingan"
                            value={data.id_program_bimbingan}
                            onChange={handleChange}
                            className="w-full p-3 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Pilih Program Bimbingan</option>
                            {program_bimbingan.map((program) => (
                                <option key={program.id} value={program.id}>
                                    {program.nama_program}
                                </option>
                            ))}
                        </select>
                        {errors.id_program_bimbingan && (
                            <div className="text-red-600 text-sm mt-1">
                                {errors.id_program_bimbingan}
                            </div>
                        )}
                    </div>
                </fieldset>

                {/* Foto */}
                <fieldset className="mb-6 border border-indigo-300 rounded-lg p-6 bg-indigo-50">
                    <legend className="text-xl font-semibold mb-4 text-indigo-700">
                        Foto
                    </legend>
                    <div className="mb-4">
                        <label
                            htmlFor="foto"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Unggah Foto
                        </label>
                        <input
                            id="foto"
                            name="foto"
                            type="file"
                            onChange={handleChange}
                            className="w-full p-3 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {fotoPreview && (
                            <img
                                src={fotoPreview}
                                alt="Preview"
                                className="mt-4 w-32 h-32 object-cover border border-indigo-300 rounded-md"
                            />
                        )}
                        {errors.foto && (
                            <div className="text-red-600 text-sm mt-1">
                                {errors.foto}
                            </div>
                        )}
                    </div>
                </fieldset>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {isSubmitting ? "Menyimpan..." : "Simpan"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
