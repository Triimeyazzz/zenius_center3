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
}