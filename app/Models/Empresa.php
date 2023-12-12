<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    use HasFactory;
    protected $table = 'empresas';

    public function admin()
    {
        return $this->belongsTo(Persona::class, 'admin_id', 'id');
    }

    protected $fillable = [
        'nombre',
        'descripcion',
        'nit',
        'imagen',
        'estado',
        'direccion',
        'telefono',
        'admin_id',
        'logo',
        'vision',
        'mision',
<<<<<<< HEAD
=======
        'correo',
        'instagram',
>>>>>>> b0f5f1fb141e1c2f21a860e50c0c14fde358aba8
    ];

    protected $hiddens = [
        'created_at',
        'updated_at',
    ];
}
