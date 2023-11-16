<?php

use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ComprasController;
use App\Http\Controllers\JefeBodegaController;
use App\Http\Controllers\MarcaMotoController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\TipoMotosController;
use App\Http\Controllers\VentasController;
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
    return view('welcome');
});

//rutas de las vistas
Route::get('/indexAdmin', function () {
    return view('indexAdmin');
})->name('indexAdmin');

Route::get('/layout', function () {
    return view('layout');
})->name('layout');

Route::get('/login', function () {
    return view('login');
})->name('login');

Route::get('/password', function () {
    return view('password');
})->name('password');

Route::get('/registro', function () {
    return view('registro');
})->name('registro');

Route::get('/inventario', function () {
    return view('inventario');
})->name('inventario');

Route::get('/formularioIn', function () {
    return view('formularioIn');
})->name('formularioIn');



//rutas de los metodos del CRUD
Route::resource('/producto', ProductoController::class)->only(['index', 'store', 'update', 'destroy']);
Route::resource('/ventas', VentasController::class)->only(['index', 'store', 'update', 'destroy']);
Route::resource('/compras', ComprasController::class)->only(['index', 'store', 'update', 'destroy']);
Route::resource('/categorias', CategoriaController::class)->only(['index', 'store', 'update', 'destroy']);
