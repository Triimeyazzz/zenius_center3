<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request;

class SiswaController extends Controller
{
    public function index()
    {
        $siswa = Siswa::all();
        return response()->json($siswa);
    }

    public function create()
    {
        // Tidak diperlukan untuk API
    }

    public function store(Request $request)
    {
        $siswa = Siswa::create($request->all());
        return response()->json($siswa, 201);
    }

    public function show(Siswa $siswa)
    {
        return response()->json($siswa);
    }

    public function edit(Siswa $siswa)
    {
        // Tidak diperlukan untuk API
    }

    public function update(Request $request, Siswa $siswa)
    {
        $siswa->update($request->all());
        return response()->json($siswa);
    }

    public function destroy(Siswa $siswa)
    {
        $siswa->delete();
        return response()->json(null, 204);
    }
}
