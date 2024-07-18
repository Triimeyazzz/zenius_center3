<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
use Illuminate\Http\Request;

class PembayaranController extends Controller
{
    public function index()
    {
        $pembayaran = Pembayaran::all();
        return response()->json($pembayaran);
    }

    public function create()
    {
        // Tidak diperlukan untuk API
    }

    public function store(Request $request)
    {
        $pembayaran = Pembayaran::create($request->all());
        return response()->json($pembayaran, 201);
    }

    public function show(Pembayaran $pembayaran)
    {
        return response()->json($pembayaran);
    }

    public function edit(Pembayaran $pembayaran)
    {
        // Tidak diperlukan untuk API
    }

    public function update(Request $request, Pembayaran $pembayaran)
    {
        $pembayaran->update($request->all());
        return response()->json($pembayaran);
    }

    public function destroy(Pembayaran $pembayaran)
    {
        $pembayaran->delete();
        return response()->json(null, 204);
    }
}
