import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Html5QrcodePlugin from "@/Components/Html5QrcodePlugin";
import { useForm, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function Scan({
    absensiGroupedByDate,
    classes,
    selectedClass,
    selectedDate,
    auth,
}) {
    const { flash } = usePage().props || {}; // Pastikan `props` terdefinisi
    const [successMessage, setSuccessMessage] = useState(null);

    const { data, setData, post } = useForm({
        id: '',
    });

    // Fungsi untuk menangani hasil scan QR
    const onNewScanResult = (decodedText, decodedResult) => {
        Inertia.post(route('absensi.scanQr'), {
            id: decodedText,
        }, {
            onSuccess: () => {
                // Flash message akan dikelola di Laravel, tidak perlu action di sini
            },
        });
    };

    // Mengambil pesan flash dari server ketika page di-load ulang
    useEffect(() => {
        console.log(flash); // Periksa apakah flash object diterima
        if (flash?.success) {
            alert(flash.success); // Tambahkan alert untuk memeriksa
            setSuccessMessage(flash.success);
        }
    }, [flash]);

    return (
        <AuthenticatedLayout
            user={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Absensi
                </h2>
            }
        >
            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-purple-800">
                        Scan Absensi
                    </h1>
                </div>

                {/* Tampilkan notifikasi sukses jika ada */}
                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
                        <span className="block sm:inline">{successMessage}</span>
                    </div>
                )}

                <Html5QrcodePlugin
                    fps={10}
                    qrbox={250}
                    disableFlip={false}
                    qrCodeSuccessCallback={onNewScanResult}
                />
            </div>
        </AuthenticatedLayout>
    );
}
