<?php

namespace App\Http\Controllers;

use App\Models\Pendaftaran;
use Illuminate\Http\Request;

class PendaftaranController extends Controller
{
    public function index()
    {
        $pendaftaran = Pendaftaran::all();
        return response()->json($pendaftaran);
    }

    public function create()
    {
        // Tidak diperlukan untuk API
    }

    public function store(Request $request)
    {
        $pendaftaran = Pendaftaran::create($request->all());
        return response()->json($pendaftaran, 201);
    }

    public function show(Pendaftaran $pendaftaran)
    {
        return response()->json($pendaftaran);
    }

    public function edit(Pendaftaran $pendaftaran)
    {
        // Tidak diperlukan untuk API
    }

    public function update(Request $request, Pendaftaran $pendaftaran)
    {
        $pendaftaran->update($request->all());
        return response()->json($pendaftaran);
    }

    public function destroy(Pendaftaran $pendaftaran)
    {
        $pendaftaran->delete();
        return response()->json(null, 204);
    }
}
