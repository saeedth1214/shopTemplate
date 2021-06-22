<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class setPassportToken extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next, ...$guards)
    {
        $token=cache()->get('accessToken');

        // dd($token);
        // dd( cache()->pull('accessToken'));
        // dd(auth()->guard('api')->user());
        $request->headers->set(
            'Authorization',
            "Bearer $token"
        );
        // // dd();
        // dd($request->headers,$guards);

        $this->authenticate($request, $guards);

        return $next($request);
    }
    protected function redirectTo($request)
    {
        if (!$request->expectsJson()) {
            return route('login');
        }
    }
}
