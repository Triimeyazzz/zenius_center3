<?php

namespace App\Http\Controllers;

use App\Models\Soal;
use Illuminate\Http\Request;

class SoalController extends Controller
{
    public function index()
    {
        $soal = Soal::all();
        return response()->json($soal);
    }

    public function create()
    {
        // Tidak diperlukan untuk API
    }

    public function store(Request $request)
    {
        $soal = Soal::create($request->all());
        return response()->json($soal, 201);
    }

    public function show(Soal $soal)
    {
        return response()->json($soal);
    }

    public function edit(Soal $soal)
    {
        // Tidak diperlukan untuk API
    }

    public function update(Request $request, Soal $soal)
    {
        $soal->update($request->all());
        return response()->json($soal);
    }

    public function destroy(Soal $soal)
    {
        $soal->delete();
        return response()->json(null, 204);
    }
}
