<?php

namespace App\Http\Controllers;

use App\Mail\WelcomeMail;
use App\Models\Persona;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class PersonaController extends Controller
{

    public function index()
    {
        $personas = DB::table('personas')
            ->join('rols', 'personas.rol_id', '=', 'rols.id')
            ->select('personas.*', 'rols.Nombre as NombreRol')
            ->where('personas.Estado', '=', 'A')
            ->get();

        return response()->json($personas);
    }


    public function store(Request $request)
    {
        // Registra la persona en la base de datos
        $data = $request->all();

        // Guarda la contraseña sin cifrar para enviarla por correo
        $contraseñaSinCifrar = $data['Contraseña'];

        // Encripta la contraseña antes de guardarla en la base de datos
        $data['Contraseña'] = Hash::make($data['Contraseña']);

        $persona = Persona::create($data);

        // Envía el correo de bienvenida
        Mail::to($persona->Correo)->send(new WelcomeMail($persona, $contraseñaSinCifrar));
    }


    public function update(Request $request, Persona $persona)
    {
        Persona::findOrFail($request->id)->update($request->all());
    }

    public function destroy(Persona $persona)
    {
        // DELETE
        // Producto::findOrFail($producto->id)->delete();

        // INHABILITAR
        $producto = Persona::findOrFail($persona->id);
        $producto->estado  = 'I';
        $producto->save();
    }
}
