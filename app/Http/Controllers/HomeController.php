<?php
namespace App\Http\Controllers;

use App\Models\Ulasan;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
{

    return Inertia::render('Home/HomeComponent', [
    ]);
}

}
