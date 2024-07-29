
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

        Route::get('users', [UserController::class, 'index'])->name('users.index');
        Route::get('users/create', [UserController::class, 'create'])->name('users.create');
        Route::post('users', [UserController::class, 'store'])->name('users.store');
        Route::get('users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
        Route::put('users/{user}', [UserController::class, 'update'])->name('users.update');
        Route::delete('users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
        Route::get('users/{user}/show', [UserController::class, 'show'])->name('users.show');

        Route::resource('program-bimbingan', ProgramBimbinganController::class);


        Route::get('/try_out', [TryOutController::class, 'index'])->name('try_out.index');
        Route::get('/try_out/{siswa}', [TryOutController::class, 'show']);
        Route::post('/try_out', [TryOutController::class, 'store']);
        Route::delete('/try_out/{id}', [TryOutController::class, 'destroy'])->name('try_out.destroy');


        Route::get('/adminsiswa', [SiswaController::class, 'index'])->name('adminsiswa.index');
        Route::get('/adminsiswa/create', [SiswaController::class, 'create'])->name('adminsiswa.create');
        Route::post('/adminsiswa', [SiswaController::class, 'store'])->name('adminsiswa.store');
        Route::get('/adminsiswa/{siswa}/show', [SiswaController::class, 'show'])->name('adminsiswa.show');
        // routes/web.php

        Route::get('/edit-siswa/{id}', function ($id) {
            // Assuming you have a method to get the siswa and program_bimbingan data
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

        Route::resource('data_bimbingan', DataBimbinganController::class);
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

require __DIR__ . '/auth.php';
