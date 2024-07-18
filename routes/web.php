<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


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

use App\Http\Controllers\AdminController;

Route::get('/admin', [AdminController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('admin');


require __DIR__.'/auth.php';
