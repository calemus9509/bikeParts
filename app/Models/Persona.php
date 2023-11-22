<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Persona extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'personas';

    protected $fillable = [
        'Nombre',
        'Apellido',
        'Documento',
        'Telefono',
        'rol_id',
        'Correo',
        'Usuario',
        'Contraseña',
        'Estado'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}



