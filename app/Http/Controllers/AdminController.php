<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function index()
    {
        // Eager load the related user data
        $admins = Admin::with('user')->get();

        return Inertia::render('Admin/AdminComponent', [
            'admins' => $admins,
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

    // Create a new user
    $user = User::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'password' => Hash::make($validated['password']),
        'role' => $validated['role'],
    ]);

    // Create admin record
    $admin = Admin::create([
        'users_id' => $user->id,
    ]);

    // Redirect back to AdminComponent
    return redirect()->route('admin.index')->with('success', 'Admin successfully created!');
}

    public function show(Admin $admin)
    {
        return response()->json($admin);
    }

    public function update(Request $request, Admin $admin)
    {
        $validated = $request->validate([
            'users_id' => 'required|exists:users,id',
        ]);

        $admin->update($validated);
        return response()->json($admin);
    }

    public function destroy(Admin $admin)
    {
        $admin->delete();
        return response()->json(null, 204);
    }
}
