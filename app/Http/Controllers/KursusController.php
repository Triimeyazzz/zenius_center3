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
    return Inertia::render('Kursus/KursusListCreate', [
        'kursus' => $kursus
    ]);
}

    public function create()
    {
        return Inertia::render('KursusCreate');
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'gambar' => 'nullable|image|mimes:jpg,png,jpeg|max:2048',
        ]);
    
        // Store the image if it exists
        $gambarPath = $request->file('gambar')?->store('gambar', 'public');
    
        // Create the new Kursus entry
        Kursus::create([
            'judul' => $request->input('judul'),
            'deskripsi' => $request->input('deskripsi'),
            'gambar' => $gambarPath,
        ]);
    
        // Redirect back to the index page
        return redirect()->route('kursus.index');
    }
        public function show(Kursus $kursus)
    {
        return Inertia::render('KursusShow', [
            'kursus' => $kursus
        ]);
    }

    public function edit(Kursus $kursus)
    {
        return Inertia::render('KursusEdit', [
            'kursus' => $kursus
        ]);
    }

    public function update(Request $request, Kursus $kursus)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'gambar' => 'nullable|image|mimes:jpg,png,jpeg|max:2048',
        ]);

        $gambarPath = $request->file('gambar')?->store('gambar', 'public');

        $kursus->update([
            'judul' => $request->input('judul'),
            'deskripsi' => $request->input('deskripsi'),
            'gambar' => $gambarPath ?? $kursus->gambar,
        ]);

        return redirect()->route('kursus.index');
    }

    public function destroy(Kursus $kursus)
    {
        $kursus->delete();
        return redirect()->route('kursus.index');
    }
}
