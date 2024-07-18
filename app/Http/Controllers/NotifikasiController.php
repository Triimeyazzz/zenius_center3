<?php

namespace App\Http\Controllers;

use App\Models\Notifikasi;
use Illuminate\Http\Request;

class NotifikasiController extends Controller
{
    public function index()
    {
        $notifikasi = Notifikasi::all();
        return response()->json($notifikasi);
    }

    public function create()
    {
        // Tidak diperlukan untuk API
    }

    public function store(Request $request)
    {
        $notifikasi = Notifikasi::create($request->all());
        return response()->json($notifikasi, 201);
    }

    public function show(Notifikasi $notifikasi)
    {
        return response()->json($notifikasi);
    }

    public function edit(Notifikasi $notifikasi)
    {
        // Tidak diperlukan untuk API
    }

    public function update(Request $request, Notifikasi $notifikasi)
    {
        $notifikasi->update($request->all());
        return response()->json($notifikasi);
    }

    public function destroy(Notifikasi $notifikasi)
    {
        $notifikasi->delete();
        return response()->json(null, 204);
    }
}
