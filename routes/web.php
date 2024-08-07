
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
use App\Http\Controllers\ProgramBimbinganController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\DataBimbinganController;
use App\Http\Controllers\TryOutController;
use App\Models\Siswa;
use App\Models\ProgramBimbingan;
use App\Http\Controllers\Auth\SiswaLoginController;
use App\Http\Controllers\SiswaDashboardController;
use App\Http\Controllers\PresentController;
use App\Http\Controllers\AbsensiController;

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
    Route::middleware([CheckRole::class . ':admin,petugas'])->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('/dashboard/count', [DashboardController::class, 'count']);
        Route::get('/dashboard/data', [DashboardController::class, 'data']);

        Route::get('users', [UserController::class, 'index'])->name('users.index');
        Route::get('users/create', [UserController::class, 'create'])->name('users.create');
        Route::post('users', [UserController::class, 'store'])->name('users.store');
        Route::get('users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
        Route::put('users/{user}', [UserController::class, 'update'])->name('users.update');
        Route::delete('users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
        Route::get('users/{user}/show', [UserController::class, 'show'])->name('users.show');

        Route::resource('program-bimbingan', ProgramBimbinganController::class);


        Route::get('tryout', [TryOutController::class, 'index'])->name('tryout.index');
        Route::get('tryout/{siswa}/progress', [TryOutController::class, 'progress'])->name('tryout.progress');
        Route::get('tryout/{siswa}/create', [TryOutController::class, 'create'])->name('tryout.create');
        Route::post('tryout/{siswa}', [TryOutController::class, 'store'])->name('tryout.store');
        Route::delete('/tryout/{id}', [TryOutController::class, 'destroy'])->name('tryout.destroy');

        Route::get('/adminsiswa', [SiswaController::class, 'index'])->name('adminsiswa.index');
        Route::get('/adminsiswa/create', [SiswaController::class, 'create'])->name('adminsiswa.create');
        Route::post('/adminsiswa', [SiswaController::class, 'store'])->name('adminsiswa.store');
        Route::get('/adminsiswa/{siswa}/show', [SiswaController::class, 'show'])->name('adminsiswa.show');
        // routes/web.php
        Route::get('/edit-siswa/{id}', function ($id) {
            $siswa = Siswa::findOrFail($id);
            $program_bimbingan = ProgramBimbingan::all();
        
            return Inertia::render('AdminSiswa/Edit', [
                'siswa' => $siswa,
                'program_bimbingan' => $program_bimbingan,
            ]);
        })->name('adminsiswa.edit');
        
        Route::put('/adminsiswa/{siswa}', [SiswaController::class, 'update'])->name('adminsiswa.update');
        Route::delete('/adminsiswa/{siswa}', [SiswaController::class, 'destroy'])->name('adminsiswa.destroy');
        Route::get('/siswa/{siswa}/export-pdf', [SiswaController::class, 'exportPdf'])->name('siswa.exportPdf');
        Route::get('/get-pdf-url/{siswa}', [SiswaController::class, 'getPdfUrl']);
        Route::get('/adminsiswa/count', [SiswaController::class, 'count']);

        Route::resource('data_bimbingan', DataBimbinganController::class);

        Route::get('databimbingan', [DataBimbinganController::class, 'index'])->name('databimbingan.index');
        Route::get('databimbingan/create', [DataBimbinganController::class, 'create'])->name('databimbingan.create');
        Route::post('databimbingan', [DataBimbinganController::class, 'store'])->name('databimbingan.store');
        Route::get('databimbingan/{id}/edit', [DataBimbinganController::class, 'edit'])->name('databimbingan.edit');
        Route::put('databimbingan/{id}', [DataBimbinganController::class, 'update'])->name('databimbingan.update');
        Route::delete('/databimbingan/{id}', [DataBimbinganController::class, 'destroy'])->name('databimbingan.destroy');

        Route::resource('absensi', AbsensiController::class);

        Route::get('absensi', [AbsensiController::class, 'index'])->name('absensi.index');
        Route::get('absensi/create', [AbsensiController::class, 'create'])->name('absensi.create');
        Route::post('absensi', [AbsensiController::class, 'store'])->name('absensi.store');
        Route::delete('/absensi/{id}', [AbsensiController::class, 'destroy'])->name('absensi.destroy');

    });

    // Route for admin only
    Route::middleware([CheckRole::class . ':admin'])->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');
    });

    // Route for siswa only
});

// Non-authenticated or guest routes
Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware(['guest'])
    ->name('login');

Route::get('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware(['auth'])
    ->name('logout');

Route::middleware(['auth:siswa'])->group(function () {
    // Dashboard siswa
    Route::get('/siswa/dashboard', [SiswaDashboardController::class, 'index'])->name('siswa.dashboard');


    Route::get('/siswa/edit', [SiswaController::class, 'edit'])->name('siswa.edit');
    Route::post('/siswa/update', [SiswaController::class, 'update'])->name('siswa.update');
});


require __DIR__ . '/auth.php';
