<?php

namespace App\Http\Controllers;

use App\Models\Pesan;
use Illuminate\Http\Request;

class PesanController extends Controller
{
    public function index()
    {
        $pesan = Pesan::all();
        return response()->json($pesan);
    }

    public function create()
    {
        // Tidak diperlukan untuk API
    }

    public function store(Request $request)
    {
        $pesan = Pesan::create($request->all());
        return response()->json($pesan, 201);
    }

    public function show(Pesan $pesan)
    {
        return response()->json($pesan);
    }

    public function edit(Pesan $pesan)
    {
        // Tidak diperlukan untuk API
    }

    public function update(Request $request, Pesan $pesan)
    {
        $pesan->update($request->all());
        return response()->json($pesan);
    }

    public function destroy(Pesan $pesan)
    {
        $pesan->delete();
        return response()->json(null, 204);
    }
}
