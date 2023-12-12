<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductoController extends Controller
{

    
   
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

      
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Producto $producto)
    {
        Producto::findOrFail($request->idproducto)->update($request->all());

      
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

    

}

