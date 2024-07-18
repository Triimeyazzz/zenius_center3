<?php

namespace App\Http\Controllers;

use App\Models\Ulasan;
use Illuminate\Http\Request;

class UlasanController extends Controller
{
    public function index()
    {
        $ulasan = Ulasan::all();
        return response()->json($ulasan);
    }

    public function create()
    {
        // Tidak diperlukan untuk API
    }

    public function store(Request $request)
    {
        $ulasan = Ulasan::create($request->all());
        return response()->json($ulasan, 201);
    }

    public function show(Ulasan $ulasan)
    {
        return response()->json($ulasan);
    }

    public function edit(Ulasan $ulasan)
    {
        // Tidak diperlukan untuk API
    }

    public function update(Request $request, Ulasan $ulasan)
    {
        $ulasan->update($request->all());
        return response()->json($ulasan);
    }

    public function destroy(Ulasan $ulasan)
    {
        $ulasan->delete();
        return response()->json(null, 204);
    }
}
