<?php

namespace App\Http\Controllers;

use App\Models\Pelajaran;
use Illuminate\Http\Request;

class PelajaranController extends Controller
{
    public function index()
    {
        $pelajaran = Pelajaran::all();
        return response()->json($pelajaran);
    }

    public function create()
    {
        // Tidak diperlukan untuk API
    }

    public function store(Request $request)
    {
        $pelajaran = Pelajaran::create($request->all());
        return response()->json($pelajaran, 201);
    }

    public function show(Pelajaran $pelajaran)
    {
        return response()->json($pelajaran);
    }

    public function edit(Pelajaran $pelajaran)
    {
        // Tidak diperlukan untuk API
    }

    public function update(Request $request, Pelajaran $pelajaran)
    {
        $pelajaran->update($request->all());
        return response()->json($pelajaran);
    }

    public function destroy(Pelajaran $pelajaran)
    {
        $pelajaran->delete();
        return response()->json(null, 204);
    }
}
