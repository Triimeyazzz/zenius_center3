<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\KursusController;
use App\Http\Controllers\KelasController;

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

    Route::get('users', [UserController::class, 'index'])->name('users.index');
    Route::get('users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('users', [UserController::class, 'store'])->name('users.store');
    Route::get('users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::put('users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    Route::get('users/{user}/show', [UserController::class, 'show'])->name('users.show');
    
    // Routes for Kelas and Kursus without admin middleware
    Route::resource('kelas', KelasController::class);
    Route::resource('kursus', KursusController::class);
});

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware(['guest'])
    ->name('login');

require __DIR__.'/auth.php';
