<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EmpresaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $empresa = Empresa::where('estado', 'A')->get();
        return response()->json($empresa);
    }


    public function store(Request $request)
    {

        // Almacenar las imágenes en el sistema de archivos y obtener las rutas
        $uploadedFiles = [];
        $uploadedFile = [];
        $uploadedFiless = [];

        // Verificar si $request->file('imagenes') no es null y es un array antes de intentar recorrerlo
        $imagenes = $request->file('imagen');
        if (!is_null($imagenes) && is_array($imagenes)) {
            foreach ($imagenes as $imagen) {
                $rutaImagen = $imagen->store('public/img');
                $uploadedFiles[] = Storage::url($rutaImagen);
            }
        }
        $logo = $request->file('logo');
        if (!is_null($logo) && is_array($logo)) {
            foreach ($logo as $imagen) {
                $rutaImagenes = $imagen->store('public/img');
                $uploadedFile[] = Storage::url($rutaImagenes);
            }
        }
        $marca_aliada = $request->file('marca_aliada');
        if (!is_null($marca_aliada) && is_array($marca_aliada)) {
            foreach ($marca_aliada as $imagen) {
                $rutaImagens = $imagen->store('public/img');
                $uploadedFiless[] = Storage::url($rutaImagens);
            }
        }

        // Crear el producto con los datos del formulario y las imágenes almacenadas
        $empresa = Empresa::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'direccion' => $request->direccion,
            'mision' => $request->mision,
            'vision' => $request->vision,
            'telefono' => $request->telefono,
            'nit' => $request->nit,
            'instagram' => $request->instagram,
            'admin_id' => $request->admin_id,
            'imagen' => json_encode($uploadedFiles),
            'logo' => json_encode($uploadedFile),
            'marca_aliada' => json_encode($uploadedFiless),
        ]);
    }




    public function update(Request $request, Empresa $empresa)
    {
        Empresa::findOrFail($request->id)->update($request->all());
    }


    public function destroy(Empresa $empresa)
    {
        $tienda = Empresa::findOrFail($empresa->id);
        $tienda->estado = 'I';
        $tienda->save();
    }

    // public function empresaPorId($empresaId) {
    //     $empresa = Empresa::findOrFail($empresaId);
    //     return response()->json(['mision' => $empresa->mision, 'vision' => $empresa->vision, 'descripcion' => $empresa->descripcion, 'imagen' => $empresa->imagen]);
    // }
    public function empresaPorId($empresaId)
    {
        $empresa = Empresa::findOrFail($empresaId);
        return response()->json($empresa);
    }
}
