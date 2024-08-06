<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckUserRole
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, $role)
    {
        $user = Auth::user();
        
        if ($user && $user->role === $role) {
            return $next($request);
        }
        
        return redirect('/home'); // Redirect to a default route or error page
    }
}
