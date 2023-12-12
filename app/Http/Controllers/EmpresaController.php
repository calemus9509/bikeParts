<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\Empresa;
use Illuminate\Http\Request;

class EmpresaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $empresa = Empresa::where('estado', 'A')->get();
        return response()->json($empresa);
<<<<<<< HEAD
        // return Empresa::all();
=======

>>>>>>> b0f5f1fb141e1c2f21a860e50c0c14fde358aba8
    }

    public function store(Request $request)
    {
        Empresa::create($request->all());
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

<<<<<<< HEAD
    /**
     * Obtener la misión de la empresa.
     */
    public function empresaPorId($empresaId)
    {
        $empresa = Empresa::findOrFail($empresaId);
        return response()->json(['mision' => $empresa->mision,'vision' => $empresa->vision, 'descripcion' => $empresa->descripcion, 'imagen' => $empresa->imagen]);
=======
    // public function empresaPorId($empresaId) {
    //     $empresa = Empresa::findOrFail($empresaId);
    //     return response()->json(['mision' => $empresa->mision, 'vision' => $empresa->vision, 'descripcion' => $empresa->descripcion, 'imagen' => $empresa->imagen]);
    // }
    public function empresaPorId($empresaId) {
        $empresa = Empresa::findOrFail($empresaId);
        return response()->json($empresa);
>>>>>>> b0f5f1fb141e1c2f21a860e50c0c14fde358aba8
    }
}
