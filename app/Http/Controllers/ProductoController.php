<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function obtenerProductos()
    {
        // Obtén los productos paginados directamente desde la base de datos
        $productos = Producto::where('estado', 'A')->paginate(6); // Cambia el número 6 según la cantidad deseada por página

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
        })->where('estado', 'A')->get(); // Obtenemos todos los resultados sin paginación

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
        // Almacenar las imágenes en el sistema de archivos y obtener las rutas
        $uploadedFiles = [];

        // Verificar si $request->file('imagenes') no es null y es un array antes de intentar recorrerlo
        $imagenes = $request->file('imagenes');
        if (!is_null($imagenes) && is_array($imagenes)) {
            foreach ($imagenes as $imagen) {
                $rutaImagen = $imagen->store('public/img');
                $uploadedFiles[] = Storage::url($rutaImagen);
            }
        }

        // Crear el producto con los datos del formulario y las imágenes almacenadas
        $producto = Producto::create([
            'nombre' => $request->nombre,
            'cantidad' => $request->cantidad,
            'descripcion' => $request->descripcion,
            'precio' => $request->precio,
            'marca' => $request->marca,
            'imagenes' => json_encode($uploadedFiles),
        ]);

        try {
            // Verificar si se proporcionó una categoría en la solicitud
            if ($request->has('categoriaF')) {
                // Buscar la categoría por el ID proporcionado
                $categoria = Categoria::findOrFail($request->categoriaF);
                $producto->categoria()->associate($categoria);
            }

            // Guardar el producto
            $producto->save();

            // Devolver una respuesta JSON con el producto creado
            return response()->json($producto, 201);
        } catch (ModelNotFoundException $e) {
            // Manejar el caso en que la categoría no fue encontrada
            return response()->json(['error' => 'La categoría no fue encontrada.'], 404);
        }
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
