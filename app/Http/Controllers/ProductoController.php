<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Producto;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductoController extends Controller
{
<<<<<<< HEAD

    
   
=======
    /**
     * Display a listing of the resource.
     */
>>>>>>> b0f5f1fb141e1c2f21a860e50c0c14fde358aba8
    public function obtenerProductos(Request $request)
    {
        // Obtén el ID de la empresa desde la solicitud
        $empresaId = $request->input('empresa');

        // Filtra los productos por ID de empresa si está presente
        $query = Producto::where('estado', 'A');
        if ($empresaId) {
            $query->where('empresa_id', $empresaId);
        }

        // Obtén los productos paginados directamente desde la base de datos
        $productos = $query->paginate(6); // Cambia el número 6 según la cantidad deseada por página

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


<<<<<<< HEAD
   

=======
>>>>>>> b0f5f1fb141e1c2f21a860e50c0c14fde358aba8
    public function obtenerProductosPorCategoria(Request $request, $categoriaId)
    {
        $empresaId = $request->input('empresa');

        // Utilizamos el método whereHas para filtrar los productos por la categoría
        $productos = Producto::whereHas('categoria', function ($query) use ($categoriaId) {
            // Filtramos por el ID de la categoría
            $query->where('idcategorias', $categoriaId);
        })
            ->where('empresa_id', $empresaId) // Reemplaza 'empresa_id' con el nombre real de tu columna
            ->where('estado', 'A')
            ->get(); // Obtenemos todos los resultados sin paginación

        // Devolvemos los productos filtrados en formato JSON
        return response()->json($productos);
    }

<<<<<<< HEAD
   

=======
>>>>>>> b0f5f1fb141e1c2f21a860e50c0c14fde358aba8
    public function index(Request $request)
    {
        // Obtener la información del usuario desde la sesión
        $userWithCompany = $request->session()->get('user');

        // Verificar si el usuario está autenticado y tiene información de la empresa
        if (!$userWithCompany) {
            return response()->json(['success' => false, 'message' => 'Usuario no autenticado']);
        }

        // Obtener la empresa_id del usuario
        $empresa_id = $userWithCompany->empresa_id;

        // Modificar la consulta para obtener solo los productos de esa empresa
        $productos = DB::table('productos')
            ->join('categorias', 'productos.categoriaF', '=', 'categorias.idcategorias')
            ->select('productos.*', 'categorias.nombre as nombreCategoria')
            ->where('productos.estado', '=', 'A')
            ->where('productos.empresa_id', '=', $empresa_id)
            ->get();

        return response()->json(['success' => true, 'productos' => $productos]);
    }

    



    public function buscarAutocompletado(Request $request)
    {
        $termino = $request->input('termino');
        $empresaId = $request->input('empresa');

        // Divide la cadena en términos
        $terminos = explode(' ', $termino);

        // Inicializa la consulta
        $query = Producto::where('empresa_id', $empresaId);

        // Realiza la búsqueda en la base de datos para cada término
        foreach ($terminos as $termino) {
            $query->where(function ($query) use ($termino) {
                $query->where('nombre', 'LIKE', "%$termino%")
                    ->orWhere('marca', 'LIKE', "%$termino%")
                    ->orWhere('descripcion', 'LIKE', "%$termino%");
            });
        }

        // Obtiene los resultados
        $resultados = $query->get();

        return response()->json($resultados);
    }





    public function buscarAutocompletado(Request $request)
    {
        $termino = $request->input('termino');
        $empresaId = $request->input('empresa');

        // Divide la cadena en términos
        $terminos = explode(' ', $termino);

        // Inicializa la consulta
        $query = Producto::where('empresa_id', $empresaId);

        // Realiza la búsqueda en la base de datos para cada término
        foreach ($terminos as $termino) {
            $query->where(function ($query) use ($termino) {
                $query->where('nombre', 'LIKE', "%$termino%")
                    ->orWhere('marca', 'LIKE', "%$termino%")
                    ->orWhere('descripcion', 'LIKE', "%$termino%");
            });
        }

        // Obtiene los resultados
        $resultados = $query->get();

        return response()->json($resultados);
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

<<<<<<< HEAD
      
=======
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
>>>>>>> b0f5f1fb141e1c2f21a860e50c0c14fde358aba8
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Producto $producto)
    {
        Producto::findOrFail($request->idproducto)->update($request->all());
<<<<<<< HEAD

      
=======
>>>>>>> b0f5f1fb141e1c2f21a860e50c0c14fde358aba8
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Producto $producto)
    {
        $producto = Producto::findOrFail($producto->idproducto);
        $producto->estado = 'I';
        $producto->save();
    }

<<<<<<< HEAD
    

=======
    public function obtenerProductosOrdenados(Request $request, $orden)
    {
        // Obtén el ID de la empresa desde la solicitud
        $empresaId = $request->input('empresa');

        // Filtra los productos por ID de empresa si está presente
        $query = Producto::where('estado', 'A');
        if ($empresaId) {
            $query->where('empresa_id', $empresaId);
        }

        // Aplica el orden según el parámetro proporcionado
        if ($orden === 'mayor') {
            $query->orderBy('precio', 'desc');
        } elseif ($orden === 'menor') {
            $query->orderBy('precio', 'asc');
        }

        // Obtén los productos paginados directamente desde la base de datos
        $productos = $query->paginate(6); // Cambia el número 6 según la cantidad deseada por página

        return response()->json($productos);
    }
>>>>>>> b0f5f1fb141e1c2f21a860e50c0c14fde358aba8
}

