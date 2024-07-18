<?php

namespace App\Http\Controllers;

use App\Models\Sesi;
use Illuminate\Http\Request;

class SesiController extends Controller
{
    public function index()
    {
        $sesi = Sesi::all();
        return response()->json($sesi);
    }

    public function create()
    {
        // Tidak diperlukan untuk API
    }

    public function store(Request $request)
    {
        $sesi = Sesi::create($request->all());
        return response()->json($sesi, 201);
    }

    public function show(Sesi $sesi)
    {
        return response()->json($sesi);
    }

    public function edit(Sesi $sesi)
    {
        // Tidak diperlukan untuk API
    }

    public function update(Request $request, Sesi $sesi)
    {
        $sesi->update($request->all());
        return response()->json($sesi);
    }

    public function destroy(Sesi $sesi)
    {
        $sesi->delete();
        return response()->json(null, 204);
    }
}
