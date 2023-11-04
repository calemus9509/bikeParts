<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('PaginaPrincipal');
});
Route::get('/productos', function () {
    return view('Productos');
});
Route::get('/detalle', function () {
    return view('DetalleProducto');
});
Route::get('/carrito', function () {
    return view('Carrito');
});
Route::get('/nosotros', function () {
    return view('Nosotros');
});
Route::get('/login', function () {
    return view('Login');
});