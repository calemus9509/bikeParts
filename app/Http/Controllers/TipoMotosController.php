<?php

namespace App\Http\Controllers;

use App\Models\TipoMotos;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TipoMotosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return TipoMotos::all();
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        TipoMotos::create($request->all());
    }





    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TipoMotos $tipoMotos)
    {
        //
        TipoMotos::findOrfail($request->id)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TipoMotos $tipoMotos)
    {
        //
        $tipoMotos = TipoMotos::findOrFail($tipoMotos->id);
        $tipoMotos->estado = 'I';
        $tipoMotos->save();
    }
}
