<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Petugas;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PetugasController extends Controller
{
    public function index()
    {
        $petugass = Petugas::with('user')->get();

        return Inertia::render('Petugas/PetugasComponent', [
            'petugass' => $petugass,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:admin,petugas,siswa',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
        ]);

        $petugas = Petugas::create([
            'users_id' => $user->id,
        ]);

        return redirect()->route('petugas.index')->with('success', 'Petugas successfully created!');
    }

    public function show(Petugas $petugas)
    {
        return response()->json($petugas);
    }

    public function update(Request $request, Petugas $petugas)
    {
        $validated = $request->validate([
            'users_id' => 'required|exists:users,id',
        ]);

        $petugas->update($validated);
        return response()->json($petugas);
    }

    public function destroy(Petugas $petugas)
    {
        $petugas->delete();
        return response()->json(null, 204);
    }
}
