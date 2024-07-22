<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $role = $request->query('role');
        $roles = ['admin', 'petugas', 'siswa'];

        $users = $role 
            ? User::where('role', $role)->get() 
            : User::all();

        return Inertia::render('Users/Index', [
            'users' => $users,
            'roles' => $roles,
            'selectedRole' => $role,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'nomor_hp' => 'nullable|string|max:15',
            'alamat' => 'nullable|string|max:255',
            'role' => 'required|in:admin,petugas,siswa',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'nomor_hp' => $request->nomor_hp,
            'alamat' => $request->alamat,
            'role' => $request->role,
        ]);

        return redirect()->route('users.index');
    }

    public function show(User $user)
    {
        return Inertia::render('Users/Show', [
            'user' => $user,
        ]);
    }

    public function edit(User $user)
    {
        $roles = ['admin', 'petugas', 'siswa'];

        return Inertia::render('Users/Edit', [
            'user' => $user,
            'roles' => $roles,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'nomor_hp' => 'nullable|string|max:15',
            'alamat' => 'nullable|string|max:255',
            'role' => 'required|in:admin,petugas,siswa',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? bcrypt($request->password) : $user->password,
            'nomor_hp' => $request->nomor_hp,
            'alamat' => $request->alamat,
            'role' => $request->role,
        ]);

        return redirect()->route('users.show', $user);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('users.index');
    }
}