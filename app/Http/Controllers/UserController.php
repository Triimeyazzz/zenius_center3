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
        $search = $request->query('search');
        $roles = ['admin', 'petugas', 'siswa'];

        $query = User::query();

        if ($role) {
            $query->where('role', $role);
        }

        if ($search) {
            $query->where('name', 'like', '%' . $search . '%');
        }

        $users = $query->get();

        // Calculate role counts
        $roleCounts = User::selectRaw('role, count(*) as count')
            ->groupBy('role')
            ->pluck('count', 'role')
            ->toArray();

        return Inertia::render('Users/Index', [
            'users' => $users,
            'roles' => $roles,
            'selectedRole' => $role,
            'roleCounts' => $roleCounts,
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

        return redirect()->route('users.index', $user);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('users.index');
    }
}
