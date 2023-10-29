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
    return view('welcome');
});

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
