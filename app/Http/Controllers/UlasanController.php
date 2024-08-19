<?php

namespace App\Http\Controllers;

use App\Models\Ulasan;
use Illuminate\Http\Request;
use Inertia\Inertia;


class UlasanController extends Controller
{
    public function create()
    {
        return Inertia::render('Ulasan/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'penilaian' => 'required|integer|between:1,5',
            'komentar' => 'required|string|max:1000',
        ]);

        $ulasan = Ulasan::create([
            'siswa_id' => auth()->id(),
            'penilaian' => $request->penilaian,
            'komentar' => $request->komentar,
        ]);

        return redirect()->route('Home.Home')->with('success', 'Ulasan berhasil ditambahkan');
    }

    public function createAdmin()
    {
        $ulasans = Ulasan::with('siswa')->get(); // Fetch all reviews with associated student data
    
        return Inertia::render('Ulasan/CreateAdmin', [
            'ulasans' => $ulasans,
        ]);
    }
    
public function storeAdmin(Request $request)
{
    $request->validate([
        'penilaian' => 'required|integer|between:1,5',
        'komentar' => 'required|string|max:1000',
        'photo' => 'nullable|image|max:2048', // Validate the photo
    ]);

    $photoPath = $request->file('photo') ? $request->file('photo')->store('photos', 'public') : null;

    $ulasan = Ulasan::create([
        'siswa_id' => auth()->id(),
        'penilaian' => $request->penilaian,
        'komentar' => $request->komentar,
        'photo' => $photoPath, // Save the photo path
    ]);

    return redirect()->route('Ulasan/CreateAdmin')->with('success', 'Ulasan berhasil ditambahkan');
}

}