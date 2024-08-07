<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Hash; // Ensure this is included
use App\Models\Siswa; // Add this line to use the Siswa model
use Illuminate\Validation\ValidationException;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        // Validate the request
        $credentials = $request->only('email', 'password');

        // Try to authenticate as User
        if (Auth::guard('web')->attempt($credentials)) {
            $user = Auth::guard('web')->user();
            $redirectUrl = '';

            // Set redirect URL based on user role
            switch ($user->role) {
                case 'admin':
                case 'petugas':
                    $redirectUrl = route('dashboard');
                    break;
                default:
                    $redirectUrl = route('Home'); // Fallback route
                    break;
            }

            return redirect()->intended($redirectUrl);
        }

        // Try to authenticate as Siswa
        if ($siswa = Siswa::where('email', $request->email)->first()) {
            if (Hash::check($request->password, $siswa->password)) {
                Auth::guard('siswa')->login($siswa);
                return redirect()->route('siswa.dashboard'); // Redirect to siswa's dashboard
            }
        }

        // If authentication fails
        throw ValidationException::withMessages([
            'email' => __('The provided credentials do not match our records.'),
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
