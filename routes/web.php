<?php

use App\Http\Controllers\EmpresaController;
use App\Http\Resources\Empresa;
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

Route::get('/nuevo', function () {
    return view('niuevo');
});

Route::get('/empresa', function () {
    return view('CrudEmpresas');
});

Route::get('/lasmejoresTiendas', function () {
    return view('/lasmejoresTiendas');
});


Route::resource('/empresas', EmpresaController::class)->only(["index","store","update","destroy"]);

