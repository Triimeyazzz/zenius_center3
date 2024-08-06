<?php

namespace App\Http\Controllers;

use App\Models\TryOut;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TryOutController extends Controller
{
    public function index()
    {
        $tryOuts = TryOut::with('siswa')->get();
        return Inertia::render('TryOut/Index', [
            'tryOuts' => $tryOuts
        ]);
    }

    public function create()
    {
        return Inertia::render('TryOut/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_siswa' => 'required|exists:siswa,id',
            'mata_pelajaran' => 'required|string',
            'skor' => 'required|integer',
            'tanggal_pelaksanaan' => 'required|date',
        ]);

        TryOut::create($request->all());

        return redirect()->route('try-out.index');
    }

    public function edit(TryOut $tryOut)
    {
        return Inertia::render('TryOut/Edit', [
            'tryOut' => $tryOut
        ]);
    }

    public function update(Request $request, TryOut $tryOut)
    {
        $request->validate([
            'id_siswa' => 'required|exists:siswa,id',
            'mata_pelajaran' => 'required|string',
            'skor' => 'required|integer',
            'tanggal_pelaksanaan' => 'required|date',
        ]);

        $tryOut->update($request->all());

        return redirect()->route('try-out.index');
    }

    public function destroy(TryOut $tryOut)
    {
        $tryOut->delete();

        return redirect()->route('try-out.index');
    }
}
