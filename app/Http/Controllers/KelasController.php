<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;


class KelasController extends Controller
{
    public function index()
    {
        $kelas = Kelas::all();
        return Inertia::render('Kelas/Index', ['kelas' => $kelas]);
    }

    public function create()
    {
        $users = User::all(); // Ambil semua pengguna
        return Inertia::render('Kelas/Create', ['users' => $users]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'user_ids' => 'required|array',
            'user_ids.*' => 'exists:users,id',
        ]);

        $kelas = Kelas::create([
            'name' => $validated['name'],
            'slug' => $validated['slug'],
        ]);

        // Attach users to kelas
        $kelas->users()->sync($validated['user_ids']);

        return redirect()->route('kelas.index')->with('success', 'Kelas created successfully.');
    }

    public function show(Kelas $kelas)
    {
        return Inertia::render('Kelas/Show', ['kelas' => $kelas]);
    }

    public function edit(Kelas $kelas)
    {
        return Inertia::render('Kelas/Edit', ['kelas' => $kelas]);
    }

    public function update(Request $request, Kelas $kelas)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:kelas,slug,' . $kelas->id,
            'user_id' => 'required|exists:users,id',
        ]);

        $kelas->update($validated);

        return redirect()->route('kelas.index')->with('success', 'Kelas updated successfully.');
    }

    public function destroy(Kelas $kelas)
    {
        $kelas->delete();

        return redirect()->route('kelas.index')->with('success', 'Kelas deleted successfully.');
    }
}
