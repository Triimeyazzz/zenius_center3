<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\KursusController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\PelajaranController;
use App\Http\Controllers\PendaftaranController;
use App\Http\Middleware\CheckRole;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return redirect('/Home');
});

Route::get('/Home', function () {
    return Inertia::render('Home/HomeComponent');
})->name('Home');

Route::get('/About', function () {
    return Inertia::render('Home/AboutUs');
})->name('About');

Route::get('/Testimoni', function () {
    return Inertia::render('Home/TestimoniComponent');
})->name('Testimoni');

// Middleware group for authenticated users
Route::middleware('auth')->group(function () {
    // Routes for admin and petugas only
    Route::middleware([CheckRole::class.':admin,petugas'])->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::get('users', [UserController::class, 'index'])->name('users.index');
        Route::get('users/create', [UserController::class, 'create'])->name('users.create');
        Route::post('users', [UserController::class, 'store'])->name('users.store');
        Route::get('users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
        Route::put('users/{user}', [UserController::class, 'update'])->name('users.update');
        Route::delete('users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
        Route::get('users/{user}/show', [UserController::class, 'show'])->name('users.show');
        
        Route::resource('kelas', KelasController::class);
        Route::resource('kursus', KursusController::class);
        Route::resource('pelajaran', PelajaranController::class);
        Route::resource('pendaftaran', PendaftaranController::class);
    });

    // Route for admin only
    Route::middleware([CheckRole::class.':admin'])->group(function () {
        Route::get('/admin', function () {
            return Inertia::render('Admin/AdminDashboard');
        })->name('admin.dashboard');
    });

    // Route for siswa only
    Route::middleware([CheckRole::class.':siswa'])->group(function () {
        Route::get('/siswa/dashboard', function () {
            return Inertia::render('Siswa/Dashboard');
        })->name('siswa.dashboard');
        
        // Route to view the profile
        Route::get('siswa/profile', [UserController::class, 'editProfile'])->name('siswa.profile.edit');

        // Route to update the profile
        Route::patch('siswa/profile', [UserController::class, 'updateProfile'])->name('profile.update');
    });

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

// Non-authenticated or guest routes
Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware(['guest'])
    ->name('login');

require __DIR__.'/auth.php';
