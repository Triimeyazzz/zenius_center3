<?php

namespace App\Http\Controllers;

use App\Models\ProgramBimbingan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProgramBimbinganController extends Controller
{
    public function index()
    {
        $programBimbingans = ProgramBimbingan::all();
        return Inertia::render('ProgramBimbingan/Index', [
            'programBimbingans' => $programBimbingans
        ]);
    }

    public function create()
    {
        return Inertia::render('ProgramBimbingan/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_program' => 'required|string|max:255',
            'keuntungan' => 'nullable|string',
        ]);

        ProgramBimbingan::create($request->all());

        return redirect()->route('program-bimbingan.index');
    }

    public function edit(ProgramBimbingan $programBimbingan)
    {
        return Inertia::render('ProgramBimbingan/Edit', [
            'programBimbingan' => $programBimbingan
        ]);
    }

    public function update(Request $request, ProgramBimbingan $programBimbingan)
    {
        $request->validate([
            'nama_program' => 'required|string|max:255',
            'keuntungan' => 'nullable|string',
        ]);

        $programBimbingan->update($request->all());

        return redirect()->route('program-bimbingan.index');
    }

    public function destroy(ProgramBimbingan $programBimbingan)
    {
        $programBimbingan->delete();

        return redirect()->route('program-bimbingan.index');
    }
}
