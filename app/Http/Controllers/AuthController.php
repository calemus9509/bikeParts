<?php

namespace App\Http\Controllers;

use App\Models\Persona;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function cambiarContrasena(Request $request)
    {
        $nuevaContraseña = $request->input('nuevaContraseña');
        $confirmarContraseña = $request->input('confirmarContraseña');

        // Verificar que las contraseñas coincidan
        if ($nuevaContraseña !== $confirmarContraseña) {
            return response()->json(['success' => false, 'message' => 'Las contraseñas no coinciden']);
        }

        // Encriptar la nueva contraseña
        $nuevaContraseñaEncriptada = Hash::make($nuevaContraseña);

        // Obtener el usuario de la sesión manualmente
        $user = $request->session()->get('user');

        // Guardar la nueva contraseña en la base de datos
        $user->Contraseña = $nuevaContraseñaEncriptada;
        $user->save();

        return response()->json(['success' => true, 'message' => 'Contraseña cambiada correctamente']);
    }








    public function login(Request $request)
    {
        $Usuario = $request->input('Usuario');
        $Contraseña = $request->input('Contraseña');

        // Buscar el usuario por el nombre de usuario
        $user = Persona::where('Usuario', $Usuario)->first();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Usuario no encontrado']);
        }

        // Verificar la contraseña
        if (!password_verify($Contraseña, $user->Contraseña)) {
            return response()->json(['success' => false, 'message' => 'Contraseña incorrecta']);
        }


        $request->session()->put('user', $user);

        // Ahora, puedes crear tu lógica de sesión aquí, si es necesario

        return response()->json(['success' => true, 'user' => $user]);
    }




    // Método para cerrar sesión
    public function logout(Request $request)
    {
        $request->session()->forget('user');
        return response()->json(['success' => true]);
    }





    // Método para verificar la sesión
    public function checkSession(Request $request)
    {
        if ($request->session()->has('user')) {
            // Sesión activa
            $user = $request->session()->get('user');
            return response()->json(['success' => true, 'user' => $user]);
        } else {
            // Sesión no activa
            return response()->json(['success' => false]);
        }
    }
}
