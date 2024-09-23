<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        $roles = User::distinct()->pluck('role');
        $roleCounts = User::selectRaw('role, COUNT(*) as count')->groupBy('role')->pluck('count', 'role');
        $selectedRole = request('role');

        return Inertia::render('Users/Index', [
            'users' => $users,
            'roles' => $roles,
            'roleCounts' => $roleCounts,
            'selectedRole' => $selectedRole,
            'auth' => [
                'user' => auth()->user(),
            ],
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
            'role' => 'required|string|max:255',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->only(['name', 'email', 'password', 'nomor_hp', 'alamat', 'role']);
        $data['password'] = Hash::make($data['password']);

        if ($request->hasFile('profile_picture')) {
            $data['profile_picture'] = $request->file('profile_picture')->store('profile_pictures', 'public');
        }

        User::create($data);

        return redirect()->route('users.index');
    }

    public function update(Request $request, User $user)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'nomor_hp' => 'nullable|string|max:15',
            'alamat' => 'nullable|string|max:255',
            'role' => 'required|string|max:255',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->only(['name', 'email', 'nomor_hp', 'alamat', 'role']);
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->input('password'));
        }

        if ($request->hasFile('profile_picture')) {
            // Delete old profile picture if exists
            if ($user->profile_picture) {
                Storage::disk('public')->delete($user->profile_picture);
            }
            $data['profile_picture'] = $request->file('profile_picture')->store('profile_pictures', 'public');
        }


        $user->update($data);

        return redirect()->route('users.index');
    }

    public function show(User $user)
    {
        return Inertia::render('Users/Show', ['user' => $user]);
    }

    public function edit($id)
{
    $user = User::findOrFail($id);
    $roles = ['admin', 'petugas']; // Adjust roles as needed

    return Inertia::render('Users/Edit', [
        'user' => $user,
        'roles' => $roles,
    ]);
}



    public function destroy(User $user)
    {
        if ($user->profile_picture) {
            Storage::disk('public')->delete($user->profile_picture);
        }

        $user->delete();

        return redirect()->route('users.index');
    }

    public function editProfile()
    {
        return Inertia::render('Users/EditProfile', [
            'user' => auth()->user(),
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = auth()->user();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'nomor_hp' => 'nullable|string|max:15',
            'alamat' => 'nullable|string|max:255',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->only(['name', 'email', 'nomor_hp', 'alamat']);
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->input('password'));
        }

        if ($request->hasFile('profile_picture')) {
            // Delete old profile picture if exists
            if ($user->profile_picture) {
                Storage::disk('public')->delete($user->profile_picture);
            }
            $data['profile_picture'] = $request->file('profile_picture')->store('profile_pictures', 'public');
        }

        $user->update($data);

        return redirect()->route('users.index');
    }
}
