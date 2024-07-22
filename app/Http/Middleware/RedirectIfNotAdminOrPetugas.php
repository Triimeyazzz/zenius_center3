<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RedirectIfNotAdminOrPetugas
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = Auth::user();

        if ($user->role == 'admin') {
            return redirect('/admin-dashboard');
        }

        if ($user->role == 'petugas') {
            return redirect('/petugas-dashboard');
        }

        if ($user->role == 'siswa') {
            return redirect('/siswa-dashboard');
        }

        return $next($request);
    }
}
