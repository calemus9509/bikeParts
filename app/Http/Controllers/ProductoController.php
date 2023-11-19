<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Http\Controllers\Controller;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

// class ProductoController extends Controller
// {
//     /**
//      * Display a listing of the resource.
//      */
//     public function index()
//     {
//         //
//         return producto::all()->where('estado', 'A');
//     }


//     /**
//      * Store a newly created resource in storage.
//      */
//     public function store(Request $request)
//     {

//         // Producto::create($request->all());
//         $request->validate([
//             'imagenUno' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
//             'imagenDos' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
//             'imagenTres' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
//             'imagenCuatro' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
//         ]);

//         // Procesar las imágenes y guardarlas
//         $imagenes = [];

//         $imagenes[] = $this->guardarImagen($request->file('imagenUno'));
//         $imagenes[] = $this->guardarImagen($request->file('imagenDos'));
//         $imagenes[] = $this->guardarImagen($request->file('imagenTres'));
//         $imagenes[] = $this->guardarImagen($request->file('imagenCuatro'));

//         // Crear un nuevo producto con la información proporcionada
//         // Crear un nuevo producto con la información proporcionada
//         $producto = new Producto([
//             'nombre' => $request->input('nombre'),
//             'descripcion' => $request->input('descripcion'),
//             'cantidad' => $request->input('cantidad'),
//             'precio' => $request->input('precio'),
//             'marca' => $request->input('marca'),
//             'categoria' => $request->input('categoria'),
//             'imagenUno' => $imagenes[0],
//             'imagenDos' => $imagenes[1],
//             'imagenTres' => $imagenes[2],
//             'imagenCuatro' => $imagenes[3],
//         ]);

//         // Guardar el producto en la base de datos
//         $producto->save();

//         // Puedes devolver una respuesta o redirigir según tus necesidades
//         return response()->json(['mensaje' => 'Producto guardado con éxito']);
//     }



//     /**
//      * Update the specified resource in storage.
//      */
//     public function update(Request $request, Producto $producto)
//     {
//         //
//         Producto::findOrfail($request->id)->update($request->all());

//         $request->validate([
//             'imagenUno' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
//             'imagenDos' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
//             'imagenTres' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
//             'imagenCuatro' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
//         ]);

//         // Procesar las imágenes y actualizarlas
//         $imagenes = [];

//         $imagenes[] = $this->guardarImagen($request->file('imagenUno'));
//         $imagenes[] = $this->guardarImagen($request->file('imagenDos'));
//         $imagenes[] = $this->guardarImagen($request->file('imagenTres'));
//         $imagenes[] = $this->guardarImagen($request->file('imagenCuatro'));

//         // Actualizar el producto con la información proporcionada
//         $producto->update([
//             'nombre' => $request->input('nombre'),
//             'descripcion' => $request->input('descripcion'),
//             'cantidad' => $request->input('cantidad'),
//             'precio' => $request->input('precio'),
//             'marca' => $request->input('marca'),
//             'categoria' => $request->input('categoria'),
//             'imagenUno' => $imagenes[0],
//             'imagenDos' => $imagenes[1],
//             'imagenTres' => $imagenes[2],
//             'imagenCuatro' => $imagenes[3],
//         ]);

//         // Puedes devolver una respuesta o redirigir según tus necesidades
//         return response()->json(['mensaje' => 'Producto actualizado con éxito']);
//     }

//     // Función para guardar una imagen y obtener la ruta
//     private function guardarImagen($imagen)
//     {
//         if ($imagen) {
//             $rutaImagen = $imagen->store('imagenes', 'public');
//             return asset('storage/' . $rutaImagen);
//         }
//         return null;
//     }


//     /**
//      * Remove the specified resource from storage.
//      */
//     public function destroy(Producto $producto)
//     {
//         //
//         $producto = Producto::findOrFail($producto->id);
//         $producto->estado = 'I';
//         $producto->save();
//     }
// }

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return Producto::all()->where('estado', 'A');
        $productos = DB::table('productos')
            ->join('categorias', 'productos.categoriaF', '=', 'categorias.idcategorias')
            ->select('productos.*', 'categorias.nombre as nombreCategoria')
            ->where('productos.estado', '=', 'A')
            ->get();

        return response()->json($productos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $producto = Producto::create($request->all());

        // Asociar el producto a la categoría existente
        $categoria = Categoria::findOrFail($request->categoriaF);
        $producto->categoria()->associate($categoria);
        $producto->save();

        return response()->json($producto, 201);

        // $request->validate([
        //     'imagenUno' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        //     'imagenDos' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        //     'imagenTres' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        //     'imagenCuatro' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        // ]);

        // $imagenes = [];

        // $imagenes['imagenUno'] = $this->guardarImagen($request->file('imagenUno'));
        // $imagenes['imagenDos'] = $this->guardarImagen($request->file('imagenDos'));
        // $imagenes['imagenTres'] = $this->guardarImagen($request->file('imagenTres'));
        // $imagenes['imagenCuatro'] = $this->guardarImagen($request->file('imagenCuatro'));

        // $producto = new Producto([
        //     'nombre' => $request->input('nombre'),
        //     'descripcion' => $request->input('descripcion'),
        //     'cantidad' => $request->input('cantidad'),
        //     'precio' => $request->input('precio'),
        //     'marca' => $request->input('marca'),
        //     'categoriaf' => $request->input('categoriaf'),
        //     'imagenUno' => $imagenes['imagenUno'],
        //     'imagenDos' => $imagenes['imagenDos'],
        //     'imagenTres' => $imagenes['imagenTres'],
        //     'imagenCuatro' => $imagenes['imagenCuatro'],
        // ]);

        // $producto->save();

        // return response()->json(['mensaje' => 'Producto guardado con éxito']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Producto $producto)
    {
        Producto::findOrFail($request->idproducto)->update($request->all());

        // $request->validate([
        //     'imagenUno' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        //     'imagenDos' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        //     'imagenTres' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        //     'imagenCuatro' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        // ]);

        // $imagenes = [];

        // $imagenes['imagenUno'] = $this->guardarImagen($request->file('imagenUno'));
        // $imagenes['imagenDos'] = $this->guardarImagen($request->file('imagenDos'));
        // $imagenes['imagenTres'] = $this->guardarImagen($request->file('imagenTres'));
        // $imagenes['imagenCuatro'] = $this->guardarImagen($request->file('imagenCuatro'));

        // $producto->update([
        //     'nombre' => $request->input('nombre'),
        //     'descripcion' => $request->input('descripcion'),
        //     'cantidad' => $request->input('cantidad'),
        //     'precio' => $request->input('precio'),
        //     'marca' => $request->input('marca'),
        //     'categoria' => $request->input('categoria'),
        //     'imagenUno' => $imagenes['imagenUno'],
        //     'imagenDos' => $imagenes['imagenDos'],
        //     'imagenTres' => $imagenes['imagenTres'],
        //     'imagenCuatro' => $imagenes['imagenCuatro'],
        // ]);

        // return response()->json(['mensaje' => 'Producto actualizado con éxito']);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Producto $producto)
    {
        $producto = Producto::findOrFail($producto->idproducto);
        $producto->estado = 'I';
        $producto->save();

        // return response()->json(['mensaje' => 'Producto eliminado con éxito']);
    }

    // private function guardarImagen($imagen)
    // {
    //     if ($imagen) {
    //         $rutaImagen = $imagen->store('public/imagenes');
    //         return asset('storage/imagenes/' . basename($rutaImagen));
    //     }
    //     return null;
    // }
}
