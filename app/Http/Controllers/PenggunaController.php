<?php

namespace App\Http\Controllers;

use App\Models\Pengguna;
use Illuminate\Http\Request;

class PenggunaController extends Controller
{
    public function index()
    {
        $penggunas = Pengguna::all();
        return response()->json($penggunas);
    }

    public function create()
    {
        // Tidak diperlukan untuk API
    }

    public function store(Request $request)
    {
        $pengguna = Pengguna::create($request->all());
        return response()->json($pengguna, 201);
    }

    public function show(Pengguna $pengguna)
    {
        return response()->json($pengguna);
    }

    public function edit(Pengguna $pengguna)
    {
        // Tidak diperlukan untuk API
    }

    public function update(Request $request, Pengguna $pengguna)
    {
        $pengguna->update($request->all());
        return response()->json($pengguna);
    }

    public function destroy(Pengguna $pengguna)
    {
        $pengguna->delete();
        return response()->json(null, 204);
    }
}

