<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Storage;

class QRCodeController extends Controller
{
    public function index()
    {
        return view('admin.pages.qr_code.index');
    }

    public function submit(Request $request)
    {
        $request->validate([
            'link' => 'required'
        ]);

        $code = time();

        // untuk format bisa sesuaiin
        // (format yang tersedia: png, eps, dan svg)
        // sesuaikan ukuran image QR-nya
        // dengan menambahkan ->size(ukuranDalamPixel, contoh: 100);
        // QrCode::format('png')->size(100)->generate($request->link);
        $qr = QrCode::format('png')->generate($request->link);
        $qrImageName = $code . '.png';

        // simpan ke local storage
        Storage::put('public/qr/' . $qrImageName, $qr);

        return inertia('admin.pages.qr_code.scanner', compact('code'));
    }
}
