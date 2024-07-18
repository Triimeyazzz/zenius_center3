<?php

namespace App\Http\Controllers;

use App\Models\Petugas;
use Illuminate\Http\Request;

class PetugasController extends Controller
{
    public function index()
    {
        $petugas = Petugas::all();
        return response()->json($petugas);
    }

    public function create()
    {
        // Tidak diperlukan untuk API
    }

    public function store(Request $request)
    {
        $petugas = Petugas::create($request->all());
        return response()->json($petugas, 201);
    }

    public function show(Petugas $petugas)
    {
        return response()->json($petugas);
    }

    public function edit(Petugas $petugas)
    {
        // Tidak diperlukan untuk API
    }

    public function update(Request $request, Petugas $petugas)
    {
        $petugas->update($request->all());
        return response()->json($petugas);
    }

    public function destroy(Petugas $petugas)
    {
        $petugas->delete();
        return response()->json(null, 204);
    }
}

