<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user(); // Get the current authenticated user

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

        $roleCounts = User::selectRaw('role, count(*) as count')
            ->groupBy('role')
            ->pluck('count', 'role')
            ->toArray();

        return Inertia::render('Users/Index', [
            'users' => $users,
            'roles' => $roles,
            'selectedRole' => $role,
            'roleCounts' => $roleCounts,
            'currentUser' => $user, // Pass the current user data
        ]);
    }

    // Store a new user
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'nomor_hp' => 'nullable|string|max:15',
            'alamat' => 'nullable|string|max:255',
            'role' => 'required|in:admin,petugas,siswa',
            'profile_picture' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        $profilePicturePath = null;
        if ($request->hasFile('profile_picture')) {
            $profilePicturePath = $request->file('profile_picture')->store('profile_pictures', 'public');
        }

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'nomor_hp' => $request->nomor_hp,
            'alamat' => $request->alamat,
            'role' => $request->role,
            'profile_picture' => $profilePicturePath,
        ]);

        return redirect()->route('users.index');
    }

    // Update an existing user
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'nomor_hp' => 'nullable|string|max:15',
            'alamat' => 'nullable|string|max:255',
            'role' => 'required|in:admin,petugas,siswa',
            'profile_picture' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        $profilePicturePath = $user->profile_picture;
        if ($request->hasFile('profile_picture')) {
            if ($profilePicturePath && file_exists(storage_path('app/public/' . $profilePicturePath))) {
                unlink(storage_path('app/public/' . $profilePicturePath));
            }
            $profilePicturePath = $request->file('profile_picture')->store('profile_pictures', 'public');
        }

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? bcrypt($request->password) : $user->password,
            'nomor_hp' => $request->nomor_hp,
            'alamat' => $request->alamat,
            'role' => $request->role,
            'profile_picture' => $profilePicturePath,
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

    public function destroy(User $user)
    {
        if ($user->profile_picture && file_exists(storage_path('app/public/' . $user->profile_picture))) {
            unlink(storage_path('app/public/' . $user->profile_picture));
        }

        $user->delete();
        return redirect()->route('users.index');
    }

    public function editProfile()
    {
        $user = auth()->user();
        return Inertia::render('Siswa/Profile/Edit', [
            'user' => $user,
        ]);
    }

    public function updateProfile(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users,email,' . auth()->id(),
        'password' => 'nullable|string|min:8|confirmed',
        'nomor_hp' => 'nullable|string|max:15',
        'alamat' => 'nullable|string|max:255',
    ]);

    $user = auth()->user();

    $user->update([
        'name' => $request->name,
        'email' => $request->email,
        'password' => $request->password ? bcrypt($request->password) : $user->password,
        'nomor_hp' => $request->nomor_hp,
        'alamat' => $request->alamat,
    ]);

    return redirect()->route('siswa.dashboard');
}


}
