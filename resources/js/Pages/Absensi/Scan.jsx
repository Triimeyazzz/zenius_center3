import React, { useState } from "react";
import * as XLSX from "xlsx";
import {Html5QrcodeScanner} from "html5-qrcode";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Html5QrcodePlugin from "@/Components/Html5QrcodePlugin";
import { useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";


export default function Scan({
    absensiGroupedByDate,
    classes,
    selectedClass,
    selectedDate,
    auth,
}) {
    const {data, setData, post} = useForm({
        id: '',
    });
    const onNewScanResult = (decodedText, decodedResult) => {
        Inertia.post(route('absensi.scanQr'), {
            id: decodedText
        });
    };
    // function onScanSuccess(decodedText, decodedResult) {
    //     window.location.href = decodedResult.decodedText;
    //     html5QRCodeScanner.clear();
    // }

    // html5QRCodeScanner.render(onScanSuccess);
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
