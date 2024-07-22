<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SiswaController extends Controller
{
    // Display a listing of the resource
    public function index()
    {
        $siswa = Siswa::all();
        return Inertia::render('Siswa/SiswaComponent', [
            'siswa' => $siswa->toArray(),
        ]);
    }

    // Store a newly created resource in storage
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|string',
        ]);

        // Create the user with the role
        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => $validated['role'],
        ]);

        // Redirect or return response
        return redirect()->route('siswa.index')->with('success', 'Siswa successfully created!');
    }

    // Display the specified resource
    public function show(Siswa $siswa)
    {
        return response()->json($siswa->load('user'));
    }

    // Update the specified resource in storage
    public function update(Request $request, Siswa $siswa)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $siswa->user->id,
            'password' => 'sometimes|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $siswa->user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? Hash::make($request->password) : $siswa->user->password,
        ]);

        $siswa->update(['users_id' => $siswa->user->id]);

        return response()->json($siswa);
    }

    // Remove the specified resource from storage
    public function destroy(Siswa $siswa)
    {
        $siswa->user->delete();
        $siswa->delete();

        return response()->json(null, 204);
    }
}
