<?php

namespace App\Http\Controllers;

use App\Models\Reclamacion;
use Illuminate\Http\Request;

class ReclamacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $reclamaciones = Reclamacion::where('empre_id', $id)->get();
        return $reclamaciones;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Reclamacion::create($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reclamacion $reclamacion)
    {
        Reclamacion::find($reclamacion->id)->delete();
    }
}
