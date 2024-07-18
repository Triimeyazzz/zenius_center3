<?php

namespace App\Http\Controllers;

use App\Models\Cicilan;
use Illuminate\Http\Request;

class CicilanController extends Controller
{
    public function index()
    {
        $cicilan = Cicilan::all();
        return response()->json($cicilan);
    }

    public function create()
    {
        // Tidak diperlukan untuk API
    }

    public function store(Request $request)
    {
        $cicilan = Cicilan::create($request->all());
        return response()->json($cicilan, 201);
    }

    public function show(Cicilan $cicilan)
    {
        return response()->json($cicilan);
    }

    public function edit(Cicilan $cicilan)
    {
        // Tidak diperlukan untuk API
    }

    public function update(Request $request, Cicilan $cicilan)
    {
        $cicilan->update($request->all());
        return response()->json($cicilan);
    }

    public function destroy(Cicilan $cicilan)
    {
        $cicilan->delete();
        return response()->json(null, 204);
    }
}
