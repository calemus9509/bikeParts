<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use Illuminate\Http\Request;

class EmpresaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $empresa = Empresa::where('estado', 'A')->get()  ;
        return response()->json($empresa);

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

    public function empresaPorId($empresaId) {
        $empresa = Empresa::findOrFail($empresaId);
        return response()->json(['mision' => $empresa->mision, 'vision' => $empresa->vision, 'descripcion' => $empresa->descripcion, 'imagen' => $empresa->imagen]);
    }
}
