<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelasController extends Controller
{
    public function index()
    {
        $kelas = Kelas::with('user')->get();
        return Inertia::render('Kelas/Index', ['kelas' => $kelas]);
    }

    public function create()
    {
        return Inertia::render('Kelas/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:kelas',
            'user_id' => 'required|exists:users,id',
        ]);

        Kelas::create($request->all());

        return redirect()->route('kelas.index')->with('success', 'Kelas created successfully.');
    }

    public function show(Kelas $kela)
    {
        return Inertia::render('Kelas/Show', ['kela' => $kela]);
    }

    public function edit(Kelas $kela)
    {
        return Inertia::render('Kelas/Edit', ['kela' => $kela]);
    }

    public function update(Request $request, Kelas $kela)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:kelas,slug,' . $kela->id,
            'user_id' => 'required|exists:users,id',
        ]);

        $kela->update($request->all());

        return redirect()->route('kelas.index')->with('success', 'Kelas updated successfully.');
    }

    public function destroy(Kelas $kela)
    {
        $kela->delete();

        return redirect()->route('kelas.index')->with('success', 'Kelas deleted successfully.');
    }
}
