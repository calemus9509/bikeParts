<?php

namespace App\Http\Controllers;

use App\Models\TipoMoto;
use Illuminate\Http\Request;

class TipoMotoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TipoMoto::all()->where('Estado', 'A');
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        TipoMoto::create($request->all());
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TipoMoto $tipoMoto)
    {
        TipoMoto::finOrfail($request->id)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TipoMoto $tipoMoto)
    {
        // INHABILITAR
        $producto = TipoMoto::findOrFail($tipoMoto->id);
        $producto->estado  = 'I';
        $producto->save();
    }
}
