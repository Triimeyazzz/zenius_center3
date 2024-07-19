<?php
namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Inertia\Inertia;

class SiswaController extends Controller
{
    // app/Http/Controllers/SiswaController.php
public function index()
{
    $siswa = Siswa::all();
    return Inertia::render('Siswa/SiswaComponent', [
        'siswa' => $siswa->toArray(), // Convert to array if necessary
    ]);
}


public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:8|confirmed',
        'role' => 'required|string',
    ]);

    // Create the admin
    User::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'password' => bcrypt($validated['password']),
        'role' => $validated['role'],
    ]);

    // Redirect or return response
    return redirect()->route('admin.index')->with('success', 'Admin successfully created!');
}

    public function show(Siswa $siswa)
    {
        return response()->json($siswa->load('user'));
    }

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

    public function destroy(Siswa $siswa)
    {
        $siswa->user->delete();
        $siswa->delete();

        return response()->json(null, 204);
    }
}
