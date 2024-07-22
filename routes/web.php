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
    Route::get('/users/admin', [UserController::class, 'indexAdmin'])->name('users.admin.index');
    Route::post('/users/admin', [UserController::class, 'storeAdmin'])->name('users.admin.store');

    Route::get('/users/petugas', [UserController::class, 'indexPetugas'])->name('users.petugas.index');
    Route::post('/users/petugas', [UserController::class, 'storePetugas'])->name('users.petugas.store');

    Route::get('/users/siswa', [UserController::class, 'indexSiswa'])->name('users.siswa.index');
    Route::post('/users/siswa', [UserController::class, 'storeSiswa'])->name('users.siswa.store');
});



Route::middleware('auth')->group(function () {
    Route::resource('users', UserController::class);
});


require __DIR__.'/auth.php';
