<?php

namespace App\Http\Controllers;

use App\Models\Ventas;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class VentasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ventas $ventas)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ventas $ventas)
    {
        //
        $ventas = Ventas::findOrFail($ventas->id);
        $ventas->estado = 'I';
        $ventas->save();
    }
}
