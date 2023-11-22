<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckSession
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        // Verificar si el usuario tiene una sesión activa
        if (!$request->session()->has('user')) {
            // Si no hay sesión activa, redirigir a la página de inicio de sesión
            return redirect('/login');
        }

        return $next($request);
    }
}
