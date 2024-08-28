import React, { useState } from "react";
import { useForm } from "@inertiajs/inertia-react";
import { usePage } from '@inertiajs/react';

export default function Edit() {
    const { siswa } = usePage().props;

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
        foto: null,
        kelas: siswa.kelas || "",
        mulai_bimbingan: siswa.mulai_bimbingan || "",
        jam_bimbingan: siswa.jam_bimbingan || "",
        hari_bimbingan: JSON.parse(siswa.hari_bimbingan || '[]'),
        });

    console.log(data)
    const [fotoPreview, setFotoPreview] = useState(siswa.foto ? `/storage/fotos/${siswa.foto}` : null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setData(name, files[0]);
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => setFotoPreview(reader.result);
            if (file) reader.readAsDataURL(file);
        } else {
            setData(name, value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("adminsiswa.update", siswa.id), {
            preserveState: true,
        });
    };

    return (
        <>
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <div className="text-center mb-6">
                <img
                    src="/images/Reverse.png"
                    alt="Logo"
                    className="mx-auto mb-4 w-32 h-auto"
                />
                <h1 className="text-2xl font-bold mb-4 text-purple-600">
                    Edit Siswa
                </h1>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Personal Information */}
                <fieldset className="mb-6 border border-purple-300 rounded-lg p-6 bg-purple-50">
                    <legend className="text-xl font-semibold mb-4 text-purple-700">
                        Informasi Pribadi
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            label="Nama"
                            id="nama"
                            name="nama"
                            type="text"
                            value={data.nama}
                            onChange={handleChange}
                            error={errors.nama}
                        />
                        <InputField
                            label="Email"
                            id="email"
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <InputField
                            label="Password"
                            id="password"
                            name="password"
                            type="password"
                            value={data.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <InputField
                            label="Tempat Lahir"
                            id="tempat_lahir"
                            name="tempat_lahir"
                            type="text"
                            value={data.tempat_lahir}
                            onChange={handleChange}
                            error={errors.tempat_lahir}
                        />
                        <InputField
                            label="Tanggal Lahir"
                            id="tanggal_lahir"
                            name="tanggal_lahir"
                            type="date"
                            value={data.tanggal_lahir}
                            onChange={handleChange}
                            error={errors.tanggal_lahir}
                        />
                        <SelectField
                            label="Jenis Kelamin"
                            id="jenis_kelamin"
                            name="jenis_kelamin"
                            value={data.jenis_kelamin}
                            onChange={handleChange}
                            options={[
                                { value: "Laki-laki", label: "Laki-laki" },
                                { value: "Perempuan", label: "Perempuan" },
                            ]}
                            error={errors.jenis_kelamin}
                        />
                        <InputField
                            label="Alamat"
                            id="alamat"
                            name="alamat"
                            type="text"
                            value={data.alamat}
                            onChange={handleChange}
                            error={errors.alamat}
                        />
                        <InputField
                            label="Kota"
                            id="kota"
                            name="kota"
                            type="text"
                            value={data.kota}
                            onChange={handleChange}
                            error={errors.kota}
                        />
                    </div>
                </fieldset>

                {/* School Information */}
                <fieldset className="mb-6 border border-purple-300 rounded-lg p-6 bg-purple-50">
                    <legend className="text-xl font-semibold mb-4 text-purple-700">
                        Informasi Sekolah
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            label="Nama Sekolah"
                            id="nama_sekolah"
                            name="nama_sekolah"
                            type="text"
                            value={data.nama_sekolah}
                            onChange={handleChange}
                            error={errors.nama_sekolah}
                        />
                        <InputField
                            label="Alamat Sekolah"
                            id="alamat_sekolah"
                            name="alamat_sekolah"
                            type="text"
                            value={data.alamat_sekolah}
                            onChange={handleChange}
                            error={errors.alamat_sekolah}
                        />
                        <InputField
                            label="Kurikulum"
                            id="kurikulum"
                            name="kurikulum"
                            type="text"
                            value={data.kurikulum}
                            onChange={handleChange}
                            error={errors.kurikulum}
                        />
                    </div>
                </fieldset>

                {/* Parent Information */}
                <fieldset className="mb-6 border border-purple-300 rounded-lg p-6 bg-purple-50">
                    <legend className="text-xl font-semibold mb-4 text-purple-700">
                        Informasi Orang Tua
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            label="Nama Ayah"
                            id="nama_ayah"
                            name="nama_ayah"
                            type="text"
                            value={data.nama_ayah}
                            onChange={handleChange}
                            error={errors.nama_ayah}
                        />
                        <InputField
                            label="Pekerjaan Ayah"
                            id="pekerjaan_ayah"
                            name="pekerjaan_ayah"
                            type="text"
                            value={data.pekerjaan_ayah}
                            onChange={handleChange}
                            error={errors.pekerjaan_ayah}
                        />
                        <InputField
                            label="No. Telp/Hp Ayah"
                            id="no_telp_hp_ayah"
                            name="no_telp_hp_ayah"
                            type="text"
                            value={data.no_telp_hp_ayah}
                            onChange={handleChange}
                            error={errors.no_telp_hp_ayah}
                        />
                        <InputField
                            label="No. WA/ID Line Ayah"
                            id="no_wa_id_line_ayah"
                            name="no_wa_id_line_ayah"
                            type="text"
                            value={data.no_wa_id_line_ayah}
                            onChange={handleChange}
                            error={errors.no_wa_id_line_ayah}
                        />
                         <SelectField
                            label="Kelas"
                            id="kelas"
                            name="kelas"
                            value={data.kelas}
                            onChange={handleChange}
                            options={[
                                { value: "Kelas 4 SD", label: "Kelas 4 SD" },
                                { value: "Kelas 5 SD", label: "Kelas 5 SD" },
                                { value: "Kelas 6 SD", label: "Kelas 6 SD" },
                                { value: "Kelas 7 SMP", label: "Kelas 7 SMP" },
                                { value: "Kelas 8 SMP", label: "Kelas 8 SMP" },
                                { value: "Kelas 9 SMP", label: "Kelas 9 SMP" },
                                { value: "Kelas 10 SMA", label: "Kelas 10 SMA" },
                                { value: "Kelas 11 SMA", label: "Kelas 11 " },
                                { value: "Kelas 12 SMA", label: "Kelas 12 SMA" },
                                { value: "Alumni SMA", label: "Alumni SMA" },
                            ]}
                            error={errors.kelas}
                        />
                        <InputField
                            label="Email Ayah"
                            id="email_ayah"
                            name="email_ayah"
                            type="email"
                            value={data.email_ayah}
                            onChange={handleChange}
                            error={errors.email_ayah}
                        />
                        <InputField
                            label="Nama Ibu"
                            id="nama_ibu"
                            name="nama_ibu"
                            type="text"
                            value={data.nama_ibu}
                            onChange={handleChange}
                            error={errors.nama_ibu}
                        />
                        <InputField
                            label="Pekerjaan Ibu"
                            id="pekerjaan_ibu"
                            name="pekerjaan_ibu"
                            type="text"
                            value={data.pekerjaan_ibu}
                            onChange={handleChange}
                            error={errors.pekerjaan_ibu}
                        />
                        <InputField
                            label="No. Telp/Hp Ibu"
                            id="no_telp_hp_ibu"
                            name="no_telp_hp_ibu"
                            type="text"
                            value={data.no_telp_hp_ibu}
                            onChange={handleChange}
                            error={errors.no_telp_hp_ibu}
                        />
                        <InputField
                            label="No. WA/ID Line Ibu"
                            id="no_wa_id_line_ibu"
                            name="no_wa_id_line_ibu"
                            type="text"
                            value={data.no_wa_id_line_ibu}
                            onChange={handleChange}
                            error={errors.no_wa_id_line_ibu}
                        />
                        <InputField
                            label="Email Ibu"
                            id="email_ibu"
                            name="email_ibu"
                            type="email"
                            value={data.email_ibu}
                            onChange={handleChange}
                            error={errors.email_ibu}
                        />
                    </div>
                </fieldset>

                {/* Bimbingan Information */}
                <fieldset className="mb-6 border border-purple-300 rounded-lg p-6 bg-purple-50">
                    <legend className="text-xl font-semibold mb-4 text-purple-700">
                        Informasi Bimbingan
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            label="Mulai Bimbingan"
                            id="mulai_bimbingan"
                            name="mulai_bimbingan"
                            type="date"
                            value={data.mulai_bimbingan}
                            onChange={handleChange}
                            error={errors.mulai_bimbingan}
                        />
                        <InputField
                            label="Jam Bimbingan"
                            id="jam_bimbingan"
                            name="jam_bimbingan"
                            type="time"
                            value={data.jam_bimbingan}
                            onChange={handleChange}
                            error={errors.jam_bimbingan}
                        />
                        <SelectField
                            label="Hari Bimbingan"
                            id="hari_bimbingan"
                            name="hari_bimbingan"
                            multiple
                            value={data.hari_bimbingan}
                            onChange={handleChange}
                            options={[
                                { value: "Senin", label: "Senin" },
                                { value: "Selasa", label: "Selasa" },
                                { value: "Rabu", label: "Rabu" },
                                { value: "Kamis", label: "Kamis" },
                                { value: "Jumat", label: "Jumat" },
                                { value: "Sabtu", label: "Sabtu" },
                            ]}
                            error={errors.hari_bimbingan}
                        />
                    </div>
                </fieldset>

                {/* Photo Upload */}
                <div className="mb-6">
                    <label htmlFor="foto" className="block text-sm font-medium text-gray-700">
                        Foto Siswa
                    </label>
                    <input
                        type="file"
                        id="foto"
                        name="foto"
                        onChange={handleChange}
                        className="mt-1 block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-purple-50 file:text-purple-700
                            hover:file:bg-purple-100"
                    />
                    {fotoPreview && (
                        <img
                            src={fotoPreview}
                            alt="Foto Preview"
                            className="mt-4 w-32 h-32 object-cover rounded-lg"
                        />
                    )}
                    {errors.foto && (
                        <div className="text-red-600 text-sm mt-1">{errors.foto}</div>
                    )}
                </div>

                {/* Submit Button */}
                <div className="text-right">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`${
                            isSubmitting ? "bg-gray-300" : "bg-purple-600"
                        } text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-500`}
                    >
                        {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                    </button>
                </div>
            </form>
        </div>
        </>
        // itu untuk apa mas?
    );
};

// Helper Components for Form Fields
const InputField = ({ label, id, name, type, value, onChange, error }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
        {error && <div className="text-red-600 mt-1">{error}</div>}
    </div>
);

const SelectField = ({ label, id, name, value, onChange, options, multiple = false, error }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            multiple={multiple}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        {error && <div className="text-red-600 mt-1">{error}</div>}
    </div>
);

