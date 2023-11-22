<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function obtenerProductos()
    {
        // Obtén los productos paginados directamente desde la base de datos
        $productos = Producto::paginate(6); // Cambia el número 6 según la cantidad deseada por página

        return response()->json($productos);
    }

    public function encontrarProducto($id)
    {
        try {
            $producto = Producto::find($id);

            if ($producto) {
                return response()->json(['producto' => $producto], 200);
            } else {
                return response()->json(['mensaje' => 'Producto no encontrado'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['mensaje' => 'Error al buscar el producto'], 500);
        }
    }


    public function obtenerProductosPorCategoria($categoriaId)
    {
        // Utilizamos el método whereHas para filtrar los productos por la categoría
        $productos = Producto::whereHas('categoria', function ($query) use ($categoriaId) {
            // Filtramos por el ID de la categoría
            $query->where('idcategorias', $categoriaId);
        })->get(); // Obtenemos todos los resultados sin paginación

        // Devolvemos los productos filtrados en formato JSON
        return response()->json($productos);
    }

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
