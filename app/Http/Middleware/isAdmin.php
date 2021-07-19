<?php

namespace App\Http\Middleware;

use Closure;

class isAdmin
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
       
        if (!auth()->guard('api')->check()) {
            return redirect("/user/login");
        } elseif (!auth()->user()->isAdmin()) {
            return redirect("/");
        }
        return $next($request);
    }
}
