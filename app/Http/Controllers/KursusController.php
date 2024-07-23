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
    $validated = $request->validate([
        'judul' => 'required|string|max:255',
        'deskripsi' => 'required|string',
        'gambar' => 'nullable|image|max:2048', // Adjust the validation as needed
    ]);

    // Handle file upload
    if ($request->hasFile('gambar')) {
        $file = $request->file('gambar');
        $filePath = $file->store('kursus_images', 'public'); // Store in public storage
        $validated['gambar'] = $filePath;
    }

    Kursus::create($validated);

    return redirect()->route('kursus.index')->with('success', 'Kursus created successfully.');
}


    public function show(Kursus $kursus)
    {
        return Inertia::render('Kursus/Show', ['kursus' => $kursus]);
    }

    public function edit(Kursus $kursus)
    {
        return Inertia::render('Kursus/Edit', ['kursus' => $kursus]);
    }

    public function update(Request $request, Kursus $kursus)
{
    $validated = $request->validate([
        'judul' => 'required|string|max:255',
        'deskripsi' => 'required|string',
        'gambar' => 'nullable|image|max:2048',
    ]);

    // Handle file upload
    if ($request->hasFile('gambar')) {
        $file = $request->file('gambar');
        $filePath = $file->store('kursus_images', 'public'); // Store in public storage
        $validated['gambar'] = $filePath;
    }

    $kursus->update($validated);

    return redirect()->route('kursus.index')->with('success', 'Kursus updated successfully.');
}

public function destroy(Kursus $kursus)
{
    $kursus->delete();

    return redirect()->route('kursus.index')->with('success', 'Kursus deleted successfully.');
}

}
