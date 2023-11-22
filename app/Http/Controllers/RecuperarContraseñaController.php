<?php

namespace App\Http\Controllers;

use App\Models\Persona;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Mail\ResetContraseña;
use Illuminate\Support\Facades\Hash;

class RecuperarContraseñaController extends Controller
{
    public function enviarSolicitud(Request $request)
    {
        // Verificar si el correo existe en la base de datos
        $usuario = Persona::where('Correo', $request->Correo)->first();

        if (!$usuario) {
            // El correo no está registrado
            return response()->json(['message' => 'El correo electrónico no está registrado en nuestra base de datos'], 404);
        }

        $token = Str::random(50);
        $usuario->reset_token = $token; // Asegúrate de que el nombre del campo sea correcto
        $usuario->save();

        // Crear la URL de restablecimiento (ajústala según tu lógica)
        $resetUrl = url('/restablecer/' . $token);

        // Enviar el correo electrónico
        Mail::to($request->Correo)->send(new ResetContraseña($resetUrl));

        // Respuesta al cliente (ajústala según tus necesidades)
        return response()->json(['message' => 'Correo de restablecimiento enviado con éxito']);
    }






    public function mostrarFormularioRestablecerContraseña($token)
    {
        // Buscar el usuario por el token
        $usuario = Persona::where('reset_token', $token)->first();

        // Verificar si el usuario y el token son válidos
        if (!$usuario) {
            // Redirigir o mostrar un mensaje de error, según tus necesidades
            return redirect('/error')->with('error', 'Enlace no válido para restablecimiento de contraseña.');
        }

        return view('RestablecerContraseña', ['token' => $token]);

    }




    public function restablecerContraseña(Request $request)
    {
        \Illuminate\Support\Facades\Log::info('Iniciando restablecerContraseña...');

        // Validar los campos del formulario de restablecimiento
        $request->validate([
            'Contraseña' => 'required|min:5|',
        ]);

        // Obtener el token de la solicitud
        $token = $request->route('token');

        // Buscar el usuario por el token
        $usuario = Persona::where('reset_token', $token)->first();

        // Verificar si el usuario y el token son válidos
        if (!$usuario) {
            // Redirigir o mostrar un mensaje de error, según tus necesidades
            return redirect('/login')->with('error', 'Enlace no válido para restablecimiento de contraseña.');
        }

        // Actualizar la contraseña del usuario
        // Actualizar la contraseña del usuario
        $usuario->Contraseña = Hash::make($request->input('Contraseña'));
        $usuario->reset_token = null; // o $usuario->reset_token = '';
        $usuario->save();

        // Configurar encabezados para evitar que el navegador guarde en caché la página
        header('Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0');
        header('Pragma: no-cache');
        header('Expires: Sat, 26 Jul 1997 05:00:00 GMT');

        return response()->json(['success' => 'Contraseña restablecida con éxito.']);

        \Illuminate\Support\Facades\Log::info('Finalizando restablecerContraseña...');
    }
}
