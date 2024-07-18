<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Admin;
use Illuminate\Http\Request;


class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/AdminComponent');
        $admins = Admin::all();
        return response()->json($admins);
    }

    public function create()
    {
        // Tidak diperlukan untuk API
    }

    public function store(Request $request)
    {
        $admin = Admin::create($request->all());
        return response()->json($admin, 201);
    }

    public function show(Admin $admin)
    {
        return response()->json($admin);
    }

    public function edit(Admin $admin)
    {
        // Tidak diperlukan untuk API
    }

    public function update(Request $request, Admin $admin)
    {
        $admin->update($request->all());
        return response()->json($admin);
    }

    public function destroy(Admin $admin)
    {
        $admin->delete();
        return response()->json(null, 204);
    }
}
