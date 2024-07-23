<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class Authenticate
{
    public function handle($request, Closure $next, ...$guards)
    {
        if (Auth::guard($guards)->check()) {
            return $next($request);
        }

        return redirect()->route('login');
    }
}
