<?php

namespace App\Http\Controllers;

use App\Models\Compras;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ComprasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Compras::all();
    }

    /**
     * Show the form for creating a new resource.
     */


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        Compras::create($request->all());
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Compras $compras)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Compras $compras)
    {
        //
    }
}
