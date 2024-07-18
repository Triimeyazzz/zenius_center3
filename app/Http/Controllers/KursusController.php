<?php

namespace App\Http\Controllers;

use App\Models\Kursus;
use Illuminate\Http\Request;

class KursusController extends Controller
{
    public function index()
    {
        $kursus = Kursus::all();
        return response()->json($kursus);
    }

    public function create()
    {
        // Tidak diperlukan untuk API
    }

    public function store(Request $request)
    {
        $kursus = Kursus::create($request->all());
        return response()->json($kursus, 201);
    }

    public function show(Kursus $kursus)
    {
        return response()->json($kursus);
    }

    public function edit(Kursus $kursus)
    {
        // Tidak diperlukan untuk API
    }

    public function update(Request $request, Kursus $kursus)
    {
        $kursus->update($request->all());
        return response()->json($kursus);
    }

    public function destroy(Kursus $kursus)
    {
        $kursus->delete();
        return response()->json(null, 204);
    }
}

