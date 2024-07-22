<?php

namespace App\Http\Controllers;

use App\Models\Kursus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KursusController extends Controller
{
    public function index()
    {
        $kursus = Kursus::all();
        return Inertia::render('Kursus/Index', ['kursus' => $kursus]);
    }

    public function create()
    {
        return Inertia::render('Kursus/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'gambar' => 'nullable|string|max:255',
        ]);

        Kursus::create($request->all());
        return redirect()->route('kursus.index');
    }

    public function show($id)
    {
        $kursus = Kursus::findOrFail($id);
        return Inertia::render('Kursus/Show', ['kursus' => $kursus]);
    }

    public function edit($id)
    {
        $kursus = Kursus::findOrFail($id);
        return Inertia::render('Kursus/Edit', ['kursus' => $kursus]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'gambar' => 'nullable|string|max:255',
        ]);

        $kursus = Kursus::findOrFail($id);
        $kursus->update($request->all());
        return redirect()->route('kursus.index');
    }

    public function destroy($id)
    {
        $kursus = Kursus::findOrFail($id);
        $kursus->delete();
        return redirect()->route('kursus.index');
    }
}
