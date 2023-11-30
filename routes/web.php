<?php

use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ComprasController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\VentasController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\PersonaController;
use App\Http\Controllers\RecuperarContraseñaController;
use App\Http\Controllers\RolController;
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
    return view('lasmejoresTiendas');
});

//rutas de las vistas
Route::get('/indexAdmin', function () {
    $response = response(view('indexAdmin'));

    return $response->header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
})->name('indexAdmin')->middleware('checkSession');

Route::get('/layout', function () {
    $response = response(view('layout'));

    return $response->header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
})->name('layout')->middleware('checkSession');


Route::get('/inventario', function () {
    $response = response(view('inventario'));

    return $response->header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
})->name('inventario')->middleware('checkSession');

Route::get('/formularioIn', function () {
    return view('formularioIn');
})->name('formularioIn')->middleware('checkSession');



//rutas de los metodos del CRUD
Route::resource('/producto', ProductoController::class)->only(['index', 'store', 'update', 'destroy']);
Route::resource('/ventas', VentasController::class)->only(['index', 'store', 'update', 'destroy']);
Route::resource('/compras', ComprasController::class)->only(['index', 'store', 'update', 'destroy']);
Route::resource('/categorias', CategoriaController::class)->only(['index', 'store', 'update', 'destroy']);


//rutas de kevin

Route::get('/empresa', function () {
    return view('CrudEmpresas');
});

Route::get('/pagina-principal', function () {
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
// Route::get('/login', function () {
//     $response = response(view('Login'));

//     return $response->header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
// });
Route::get('/login', function () {
    // Verificar si el usuario ya ha iniciado sesión
    if (session('user')) {
        // Si ya ha iniciado sesión, redirigir a /indexAdmin
        return redirect('/indexAdmin');
    }

    // Si no ha iniciado sesión, mostrar la página de inicio de sesión
    $response = response(view('Login'));
    return $response->header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
});
Route::get('/administradores-clientes', function () {
    return view('Administradores');
});

Route::get('/formulario', function () {
    return view('FormularioCC');
})->middleware('checkSession');

Route::get('/recuperar', function () {
    return view('ResetContraseña');
});
Route::get('/error', function () {
    return view('Error');
});


Route::resource('/rols', RolController::class)->only(["index", "store", "update", "destroy"]);
Route::resource('/personas', PersonaController::class)->only(["index", "store", "update", "destroy"]);


Route::post('/loginn', [AuthController::class, 'login']);

Route::get('/check-session', [AuthController::class, 'checkSession']);

Route::post('/logout', [AuthController::class, 'logout']);

Route::post('/cambiar-contrasena', [AuthController::class, 'cambiarContrasena']);


Route::get('/restablecer/{token}', [RecuperarContraseñaController::class, 'mostrarFormularioRestablecerContraseña']);
Route::post('/reset-password', [RecuperarContraseñaController::class, 'enviarSolicitud']);
Route::post('/reset-password/{token}', [RecuperarContraseñaController::class, 'restablecerContraseña']);




Route::get('/obtener-productos', [ProductoController::class, 'obtenerProductos']);

Route::get('/buscar-autocompletado', [ProductoController::class, 'buscarAutocompletado']);

Route::get('/obtener-producto/{idproducto}', [ProductoController::class, 'encontrarProducto']);

Route::get('/categorias', [CategoriaController::class, 'index']);


Route::get('/obtener-productos/{categoriaId}', [ProductoController::class, 'obtenerProductosPorCategoria']);

Route::resource('/empresas', EmpresaController::class)->only(["index", "store", "update", "destroy"]);
Route::get('/empresas/{empresaId}', [EmpresaController::class, "empresaPorId"]);
