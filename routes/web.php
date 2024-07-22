<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

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


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});




Route::middleware('auth')->group(function () {
    Route::get('users', [UserController::class, 'index'])->name('users.index');
    route::get('users/create', [UserController::class, 'create'])->name('users.create');
    route::post('users', [UserController::class, 'store'])->name('users.store');
    route::get('users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
    route::put('users/{user}', [UserController::class, 'update'])->name('users.update');
    route::delete('users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    route::get('users/{user}/show', [UserController::class, 'show'])->name('users.show');
});
use App\Http\Controllers\KursusController;

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/kursus', [KursusController::class, 'index'])->name('kursus.index');
    Route::get('/kursus/create', [KursusController::class, 'create'])->name('kursus.create');
    Route::post('/kursus', [KursusController::class, 'store'])->name('kursus.store');
    Route::get('/kursus/{kursus}/edit', [KursusController::class, 'edit'])->name('kursus.edit');
    Route::put('/kursus/{kursus}', [KursusController::class, 'update'])->name('kursus.update');
    Route::delete('/kursus/{kursus}', [KursusController::class, 'destroy'])->name('kursus.destroy');
    Route::resource('kursus', KursusController::class);
});


    use App\Http\Controllers\KelasController;

    Route::middleware(['auth', 'admin'])->group(function () {
        Route::resource('kelas', KelasController::class);
    });
    
    Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware(['guest', 'redirectIfNotAdminOrPetugas'])
    ->name('login');

require __DIR__.'/auth.php';
